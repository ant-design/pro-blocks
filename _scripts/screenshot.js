const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const { join, dirname } = require('path');
const fs = require('fs');
const getNpmRegistry = require('getnpmregistry');
const execa = require('execa');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
env.PORT = process.env.PORT || '2144';
env.TEST = true;
env.COMPRESS = 'none';
env.PROGRESS = 'none';
env.BLOCK_PAGES_LAYOUT = 'blankLayout';

let browser;

const startServer = async path => {
  let once = false;
  return new Promise(resolve => {
    env.PAGES_PATH = `${path}/src`;
    console.log(path);
    const startServer = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'start'], {
      env,
    });

    console.log('Starting development server');
    startServer.stdout.on('data', data => {
      console.log(data.toString());
      // hack code , wait umi
      if (!once && data.toString().indexOf('Compiled successfully') >= 0) {
        // eslint-disable-next-line
        once = true;
        return resolve(startServer);
      }
    });
    startServer.on('exit', () => {
      kill(env.PORT || 8000);
    });
  });
};

const autoScroll = page =>
  page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 100;
        var timer = setInterval(() => {
          const { scrollHeight } = document.body;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      }),
  );

const getImage = async (page, path) => {
  kill(env.PORT || 8000);
  const server = await startServer(path);

  await page.reload(`http://127.0.0.1:${env.PORT}`);

  await page.setViewport({
    width: 1440,
    height: 800,
  });

  await autoScroll(page);

  await page.screenshot({
    path: join(path, 'snapshot.png'),
    fullPage: true,
  });
  server.kill();
};

const openBrowser = async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-sandbox',
    ],
  });
  const page = await browser.newPage();
  page.goto(`http://127.0.0.1:${env.PORT}`);
  return page;
};

const getAllFile = async () => {
  const cwd = join(__dirname, '../');
  const files = fs.readdirSync(cwd);
  return files.filter(path => {
    const itemPath = join(cwd, path);
    const stat = fs.statSync(itemPath);
    if (path.includes('.') || path.includes('_') || path.includes('node_modules')) {
      return false;
    }
    if (stat.isDirectory()) {
      const havePackage = fs.existsSync(join(itemPath, 'package.json'));

      if (havePackage) {
        return true;
      }
    }
    return false;
  });
};

getAllFile().then(async dirList => {
  const registry = await getNpmRegistry();
  const page = await openBrowser();
  const loopGetImage = async index => {
    try {
      console.log(`install ${dirList[index]} dependencies`);
      await execa('yarn', ['install', `--registry=${registry}`, '--force'], {
        cwd: join(__dirname, `../${dirList[index]}`),
      });
      await getImage(page, dirList[index]);

      if (dirList.length > index && dirList[index + 1]) {
        console.log(`Screenshot ${dirList[index]}`);

        return loopGetImage(index + 1);
      }
    } catch (error) {
      console.log(error);
    }
    return Promise.resolve(true);
  };
  await loopGetImage(0);
  browser.close();
});

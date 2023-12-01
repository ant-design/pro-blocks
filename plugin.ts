import { IApi } from '@umijs/max';
import { join } from 'path';
import { readdirSync, existsSync } from 'fs';

export default (api: IApi) => {
  api.modifyTSConfig((memo) => {
    memo.compilerOptions.paths['umi'] = memo.compilerOptions.paths['@umijs/max'];
    return memo;
  });
  if (api.name !== 'dev') return;
  console.log(api.args);
  const { _ } = api.args;
  // 取巧，没传代表全部
  const [name = ''] = _;
  const components = readdirSync(api.cwd).filter((componentsPath) => {
    if (existsSync(join(componentsPath, 'package.json')) && componentsPath.includes(name)) {
      return true;
    }
    return false;
  });
  api.modifyConfig((memo) => {
    memo.mock = {
      include: components.map((i) => `${i}/src/_mock.ts`),
    };
    return memo;
  });
  api.modifyRoutes(() => {
    let routers = {} as any;
    components.forEach((pagePath) => {
      // 临时调试方便
      const path = name ? '/' : pagePath.toLocaleLowerCase();
      routers['path'] = {
        path,
        id: path,
        file: join(api.cwd, pagePath, './src/index'),
        absPath: join(api.cwd, pagePath, './src/index'),
        __absFile: join(api.cwd, pagePath, './src/index'),
      };
    });
    return routers;
  });
};

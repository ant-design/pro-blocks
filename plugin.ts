import { IApi } from '@umijs/max';
import { join } from 'path';
import { readdirSync, existsSync } from 'fs';
import blocks from './umi-block.json';

const blockHash = {} as any;
blocks.list.forEach((item) => {
  blockHash[item.key] = item;
});

export default (api: IApi) => {
  api.modifyTSConfig((memo) => {
    memo.compilerOptions.paths['umi'] = memo.compilerOptions.paths['@umijs/max'];
    return memo;
  });
  if (api.name !== 'dev') return;
  const { _ } = api.args;
  // 取巧，没传代表全部
  const [page = ''] = _;
  const components = readdirSync(api.cwd).filter((componentsPath) => {
    if (existsSync(join(componentsPath, 'package.json')) && componentsPath.includes(page)) {
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
  api.modifyRoutes((memo) => {
    components.forEach((pagePath) => {
      // 临时调试方便
      const path = page ? '/' : pagePath.toLocaleLowerCase();
      const { name = 'haha' } = blockHash[pagePath];
      memo[path] = {
        path: `/${path}`,
        id: path,
        icon: 'smile',
        name,
        component: join(api.cwd, pagePath, './src/index'),
        parentId: 'ant-design-pro-layout',
        file: join(api.cwd, pagePath, './src/index'),
        absPath: `/${path}`,
        __absFile: join(api.cwd, pagePath, './src/index'),
      };
    });
    return memo;
  });
};

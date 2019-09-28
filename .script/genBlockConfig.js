const fs = require('fs');
const { join } = require('path');
const gitUrl = 'https://github.com/ant-design/pro-blocks';

const menuData = {
  home: '首页',
  login: '登录',
  register: '注册',
  'register/result': '注册结果',
  dashboard: 'Dashboard',
  'dashboard/analysis': '分析页',
  'dashboard/monitor': '监控页',
  'dashboard/workplace': '工作台',
  'exception/403': '403',
  'exception/404': '404',
  'exception/500': '500',
  form: '表单页',
  'user/login': '登录页',
  'user/register': '注册页',
  'user/register/result': '注册结果页',
  'form/basic/form': '基础表单',
  'form/step/form': '分步表单',
  'form/advanced/form': '高级表单',
  list: '列表页',
  'list/table/list': '查询表格',
  'list/basic/list': '标准列表',
  'list/card/list': '卡片列表',
  'list/search': '搜索列表',
  'list/search/articles': '搜索列表（文章）',
  'list/search/projects': '搜索列表（项目）',
  'list/search/applications': '搜索列表（应用）',
  profile: '详情页',
  'profile/basic': '基础详情页',
  'profile/advanced': '高级详情页',
  result: '结果页',
  'result/success': '成功页',
  'result/fail': '失败页',
  exception: '异常页',
  'exception/not-permission': '403',
  'exception/not-find': '404',
  'exception/server-error': '500',
  'exception/trigger': '触发错误',
  account: '个人页',
  'account/center': '个人中心',
  'account/settings': '个人设置',
  'account/trigger': '触发报错',
  'account/logout': '退出登录',
  editor: '图形编辑器',
  'editor/flow': '流程编辑器',
  'editor/mind': '脑图编辑器',
  'editor/koni': '拓扑编辑器',
};

const tagsKey = {
  list: '列表',
  search: '搜索',
  articles: 'remove',
  table: '表格',
  form: '表单',
  step: '步骤',
  basic: '基本',
  card: '卡片',
  applications: 'remove',
  projects: 'remove',
  404: 'remove',
  403: 'remove',
  500: 'remove',
  profile: '详情',
  advanced: '高级',
  result: '结果',
  fail: 'remove',
  success: 'remove',
  user: '用户',
  login: '登录',
  register: '注册',
  account: 'remove',
  center: '个人中心',
  settings: '个人设置',
  dashboard: 'dashboard',
  analysis: '分析',
  monitor: '监控',
  workplace: 'remove',
  editor: '图形编辑',
  flow: 'remove',
  koni: 'remove',
  mind: 'remove',
  exception: '异常',
};
/**
 * 从文件数组映射为 pro 的路由
 * @param {*} name
 */
const genBlockName = name =>
  name
    .match(/[A-Z]?[a-z]+|[0-9]+/g)
    .map(p => p.toLowerCase())
    .join('/');

/**
 * 从文件数组映射为 tags 列表
 * @param {*} name
 */
const genBlockTags = name =>
  Array.from(new Set(name.match(/[A-Z]?[a-z]+|[0-9]+/g).map(p => p.toLowerCase())))
    .map(key => tagsKey[key] || key)
    .filter(key => key !== 'remove');

/**
 * 遍历文件地址
 * @param path
 */
const getFolderTreeData = filePath => {
  const files = fs.readdirSync(filePath);
  return files
    .map(fileName => {
      const status = fs.statSync(join(filePath, fileName));
      if (status.isDirectory() && fileName.indexOf('.') !== 0) {
        const absPkgPath = join(filePath, fileName, 'package.json');
        if (fs.existsSync(absPkgPath)) {
          const pkg = require(absPkgPath);
          return {
            name: menuData[genBlockName(fileName)],
            key: fileName,
            description: pkg.description,
            url: `${gitUrl}/tree/master/${fileName}`,
            path: fileName,
            img: `https://raw.githubusercontent.com/ant-design/pro-blocks/master/${fileName}/snapshot.png?raw=true`,
            tags: genBlockTags(fileName),
            previewUrl: `https://preview.pro.ant.design/${genBlockName(fileName)}`,
          };
        }
      }
      return undefined;
    })
    .filter(obj => obj);
};

fs.writeFileSync(
  join(__dirname, '..', 'umi-block.json'),
  JSON.stringify({ list: getFolderTreeData(join(__dirname, '../')) }, null, 2),
);

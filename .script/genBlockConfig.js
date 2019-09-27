const fs = require('fs');
const { join } = require('path');
const gitUrl = 'https://github.com/ant-design/pro-blocks';
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
  401: 'remove',
  500: 'remove',
  profile: '详情',
  advanced: '高级',
  result: '结果',
  fail: 'remove',
  success: '成功',
  user: '用户',
  login: '登录',
  register: '注册',
  account: 'remove',
  center: '个人中心',
  settings: '个人设置',
  dashboard: 'dashboard',
  analysis: '分析',
  monitor: '监控',
  workplace: '工作台',
  editor: '编辑器',
  flow: '流程图',
  koni: '拓扑结构图',
  mind: '脑图',
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
      // 是文件夹 并且不已 . 开头且最深三层
      if (status.isDirectory() && fileName.indexOf('.') !== 0) {
        const absPkgPath = join(filePath, fileName, 'package.json');
        if (fs.existsSync(absPkgPath)) {
          const pkg = require(absPkgPath);
          return {
            title: fileName,
            value: fileName,
            key: fileName,
            description: pkg.description,
            url: `${gitUrl}/tree/master/${fileName}`,
            type: 'block',
            path: fileName,
            isPage: true,
            defaultPath: `/${fileName}`,
            img: `https://github.com/ant-design/pro-blocks/raw/master/${fileName}/snapshot.png`,
            tags: genBlockTags(fileName),
            name: fileName,
            previewUrl: `https://preview.pro.ant.design/${genBlockName(fileName)}`,
          };
        }
      }
      return undefined;
    })
    .filter(obj => obj);
};

fs.writeFileSync(
  join(__dirname, '..', 'blockList.json'),
  JSON.stringify(getFolderTreeData(join(__dirname, '../')), null, 2),
);

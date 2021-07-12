export default {
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  antd: {},
  targets: {
    ie: 11,
  },
  chainWebpack(memo) {
    memo.module.rule('ts-in-node_modules').include.clear();
    return memo;
  },
  dva: {},
  mfsu: {},
  webpack5: {},
  layout: {
    disableContentMargin: false,
  },
};

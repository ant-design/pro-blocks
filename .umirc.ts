import { defineConfig } from '@umijs/max';

export default defineConfig({
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  antd: {},
  request: {},
  targets: {
    ie: 11,
  },
  // chainWebpack(memo) {
  //   memo.module.rule('ts-in-node_modules').include.clear();
  //   return memo;
  // },
  dva: {},
  mfsu: false,
  // webpack5: {},
  // layout: {
  //   disableContentMargin: false,
  // },
});

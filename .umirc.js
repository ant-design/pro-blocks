export default {
  plugins: [
    [
      'umi-plugin-block-dev',
      {
        layout: 'ant-design-pro-user',
        menu: {
          name: '主页',
          icon: 'home',
        },
      },
    ],
    [
      'umi-plugin-react',
      {
        dva: true,
        locale: true,
        antd: true,
      },
    ],
  ],
};

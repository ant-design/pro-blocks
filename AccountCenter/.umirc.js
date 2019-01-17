export default {
  plugins: [
    ['umi-plugin-block-dev', { layout: 'ant-design-pro' }],
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

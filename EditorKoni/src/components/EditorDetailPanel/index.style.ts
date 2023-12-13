import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    detailPanel: {
      flex: '1',
      backgroundColor: token.colorBgContainer,
    },
  };
});

export default useStyles;

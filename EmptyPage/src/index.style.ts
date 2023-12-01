import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      width: '100%',
      background: token.colorBgContainer,
    },
  };
});

export default useStyles;

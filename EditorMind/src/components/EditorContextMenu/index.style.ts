import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    contextMenu: {
      display: 'none',
      overflow: 'hidden',
      background: token.colorBgContainer,
      borderRadius: '4px',
      boxShadow: token.boxShadow,
    },
    item: {
      color: token.colorTextDisabled,
      cursor: 'auto',
      '&:hover': { background: token.colorBgElevated },
    },
    anticon: {
      marginRight: '8px',
    },
  };
});

export default useStyles;

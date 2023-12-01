import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    toolbar: {
      display: 'flex',
      alignItems: 'center',
    },
    command: {
      display: 'inline-block',
      width: '27px',
      height: '27px',
      margin: '0 6px',
      paddingTop: '6px',
      textAlign: 'center',
      cursor: 'pointer',
      '&:hover': { border: `1px solid ${token.colorBgTextActive}` },
    },
    anticon: {
      color: token.colorTextSecondary,
      cursor: 'auto',
      '&:hover': { border: `1px solid ${token.colorBorder}` },
    },
    disable: {
      color: token.colorTextSecondary,
      cursor: 'auto',
      '&:hover': { border: `1px solid ${token.colorBorder}` },
    },
    tooltip: {
      '.ant-tooltip-inner': { fontSize: '12px', borderRadius: '0' },
    },
  };
});

export default useStyles;

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    editor: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      width: '100%',
      height: 'calc(100vh - 250px)',
      background: token.colorBgContainer,
    },
    editorHd: {
      padding: '8px',
      background: token.colorBgContainer,
      border: `1px solid ${token.colorBgTextActive}`,
    },
    editorBd: {
      flex: '1',
    },
    editorSidebar: {
      display: 'flex',
      flexDirection: 'column',
      background: token.colorBgContainer,
      '&:first-child': { borderRight: `1px solid ${token.colorBgTextActive}` },
      '&:last-child': { borderLeft: `1px solid ${token.colorBgTextActive}` },
    },
    editorContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    'g6-editor-minimap-container': {
      background: 'none',
    },
    flow: {
      flex: '1',
    },
    mind: {
      flex: '1',
    },
    koni: {
      flex: '1',
    },
  };
});

export default useStyles;

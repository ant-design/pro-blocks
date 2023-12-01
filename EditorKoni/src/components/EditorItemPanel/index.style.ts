import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    itemPanel: {
      flex: '1',
      '.ant-card': { height: '100%' },
      '.ant-card-body': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '> div': {
          marginBottom: '16px',
        },
      },
    },
  };
});
export default useStyles;

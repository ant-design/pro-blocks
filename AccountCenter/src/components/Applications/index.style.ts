import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    filterCardList: {
      marginBottom: '-24px',
      '.ant-card-meta-content': { marginTop: '0' },
      '.ant-list .ant-list-item-content-single': { maxWidth: '100%' },
    },
    cardInfo: {
      marginTop: '16px',
      marginLeft: '40px',
      zoom: '1',
      '&::before, &::after': { display: 'table', content: "' '" },
      '&::after': {
        clear: 'both',
        height: '0',
        fontSize: '0',
        visibility: 'hidden',
      },
      '& > div': {
        position: 'relative',
        float: 'left',
        width: '50%',
        textAlign: 'left',
        p: {
          margin: '0',
          fontSize: '24px',
          lineHeight: '32px',
        },
        'p:first-child': {
          marginBottom: '4px',
          color: token.colorTextSecondary,
          fontSize: '12px',
          lineHeight: '20px',
        },
      },
    },
    cardItemContent: {
      display: 'flex',
      height: '20px',
      marginTop: '16px',
      marginBottom: '-4px',
      lineHeight: '20px',
      '& > span': {
        flex: '1',
        color: token.colorTextSecondary,
        fontSize: '12px',
      },
    },
  };
});

export default useStyles;

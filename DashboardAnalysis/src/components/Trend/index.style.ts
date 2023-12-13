import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }) => {
  const trendItem = css({
    display: 'inline-block',
    fontSize: token.fontSize,
    lineHeight: '22px',
  });

  const upDownCommon = css({
    position: 'relative',
    top: 1,
    marginLeft: 4,
    span: {
      fontSize: 12,
      transform: 'scale(0.83)',
    },
  });

  const up = cx(
    upDownCommon,
    css({
      color: token['red-6'],
    }),
  );

  const down = cx(
    upDownCommon,
    css({
      top: '-1px',
      color: token['green-6'],
    }),
  );

  const trendItemGrey = css`
    .${cx(up)}, .${cx(down)} {
      color: ${token.colorText};
    }
  `;

  const reverseColor = css`
    .${cx(up)} {
      color: ${token['green-6']};
    }
    .${cx(down)} {
      color: ${token['red-6']};
    }
  `;

  return {
    trendItem,
    up,
    down,
    trendItemGrey,
    reverseColor,
  };
});

export default useStyles;

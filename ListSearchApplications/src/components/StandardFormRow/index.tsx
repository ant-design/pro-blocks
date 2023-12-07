import React from 'react';
import classNames from 'classnames';
import useStyles from './index.style';

type StandardFormRowProps = {
  title?: string;
  last?: boolean;
  block?: boolean;
  grid?: boolean;
  style?: React.CSSProperties;
};

const StandardFormRow = (props: React.PropsWithChildren<StandardFormRowProps>) => {
  const { title, children, last, block, grid, ...rest } = props;
  const { styles } = useStyles();
  const cls = classNames(styles.standardFormRow, {
    [styles.standardFormRowBlock]: block,
    [styles.standardFormRowLast]: last,
    [styles.standardFormRowGrid]: grid,
  });

  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={styles.label}>
          <span>{title}</span>
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default StandardFormRow;

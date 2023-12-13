import { Card } from 'antd';
import type { CardProps } from 'antd/es/card';
import React, { FC } from 'react';
import classNames from 'classnames';
import useStyles from './index.style';

type totalType = () => React.ReactNode;

export type ChartCardProps = {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
} & CardProps;

const ChartCard: FC<ChartCardProps> = ({
  loading = false,
  contentHeight,
  title,
  avatar,
  action,
  total,
  footer,
  children,
  ...rest
}) => {
  const { styles } = useStyles();
  const renderTotal = (total?: number | totalType | React.ReactNode) => {
    if (!total && total !== 0) {
      return null;
    }
    let totalDom;
    switch (typeof total) {
      case 'undefined':
        totalDom = null;
        break;
      case 'function':
        totalDom = <div className={styles.total}>{total()}</div>;
        break;
      default:
        totalDom = <div className={styles.total}>{total}</div>;
    }
    return totalDom;
  };
  const renderContent = () => {
    if (loading) {
      return false;
    }
    return (
      <div className={styles.chartCard}>
        <div
          className={classNames(styles.chartTop, {
            [styles.chartTopMargin]: !children && !footer,
          })}
        >
          <div className={styles.avatar}>{avatar}</div>
          <div className={styles.metaWrap}>
            <div className={styles.meta}>
              <span>{title}</span>
              <span className={styles.action}>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
            <div
              className={classNames({
                [styles.contentFixed]: contentHeight,
              })}
            >
              {children}
            </div>
          </div>
        )}

        {footer && (
          <div
            className={classNames(styles.footer, {
              [styles.footerMargin]: !children,
            })}
          >
            {footer}
          </div>
        )}
      </div>
    );
  };
  return (
    <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
      {renderContent()}
    </Card>
  );
};

export default ChartCard;

import React from 'react';
import { RouteContext } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import styles from './index.less';

interface IPageHeaderWrapperProps {
  content: React.ReactNode;
  title: React.ReactNode;
}

const PageHeaderWrapper: React.SFC<IPageHeaderWrapperProps> = ({
  children,
  content,
  ...restProps
}) => (
  <RouteContext.Consumer>
    {value => (
      <div style={{ margin: '-24px -24px 0' }}>
        <PageHeader {...restProps} {...value}>
          {content}
        </PageHeader>
        {children ? <div className={styles.content}>{children}</div> : null}
      </div>
    )}
  </RouteContext.Consumer>
);

export default PageHeaderWrapper;

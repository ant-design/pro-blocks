import { Button, Card, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Fragment } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import Result from './Result';
import styles from './index.less';

const extra = (
  <Fragment>
    <div className={styles.title}>
      <FormattedMessage
        id="BLOCK_NAME.error.hint-title"
        defaultMessage="The content you submitted has the following error:"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ marginRight: 8 }} className={styles.error_icon} type="close-circle-o" />
      <FormattedMessage
        id="BLOCK_NAME.error.hint-text1"
        defaultMessage="Your account has been frozen"
      />
      <a style={{ marginLeft: 16 }}>
        <FormattedMessage id="BLOCK_NAME.error.hint-btn1" defaultMessage="Thaw immediately" />
        <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon style={{ marginRight: 8 }} className={styles.error_icon} type="close-circle-o" />
      <FormattedMessage
        id="BLOCK_NAME.error.hint-text2"
        defaultMessage="Your account is not yet eligible to apply"
      />
      <a style={{ marginLeft: 16 }}>
        <FormattedMessage id="BLOCK_NAME.error.hint-btn2" defaultMessage="Upgrade immediately" />
        <Icon type="right" />
      </a>
    </div>
  </Fragment>
);

const actions = (
  <Button type="primary">
    <FormattedMessage id="BLOCK_NAME.error.btn-text" defaultMessage="Return to modify" />
  </Button>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        type="error"
        title={formatMessage({ id: 'BLOCK_NAME.error.title' })}
        description={formatMessage({ id: 'BLOCK_NAME.error.description' })}
        extra={extra}
        actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </GridContent>
);

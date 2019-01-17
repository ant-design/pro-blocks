import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Icon, Card } from 'antd';
import { Result } from 'ant-design-pro';

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16,
      }}
    >
      <FormattedMessage
        id="BLOCK_NAME.error.hint-title"
        defaultMessage="The content you submitted has the following error:"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
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
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
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
);

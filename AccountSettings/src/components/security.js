import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List } from 'antd';
// import { getTimeDistance } from '@/utils/utils';

const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="BLOCK_NAME.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="BLOCK_NAME.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="BLOCK_NAME.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};

class SecurityView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({ id: 'BLOCK_NAME.security.password-description' })}：
          {passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a>
          <FormattedMessage id="BLOCK_NAME.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.phone' }, {}),
      description: `${formatMessage(
        { id: 'BLOCK_NAME.security.phone-description' },
        {}
      )}：138****8293`,
      actions: [
        <a>
          <FormattedMessage id="BLOCK_NAME.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.question' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.security.question-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="BLOCK_NAME.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.email' }, {}),
      description: `${formatMessage(
        { id: 'BLOCK_NAME.security.email-description' },
        {}
      )}：ant***sign.com`,
      actions: [
        <a>
          <FormattedMessage id="BLOCK_NAME.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.security.mfa' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.security.mfa-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="BLOCK_NAME.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;

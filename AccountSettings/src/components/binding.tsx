import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Icon, List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
  getData = () => [
    {
      title: formatMessage({ id: 'BLOCK_NAME.binding.taobao' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.binding.taobao-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="BLOCK_NAME.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="taobao" className="taobao" />,
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.binding.alipay' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.binding.alipay-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="BLOCK_NAME.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="alipay" className="alipay" />,
    },
    {
      title: formatMessage({ id: 'BLOCK_NAME.binding.dingding' }, {}),
      description: formatMessage({ id: 'BLOCK_NAME.binding.dingding-description' }, {}),
      actions: [
        <a key="Bind">
          <FormattedMessage id="BLOCK_NAME.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="dingding" className="dingding" />,
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
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default BindingView;

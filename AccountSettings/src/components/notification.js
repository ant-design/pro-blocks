import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Switch, List } from 'antd';

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'BLOCK_NAME.settings.open' })}
        unCheckedChildren={formatMessage({ id: 'BLOCK_NAME.settings.close' })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage({ id: 'BLOCK_NAME.notification.password' }, {}),
        description: formatMessage({ id: 'BLOCK_NAME.notification.password-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'BLOCK_NAME.notification.messages' }, {}),
        description: formatMessage({ id: 'BLOCK_NAME.notification.messages-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'BLOCK_NAME.notification.todo' }, {}),
        description: formatMessage({ id: 'BLOCK_NAME.notification.todo-description' }, {}),
        actions: [Action],
      },
    ];
  };

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

export default NotificationView;

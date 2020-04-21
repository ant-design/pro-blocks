import { List, Switch } from 'antd';
import React, { Fragment } from 'react';

import { formatMessage } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView: React.FC = () => {
  const getData = () => {
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

  const data = getData();
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;

import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

import Result from './Result';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="BLOCK_NAME.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="BLOCK_NAME.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const PAGE_NAME_UPPER_CAMEL_CASE: React.SFC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="BLOCK_NAME.register-result.msg"
          values={{ email: location.state ? location.state.account : 'AntDesign@example.com' }}
        />
      </div>
    }
    description={formatMessage({ id: 'BLOCK_NAME.register-result.activation-email' })}
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default PAGE_NAME_UPPER_CAMEL_CASE;

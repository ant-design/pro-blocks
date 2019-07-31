import { Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from './model';
import styles from './style.less';
import LoginForm, { LoginFormDataType } from './components/LoginForm';

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: StateType;
  submitting: boolean;
}

interface PAGE_NAME_UPPER_CAMEL_CASEState {
  type: string;
  autoLogin: boolean;
}

export interface FormDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/login'],
  }),
)
class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  PAGE_NAME_UPPER_CAMEL_CASEProps,
  PAGE_NAME_UPPER_CAMEL_CASEState
> {
  state: PAGE_NAME_UPPER_CAMEL_CASEState = {
    type: 'account',
    autoLogin: true,
  };

  onAutoLoginChange = (checked: boolean) => {
    this.setState({
      autoLogin: checked,
    });
  };

  onGetCaptcha = (mobile: string) => {
    this.props.dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/getCaptcha',
      payload: mobile,
    });
  };

  handleSubmit = (values: LoginFormDataType) => {
    const { type } = this.state;
    this.props.dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/login',
      payload: {
        ...values,
        type,
      },
    });
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  render() {
    return (
      <div className={styles.main}>
        <LoginForm
          activeTabKey={this.state.type}
          onTabChange={this.onTabChange}
          autoLogin={this.state.autoLogin}
          onAutoLoginChange={this.onAutoLoginChange}
          onGetCaptcha={this.onGetCaptcha}
          submitting={this.props.submitting}
          onSubmit={this.handleSubmit}
          status={this.props.BLOCK_NAME_CAMEL_CASE.status}
        />
        <div className={styles.other}>
          <FormattedMessage id="BLOCK_NAME.login.sign-in-with" />
          <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
          <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
          <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
          <Link className={styles.register} to="/user/register">
            <FormattedMessage id="BLOCK_NAME.login.signup" />
          </Link>
        </div>
      </div>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

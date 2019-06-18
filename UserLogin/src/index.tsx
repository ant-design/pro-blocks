import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from './model';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  dispatch: Dispatch<any>;
  BLOCK_NAME_CAMEL_CASE: StateType;
  submitting: boolean;
}
interface PAGE_NAME_UPPER_CAMEL_CASEState {
  type: string;
  autoLogin: boolean;
}
export interface FromDataType {
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
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: PAGE_NAME_UPPER_CAMEL_CASEState = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: any, values: FromDataType) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(['mobile'], {}, (err: any, values: FromDataType) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          ((dispatch({
            type: 'BLOCK_NAME_CAMEL_CASE/getCaptcha',
            payload: values.mobile,
          }) as unknown) as Promise<any>)
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { BLOCK_NAME_CAMEL_CASE, submitting } = this.props;
    const { status, type: loginType } = BLOCK_NAME_CAMEL_CASE;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'BLOCK_NAME.login.tab-login-credentials' })}>
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'BLOCK_NAME.login.message-invalid-credentials' }),
              )}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'BLOCK_NAME.login.userName' })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'BLOCK_NAME.login.password' })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.password.required' }),
                },
              ]}
              onPressEnter={() =>
                this.loginForm && this.loginForm.validateFields(this.handleSubmit)
              }
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'BLOCK_NAME.login.tab-login-mobile' })}>
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'BLOCK_NAME.login.message-invalid-verification-code' }),
              )}
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'BLOCK_NAME.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'BLOCK_NAME.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder={formatMessage({ id: 'BLOCK_NAME.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'BLOCK_NAME.form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'BLOCK_NAME.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="BLOCK_NAME.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="BLOCK_NAME.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="BLOCK_NAME.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="BLOCK_NAME.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="BLOCK_NAME.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

import React, { Component } from 'react';
import { Alert, Button, Checkbox, Form, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import LoginFormItemCaptcha from './LoginFormItemCaptcha';
import LoginFormItemInput from './LoginFormItemInput';
import styles from './styles.less';

export interface LoginFormDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

interface LoginFormProps extends FormComponentProps {
  activeTabKey: string;
  onTabChange: (key: string) => void;

  autoLogin: boolean;
  onAutoLoginChange: (isAutoLogin: boolean) => void;

  onGetCaptcha: (mobile: string) => void;

  submitting: boolean;
  onSubmit: (values: LoginFormDataType) => void;

  status?: 'ok' | 'error';
}

class LoginForm extends Component<LoginFormProps> {
  onAutoLoginChange = (e: CheckboxChangeEvent) => {
    this.props.onAutoLoginChange(e.target.checked);
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    const actives =
      this.props.activeTabKey === 'account' ? ['userName', 'password'] : ['mobile', 'captcha'];
    form.validateFields(actives, { force: true }, (err, values) => {
      if (err === null) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { status, submitting, activeTabKey, form } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <div className={styles.login}>
          <Tabs
            defaultActiveKey={this.props.activeTabKey}
            animated={false}
            className={styles.tabs}
            onChange={this.props.onTabChange}
          >
            <Tabs.TabPane
              key="account"
              tab={formatMessage({ id: 'BLOCK_NAME.login.tab-login-credentials' })}
            >
              {status === 'error' && activeTabKey === 'account' && !submitting && (
                <Alert
                  style={{ marginBottom: 24 }}
                  type="error"
                  showIcon
                  message={formatMessage({ id: 'BLOCK_NAME.login.message-invalid-credentials' })}
                />
              )}

              <LoginFormItemInput
                name="userName"
                iconType="user"
                form={form}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.userName.required' }),
                  },
                ]}
                placeholder={`${formatMessage({ id: 'BLOCK_NAME.login.userName' })}: admin or user`}
              />
              <LoginFormItemInput
                name="password"
                iconType="lock"
                form={form}
                password
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.password.required' }),
                  },
                ]}
                placeholder={`${formatMessage({ id: 'BLOCK_NAME.login.password' })}: ant.design`}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              key="mobile"
              tab={formatMessage({ id: 'BLOCK_NAME.login.tab-login-mobile' })}
            >
              {status === 'error' && activeTabKey === 'mobile' && !submitting && (
                <Alert
                  style={{ marginBottom: 24 }}
                  type="error"
                  showIcon
                  message={formatMessage({
                    id: 'BLOCK_NAME.login.message-invalid-verification-code',
                  })}
                />
              )}

              <LoginFormItemInput
                name="mobile"
                iconType="mobile"
                form={form}
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
                placeholder={formatMessage({ id: 'BLOCK_NAME.phone-number.placeholder' })}
              />
              <LoginFormItemCaptcha
                name="captcha"
                iconType="mail"
                form={form}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.verification-code.required' }),
                  },
                ]}
                placeholder={formatMessage({ id: 'BLOCK_NAME.verification-code.placeholder' })}
                onGetCaptcha={this.props.onGetCaptcha}
                countDown={120}
                btnText={formatMessage({ id: 'BLOCK_NAME.form.get-captcha' })}
                secondText={formatMessage({ id: 'BLOCK_NAME.captcha.second' })}
              />
            </Tabs.TabPane>
          </Tabs>

          <div>
            <Checkbox checked={this.props.autoLogin} onChange={this.onAutoLoginChange}>
              <FormattedMessage id="BLOCK_NAME.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="BLOCK_NAME.login.forgot-password" />
            </a>
          </div>
          <Form.Item>
            <Button
              size="large"
              className={styles.submit}
              type="primary"
              htmlType="submit"
              loading={this.props.submitting}
            >
              <FormattedMessage id="BLOCK_NAME.login.login" />
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default Form.create<LoginFormProps>()(LoginForm);

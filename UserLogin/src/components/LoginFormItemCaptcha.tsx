import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import styles from './styles.less';
import { getIcon, LoginFormInputProps } from './LoginFormItemInput';

interface LoginFormItemCaptchaProps extends LoginFormInputProps {
  btnText: string;
  secondText: string;
  countDown?: number;
  onGetCaptcha: (mobile: string) => void;
}

interface LoginFormItemCaptchaState {
  count: number;
}

class LoginFormItemCaptcha extends React.Component<
  LoginFormItemCaptchaProps,
  LoginFormItemCaptchaState
> {
  constructor(props: LoginFormItemCaptchaProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  interval: number | undefined = undefined;

  onGetCaptcha = () => {
    const { form, onGetCaptcha } = this.props;
    form.validateFields(['mobile'], (err, values) => {
      if (err === null) {
        onGetCaptcha(values.mobile);
        this.runGetCaptchaCountDown();
      }
    });
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render() {
    const { form, iconType, placeholder, btnText, secondText, name, rules } = this.props;
    const { count } = this.state;
    return (
      <Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            {form.getFieldDecorator(name, { rules })(
              <Input size="large" prefix={getIcon(iconType)} placeholder={placeholder} />,
            )}
          </Col>
          <Col span={8}>
            <Button
              className={styles.getCaptcha}
              size="large"
              disabled={!!this.state.count}
              onClick={this.onGetCaptcha}
            >
              {count ? `${count} ${secondText}` : btnText}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }
}

export default LoginFormItemCaptcha;

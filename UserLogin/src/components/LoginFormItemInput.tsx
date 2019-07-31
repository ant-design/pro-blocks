import React from 'react';
import { Form, Icon, Input } from 'antd';
import { ValidationRule } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import styles from './styles.less';

export const getIcon = (iconType: string) => <Icon type={iconType} className={styles.prefixIcon} />;

export interface LoginFormInputProps {
  iconType: string;
  placeholder: string;
  password?: boolean;

  form: WrappedFormUtils;
  name: string;
  rules?: ValidationRule[];
}

const LoginFormItemInput: React.FC<LoginFormInputProps> = props => (
  <Form.Item>
    {props.form.getFieldDecorator(props.name, { rules: props.rules })(
      <Input
        size="large"
        type={props.password ? 'password' : ''}
        prefix={getIcon(props.iconType)}
        placeholder={props.placeholder}
      />,
    )}
  </Form.Item>
);

export default LoginFormItemInput;

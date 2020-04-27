import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { useRequest } from 'umi';
import { StepComponentTypeProps } from '../../data.d';
import { fakeSubmitForm } from '../../service';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2: React.FC<StepComponentTypeProps> = (props) => {
  const [form] = Form.useForm();

  const { setStepData, setCurrent, stepData: data } = props;

  const { loading: submitting, run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: (_, params) => {
      setStepData(params[0]);
      setCurrent('result');
    },
  });
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    const values = getFieldsValue();
    setStepData({ ...data, ...values });
    setCurrent('base');
  };
  const onValidateForm = async () => {
    const values = await validateFields();
    run({ ...data, ...values });
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{ password: '123456' }}
    >
      <Alert
        closable
        showIcon
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style={{ marginBottom: 24 }}
      />
      <Descriptions column={1}>
        <Descriptions.Item label="付款账户"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="收款账户"> {receiverAccount}</Descriptions.Item>
        <Descriptions.Item label="收款人姓名"> {receiverName}</Descriptions.Item>
        <Descriptions.Item label="转账金额">
          <Statistic value={amount} suffix="元" />
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        label="支付密码"
        name="password"
        required={false}
        rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
      >
        <Input type="password" autoComplete="off" style={{ width: '80%' }} />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Step2;

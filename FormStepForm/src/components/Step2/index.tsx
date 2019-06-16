import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import styles from './index.less';
import { IStateType } from '../../model';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props extends FormComponentProps {
  data?: IStateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}

class Step2 extends React.Component<Step2Props> {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    if (!data) {
      return;
    }
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      if (dispatch) {
        dispatch({
          type: 'BLOCK_NAME_CAMEL_CASE/saveCurrentStep',
          payload: 'info',
        });
      }
    };
    const onValidateForm = (e: React.FormEvent) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          if (dispatch) {
            dispatch({
              type: 'BLOCK_NAME_CAMEL_CASE/submitStepForm',
              payload: {
                ...data,
                ...values,
              },
            });
          }
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="付款账户">
          {data.payAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款账户">
          {data.receiverAccount}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="收款人姓名">
          {data.receiverName}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="转账金额">
          <span className={styles.money}>{data.amount}</span>
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="支付密码" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: '需要支付密码才能进行支付',
              },
            ],
          })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
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
          label=""
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
  }
}
export default connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: IStateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/submitStepForm'],
    data: BLOCK_NAME_CAMEL_CASE.step,
  }),
)(Form.create<Step2Props>()(Step2));

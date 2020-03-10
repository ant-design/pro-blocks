import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const PAGE_NAME_UPPER_CAMEL_CASE: FC<PAGE_NAME_UPPER_CAMEL_CASEProps> = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content={<FormattedMessage id="BLOCK_NAME.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="BLOCK_NAME.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'BLOCK_NAME.title.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'BLOCK_NAME.title.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="BLOCK_NAME.date.label" />}
            name="date"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'BLOCK_NAME.date.required' }),
              },
            ]}
          >
            <RangePicker
              style={{ width: '100%' }}
              placeholder={[
                formatMessage({ id: 'BLOCK_NAME.placeholder.start' }),
                formatMessage({ id: 'BLOCK_NAME.placeholder.end' }),
              ]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="BLOCK_NAME.goal.label" />}
            name="goal"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'BLOCK_NAME.goal.required' }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'BLOCK_NAME.goal.placeholder' })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="BLOCK_NAME.standard.label" />}
            name="standard"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'BLOCK_NAME.standard.required' }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'BLOCK_NAME.standard.placeholder' })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="BLOCK_NAME.client.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="BLOCK_NAME.form.optional" />
                  <Tooltip title={<FormattedMessage id="BLOCK_NAME.label.tooltip" />}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input placeholder={formatMessage({ id: 'BLOCK_NAME.client.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="BLOCK_NAME.invites.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="BLOCK_NAME.form.optional" />
                </em>
              </span>
            }
            name="invites"
          >
            <Input placeholder={formatMessage({ id: 'BLOCK_NAME.invites.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="BLOCK_NAME.weight.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="BLOCK_NAME.form.optional" />
                </em>
              </span>
            }
            name="weight"
          >
            <InputNumber
              placeholder={formatMessage({ id: 'BLOCK_NAME.weight.placeholder' })}
              min={0}
              max={100}
            />
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="BLOCK_NAME.public.label" />}
            help={<FormattedMessage id="BLOCK_NAME.label.help" />}
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  <FormattedMessage id="BLOCK_NAME.radio.public" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="BLOCK_NAME.radio.partially-public" />
                </Radio>
                <Radio value="3">
                  <FormattedMessage id="BLOCK_NAME.radio.private" />
                </Radio>
              </Radio.Group>
              <FormItem style={{ marginBottom: 0 }} name="publicUsers">
                <Select
                  mode="multiple"
                  placeholder={formatMessage({ id: 'BLOCK_NAME.publicUsers.placeholder' })}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    <FormattedMessage id="BLOCK_NAME.option.A" />
                  </Option>
                  <Option value="2">
                    <FormattedMessage id="BLOCK_NAME.option.B" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="BLOCK_NAME.option.C" />
                  </Option>
                </Select>
              </FormItem>
            </div>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="BLOCK_NAME.form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <FormattedMessage id="BLOCK_NAME.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/submitRegularForm'],
}))(PAGE_NAME_UPPER_CAMEL_CASE);

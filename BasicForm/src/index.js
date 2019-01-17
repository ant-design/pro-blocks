import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from './components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['BLOCK_NAME_CAMEL_CASE/submitRegularForm'],
}))
@Form.create()
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'BLOCK_NAME_CAMEL_CASE/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

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

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="BLOCK_NAME.basic.title" />}
        content={<FormattedMessage id="BLOCK_NAME.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="BLOCK_NAME.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'BLOCK_NAME.title.placeholder' })} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="BLOCK_NAME.date.label" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.date.required' }),
                  },
                ],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={[
                    formatMessage({ id: 'BLOCK_NAME.placeholder.start' }),
                    formatMessage({ id: 'BLOCK_NAME.placeholder.end' }),
                  ]}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="BLOCK_NAME.goal.label" />}>
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.goal.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'BLOCK_NAME.goal.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="BLOCK_NAME.standard.label" />}>
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'BLOCK_NAME.standard.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'BLOCK_NAME.standard.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="BLOCK_NAME.client.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="BLOCK_NAME.form.optional" />
                    <Tooltip title={<FormattedMessage id="BLOCK_NAME.label.tooltip" />}>
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder={formatMessage({ id: 'BLOCK_NAME.client.placeholder' })} />
              )}
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
            >
              {getFieldDecorator('invites')(
                <Input placeholder={formatMessage({ id: 'BLOCK_NAME.invites.placeholder' })} />
              )}
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
            >
              {getFieldDecorator('weight')(
                <InputNumber
                  placeholder={formatMessage({ id: 'BLOCK_NAME.weight.placeholder' })}
                  min={0}
                  max={100}
                />
              )}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="BLOCK_NAME.public.label" />}
              help={<FormattedMessage id="BLOCK_NAME.label.help" />}
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
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
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder={formatMessage({ id: 'BLOCK_NAME.publicUsers.placeholder' })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
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
                  )}
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
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

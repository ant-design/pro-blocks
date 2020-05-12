import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Form,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  message,
} from 'antd';
import { useRequest } from 'umi';
import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const PAGE_NAME_UPPER_CAMEL_CASE: FC<{}> = () => {
  const { loading: submitting, run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });
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
    run(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
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
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input placeholder="给目标起个名字" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="起止日期"
            name="date"
            rules={[
              {
                required: true,
                message: '请选择起止日期',
              },
            ]}
          >
            <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="目标描述"
            name="goal"
            rules={[
              {
                required: true,
                message: '请输入目标描述',
              },
            ]}
          >
            <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="衡量标准"
            name="standard"
            rules={[
              {
                required: true,
                message: '请输入衡量标准',
              },
            ]}
          >
            <TextArea style={{ minHeight: 32 }} placeholder="请输入衡量标准" rows={4} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                客户
                <em className={styles.optional}>
                  （选填）
                  <Tooltip title="目标的服务对象">
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                邀评人
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="invites"
          >
            <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                权重
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="weight"
          >
            <InputNumber
              placeholder="请输入"
              min={0}
              max={100}
              formatter={(value) => `${value || 0}%`}
              parser={(value) => (value ? value.replace('%', '') : '0')}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="目标公开"
            help="客户、邀评人默认被分享"
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">公开</Radio>
                <Radio value="2">部分公开</Radio>
                <Radio value="3">不公开</Radio>
              </Radio.Group>
              <FormItem style={{ marginBottom: 0 }} name="publicUsers">
                <Select
                  mode="multiple"
                  placeholder="公开给"
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">同事甲</Option>
                  <Option value="2">同事乙</Option>
                  <Option value="3">同事丙</Option>
                </Select>
              </FormItem>
            </div>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            <Button style={{ marginLeft: 8 }}>保存</Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default PAGE_NAME_UPPER_CAMEL_CASE;

import { Button, DatePicker, Input, Modal, Radio, Select, Steps, Form } from 'antd';
import React from 'react';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const defaultFormVals = (props: UpdateFormProps): FormValueType => ({
  name: props.values.name,
  desc: props.values.desc,
  key: props.values.key,
  target: '0',
  template: '0',
  type: '1',
  time: '',
  frequency: 'month',
});

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = props;

  const [currentStep, setCurrentStep] = React.useState(0);
  const [formVals, setFormVals] = React.useState(defaultFormVals(props));

  const backward = () => setCurrentStep(currentStep - 1);
  const forward = () => setCurrentStep(currentStep + 1);
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  React.useEffect(() => {
    if (currentStep < 2) {
      forward();
      return () => {};
    }
    if (props.onSubmit) props.onSubmit(formVals);
    return () => {};
  }, [formVals, currentStep]);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    const previousValue = formVals;
    const nextFormVals = { ...previousValue, ...fieldsValue };
    setFormVals(nextFormVals);
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...formItemLayout} label="监控对象" name="target">
          <Select style={{ width: '100%' }}>
            <Option value="0">表一</Option>
            <Option value="1">表二</Option>
          </Select>
        </FormItem>,
        <FormItem key="template" {...formItemLayout} label="规则模板" name="template">
          <Select style={{ width: '100%' }}>
            <Option value="0">规则模板一</Option>
            <Option value="1">规则模板二</Option>
          </Select>
        </FormItem>,
        <FormItem key="type" {...formItemLayout} label="规则类型" name="type">
          <RadioGroup>
            <Radio value="0">强</Radio>
            <Radio value="1">弱</Radio>
          </RadioGroup>
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem
          key="time"
          {...formItemLayout}
          label="开始时间"
          name="time"
          rules={[{ required: true, message: '请选择开始时间！' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择开始时间"
          />
        </FormItem>,
        <FormItem key="frequency" {...formItemLayout} label="调度周期" name="frequency">
          <Select style={{ width: '100%' }}>
            <Option value="month">月</Option>
            <Option value="week">周</Option>
          </Select>
        </FormItem>,
      ];
    }
    return [
      <FormItem
        key="name"
        {...formItemLayout}
        label="规则名称"
        name="name"
        rules={[{ required: true, message: '请输入规则名称！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>,
      <FormItem
        key="desc"
        {...formItemLayout}
        label="规则描述"
        name="desc"
        rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
      >
        <TextArea rows={4} placeholder="请输入至少五个字符" />
      </FormItem>,
    ];
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={handleNext}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleNext}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={handleNext}>
        下一步
      </Button>,
    ];
  };

  return (
    <Form form={form} initialValues={formVals}>
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={handleUpdateModalVisible}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps>
        {renderContent()}
      </Modal>
    </Form>
  );
};

export default UpdateForm;

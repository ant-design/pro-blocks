import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Card, Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useModel, FormContext, StateType } from './useModel';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 1, component: <Step2 /> };
    case 'result':
      return { step: 2, component: <Step3 /> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const FormWrap: React.FC<{}> = () => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { current } = useModel();

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <PageHeaderWrapper content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

function reducer(state: StateType, { type, payload }: { type: string; payload?: any }) {
  switch (type) {
    case 'saveCurrentStep':
      return { ...state, current: payload };
    case 'saveStepFormData':
      return { ...state, step: payload };
    default:
      throw new Error(`action ${type} does not exist!`);
  }
}

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC<{}> = () => {
  const { state: initialState } = useContext(FormContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <FormWrap />
    </FormContext.Provider>
  );
};

export default PAGE_NAME_UPPER_CAMEL_CASE;

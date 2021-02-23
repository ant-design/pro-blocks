import React, { useState, useMemo } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import StepBaseForm from './components/StepBaseForm';
import StepConfirmForm from './components/StepConfirmForm';
import StepResult from './components/StepResult';
import type { StepComponentTypeProps, StepDataType, CurrentTypes } from './data.d';
import styles from './style.less';

const { Step } = Steps;

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC<Record<string, any>> = () => {
  const [current, setCurrent] = useState<CurrentTypes>('base');
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
  });

  const stepComponentProps: StepComponentTypeProps = { current, setCurrent, stepData, setStepData };

  const { step, component } = useMemo(() => {
    const getCurrentStepAndComponent = (curr = 'base') => {
      const stepAndComponent = {
        base: { step: 0, component: <StepBaseForm {...stepComponentProps} /> },
        confirm: { step: 1, component: <StepConfirmForm {...stepComponentProps} /> },
        result: { step: 2, component: <StepResult {...stepComponentProps} /> },
      };
      return stepAndComponent[curr];
    };

    return getCurrentStepAndComponent(current);
  }, [current]);

  return (
    <PageContainer content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Card bordered={false}>
        <>
          <Steps current={step} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          {component}
        </>
      </Card>
    </PageContainer>
  );
};

export default PAGE_NAME_UPPER_CAMEL_CASE;

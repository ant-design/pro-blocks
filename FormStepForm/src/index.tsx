import { Card, Steps } from 'antd';
import React, { Component, Fragment } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  current: StateType['current'];
}

@connect(({ BLOCK_NAME_CAMEL_CASE }: { BLOCK_NAME_CAMEL_CASE: StateType }) => ({
  current: BLOCK_NAME_CAMEL_CASE.current,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends Component<PAGE_NAME_UPPER_CAMEL_CASEProps> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <PageHeaderWrapper content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
        <Card bordered={false}>
          <Fragment>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {stepComponent}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

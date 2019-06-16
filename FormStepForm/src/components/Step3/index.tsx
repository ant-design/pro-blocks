import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { Dispatch } from 'redux';
import Result from '../Result';
import styles from './index.less';
import { IStateType } from '../../model';

interface Step3Props {
  data?: IStateType['step'];
  dispatch?: Dispatch<any>;
}

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
  }: {
    BLOCK_NAME_CAMEL_CASE: IStateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    data: BLOCK_NAME_CAMEL_CASE.step,
  }),
)
class Step3 extends React.Component<Step3Props> {
  render() {
    const { data, dispatch } = this.props;
    if (!data) {
      return;
    }
    const onFinish = () => {
      if (dispatch) {
        dispatch({
          type: 'BLOCK_NAME_CAMEL_CASE/saveCurrentStep',
          payload: 'info',
        });
      }
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;

import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Row, Col, Card, Statistic, Tooltip } from 'antd';
import numeral from 'numeral';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { IStateType } from './model';
import ActiveChart from './components/ActiveChart';
import styles from './style.less';
import Charts from './components/Charts';

const { Countdown } = Statistic;

const { Pie, WaterWave, Gauge, TagCloud } = Charts;

const targetTime = new Date().getTime() + 3900000;

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  BLOCK_NAME_CAMEL_CASE: IStateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: IStateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.models.monitor,
  }),
)
class PAGE_NAME_UPPER_CAMEL_CASE extends Component<PAGE_NAME_UPPER_CAMEL_CASEProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchTags',
    });
  }

  render() {
    const { BLOCK_NAME_CAMEL_CASE, loading } = this.props;
    const { tags } = BLOCK_NAME_CAMEL_CASE;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.trading-activity"
                    defaultMessage="Real-Time Trading Activity"
                  />
                }
                bordered={false}
              >
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.total-transactions"
                          defaultMessage="Total transactions today"
                        />
                      }
                      suffix="元"
                      value={numeral(124543233).format('0,0')}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.sales-target"
                          defaultMessage="Sales target completion rate"
                        />
                      }
                      value="92%"
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.remaining-time"
                          defaultMessage="Remaining time of activity"
                        />
                      }
                    >
                      <Countdown value={targetTime} />
                    </Statistic>
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.total-transactions-per-second"
                          defaultMessage="Total transactions per second"
                        />
                      }
                      suffix="元"
                      value={numeral(234).format('0,0')}
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Tooltip
                    title={
                      <FormattedMessage
                        id="BLOCK_NAME.monitor.waiting-for-implementation"
                        defaultMessage="Waiting for implementation"
                      />
                    }
                  >
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                      alt="map"
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.activity-forecast"
                    defaultMessage="Activity forecast"
                  />
                }
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.efficiency"
                    defaultMessage="Efficiency"
                  />
                }
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge
                  title={formatMessage({
                    id: 'BLOCK_NAME.monitor.ratio',
                    defaultMessage: 'Ratio',
                  })}
                  height={180}
                  percent={87}
                />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.proportion-per-category"
                    defaultMessage="Proportion Per Category"
                  />
                }
                bordered={false}
                className={styles.pieCard}
              >
                <Row style={{ padding: '16px 0' }}>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      percent={28}
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.fast-food"
                          defaultMessage="Fast food"
                        />
                      }
                      total="28%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#5DDECF"
                      percent={22}
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.western-food"
                          defaultMessage="Western food"
                        />
                      }
                      total="22%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#2FC25B"
                      percent={32}
                      title={
                        <FormattedMessage
                          id="BLOCK_NAME.monitor.hot-pot"
                          defaultMessage="Hot pot"
                        />
                      }
                      total="32%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.popular-searches"
                    defaultMessage="Popular Searches"
                  />
                }
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <TagCloud data={tags || []} height={161} />
              </Card>
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="BLOCK_NAME.monitor.resource-surplus"
                    defaultMessage="Resource Surplus"
                  />
                }
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <WaterWave
                  height={161}
                  title={
                    <FormattedMessage
                      id="BLOCK_NAME.monitor.fund-surplus"
                      defaultMessage="Fund Surplus"
                    />
                  }
                  percent={34}
                />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

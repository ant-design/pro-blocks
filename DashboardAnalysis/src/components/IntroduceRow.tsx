import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import Charts from './Charts';
import styles from '../style.less';
import Yuan from '../utils/Yuan';
import Trend from './Trend';
import { IVisitData } from '../data.d';

const { ChartCard, MiniArea, MiniBar, MiniProgress, Field } = Charts;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: IVisitData[] }) => (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title={
            <FormattedMessage id="BLOCK_NAME.analysis.total-sales" defaultMessage="Total Sales" />
          }
          action={
            <Tooltip
              title={
                <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          loading={loading}
          total={() => <Yuan>126560</Yuan>}
          footer={
            <Field
              label={
                <FormattedMessage id="BLOCK_NAME.analysis.day-sales" defaultMessage="Daily Sales" />
              }
              value={`￥${numeral(12423).format('0,0')}`}
            />
          }
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            <FormattedMessage id="BLOCK_NAME.analysis.week" defaultMessage="Weekly Changes" />
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            <FormattedMessage id="BLOCK_NAME.analysis.day" defaultMessage="Daily Changes" />
            <span className={styles.trendText}>11%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={<FormattedMessage id="BLOCK_NAME.analysis.visits" defaultMessage="Visits" />}
          action={
            <Tooltip
              title={
                <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          footer={
            <Field
              label={
                <FormattedMessage
                  id="BLOCK_NAME.analysis.day-visits"
                  defaultMessage="Daily Visits"
                />
              }
              value={numeral(1234).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title={<FormattedMessage id="BLOCK_NAME.analysis.payments" defaultMessage="Payments" />}
          action={
            <Tooltip
              title={
                <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={
            <Field
              label={
                <FormattedMessage
                  id="BLOCK_NAME.analysis.conversion-rate"
                  defaultMessage="Conversion Rate"
                />
              }
              value="60%"
            />
          }
          contentHeight={46}
        >
          <MiniBar data={visitData} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title={
            <FormattedMessage
              id="BLOCK_NAME.analysis.operational-effect"
              defaultMessage="Operational Effect"
            />
          }
          action={
            <Tooltip
              title={
                <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
              }
            >
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total="78%"
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="BLOCK_NAME.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="BLOCK_NAME.analysis.day" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  );

export default IntroduceRow;

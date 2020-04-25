import { Card, Col, Row, Statistic } from 'antd';
import { useRequest } from 'umi';
import React, { FC } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud, Map } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import { queryTags } from './service';
import styles from './style.less';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const PAGE_NAME_UPPER_CAMEL_CASE: FC = () => {
  const { loading, data } = useRequest(queryTags);

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title="活动实时交易情况"
              bordered={false}
            >
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="今日交易总额"
                    suffix="元"
                    value={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="销售目标完成率"
                    value="92%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown
                    title="活动剩余时间"
                    value={deadline}
                    format="HH:mm:ss:SSS"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="每秒交易总额"
                    suffix="元"
                    value={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="活动情况预测"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="券核效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title="跳出率"
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title="各品类占比"
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    title="中式快餐"
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
                    title="西餐"
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
                    title="火锅"
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
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={data?.list || []} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave
                height={161}
                title="补贴资金剩余"
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </>

    </GridContent>
  )
}

export default  PAGE_NAME_UPPER_CAMEL_CASE;

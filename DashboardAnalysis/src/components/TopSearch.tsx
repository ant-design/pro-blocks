import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { TinyArea } from '@ant-design/charts';
import React from 'react';
import numeral from 'numeral';
import type { DataItem } from '../data.d';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '搜索关键词',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '用户数',
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: '周涨幅',
    dataIndex: 'range',
    key: 'range',
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    render: (text: React.ReactNode, record: { status: number }) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
  },
];

const TopSearch = ({
  loading,
  visitData2 = [],
  searchData = [],
  dropdownGroup,
}: {
  loading: boolean;
  visitData2?: DataItem[];
  searchData?: DataItem[];
  dropdownGroup: React.ReactNode;
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="线上热门搜索"
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              搜索用户数
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <TinyArea height={45} autoFit smooth data={visitData2.map((item) => item.y)} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              人均搜索次数
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <TinyArea height={45} autoFit smooth data={visitData2.map((item) => item.y)} />
      </Col>
    </Row>
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;

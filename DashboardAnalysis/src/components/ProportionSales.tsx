import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="销售额类别占比"
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">
              全部渠道
            </Radio.Button>
            <Radio.Button value="online">
              线上
            </Radio.Button>
            <Radio.Button value="stores">
              门店
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        销售额
      </h4>
      <Pie
        hasLegend
        subTitle="销售额"
        total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        data={salesPieData}
        valueFormat={(value) => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;

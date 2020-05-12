import { Card, Radio } from 'antd';
import numeral from 'numeral';
import { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import { DonutConfig } from '@ant-design/charts/es/donut'
import React from 'react';
import { DataItem } from '../data.d';
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
  salesPieData: DataItem[];
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
      <Donut
        forceFit
        height={340}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesPieData as any}
        legend={{
          visible: false
        }}
        label={{
          visible: true,
          type: 'spider',
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
          }
        }}
        statistic={{
          totalLabel: '销售额'
        } as DonutConfig['statistic']}
      />
    </div>
  </Card>
);

export default ProportionSales;

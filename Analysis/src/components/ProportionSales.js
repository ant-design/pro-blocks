import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import { Charts } from 'ant-design-pro';
import { FormattedMessage } from 'umi/locale';
import styles from '../style.less';
import Yuan from '../utils/Yuan';

const { Pie } = Charts;

const ProportionSales = memo(
  ({ dropdownGroup, salesType, loading, salesPieData, handleChangeSalesType }) => (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={
        <FormattedMessage
          id="BLOCK_NAME.analysis.the-proportion-of-sales"
          defaultMessage="The Proportion of Sales"
        />
      }
      bodyStyle={{ padding: 24 }}
      extra={
        <div className={styles.salesCardExtra}>
          {dropdownGroup}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">
                <FormattedMessage id="BLOCK_NAME.channel.all" defaultMessage="ALL" />
              </Radio.Button>
              <Radio.Button value="online">
                <FormattedMessage id="BLOCK_NAME.channel.online" defaultMessage="Online" />
              </Radio.Button>
              <Radio.Button value="stores">
                <FormattedMessage id="BLOCK_NAME.channel.stores" defaultMessage="Stores" />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
      style={{ marginTop: 24 }}
    >
      <div
        style={{
          minHeight: 380,
        }}
      >
        <h4 style={{ marginTop: 8, marginBottom: 32 }}>
          <FormattedMessage id="BLOCK_NAME.analysis.sales" defaultMessage="Sales" />
        </h4>
        <Pie
          hasLegend
          subTitle={<FormattedMessage id="BLOCK_NAME.analysis.sales" defaultMessage="Sales" />}
          total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
          data={salesPieData}
          valueFormat={value => <Yuan>{value}</Yuan>}
          height={248}
          lineWidth={4}
        />
      </div>
    </Card>
  )
);

export default ProportionSales;

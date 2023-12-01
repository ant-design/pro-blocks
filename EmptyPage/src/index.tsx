import { PageContainer } from '@ant-design/pro-components';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import useStyles from './index.style';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { styles } = useStyles();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    </PageContainer>
  );
};

// @ts-ignore
import { CanvasPanel, DetailPanel, NodePanel } from 'gg-editor';
import { Card } from 'antd';
import DetailForm from './DetailForm';
import useStyles from './index.style';

const MindDetailPanel = () => {
  const { styles } = useStyles();
  return (
    <DetailPanel className={styles.detailPanel}>
      <NodePanel>
        <DetailForm type="node" />
      </NodePanel>
      <CanvasPanel>
        <Card type="inner" size="small" title="Canvas" bordered={false} />
      </CanvasPanel>
    </DetailPanel>
  );
};

export default MindDetailPanel;

import { Divider } from 'antd';
// @ts-ignore
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import useStyles from './index.style';

const FlowToolbar = () => {
  const { styles } = useStyles();
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarButton command="undo" />
      <ToolbarButton command="redo" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
      <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
      <Divider type="vertical" />
      <ToolbarButton command="append" text="Topic" />
      <ToolbarButton command="appendChild" icon="append-child" text="Subtopic" />
      <Divider type="vertical" />
      <ToolbarButton command="collapse" text="Fold" />
      <ToolbarButton command="expand" text="Unfold" />
    </Toolbar>
  );
};

export default FlowToolbar;

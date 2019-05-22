import React from 'EditorFlow/node_modules/_@types_react@16.8.18@@types/react';
import { Row, Col } from 'EditorFlow/node_modules/_antd@3.18.2@antd/lib';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowToolbar } from './components/EditorToolbar';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import styles from './index.less';
import PageHeaderWrapper from './components/PageHeaderWrapper';

GGEditor.setTrackable(false);

export default () => {
  return (
    <PageHeaderWrapper
      title="Flowchart Editor"
      content="The flow chart is an excellent way to represent the idea of the algorithm."
    >
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Flow className={styles.flow} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    </PageHeaderWrapper>
  );
};

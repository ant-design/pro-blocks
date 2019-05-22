import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniToolbar } from './components/EditorToolbar';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import KoniCustomNode from './components/shape/nodes/KoniCustomNode';
import styles from './index.less';
import PageHeaderWrapper from './components/PageHeaderWrapper';

GGEditor.setTrackable(false);

export default () => {
  return (
    <PageHeaderWrapper
      title="Koni Editor"
      content="The topology diagram refers to the network structure diagram composed of network node devices and communication media."
    >
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <KoniToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <KoniItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Koni className={styles.koni} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <KoniDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <KoniCustomNode />
        <KoniContextMenu />
      </GGEditor>
    </PageHeaderWrapper>
  );
};

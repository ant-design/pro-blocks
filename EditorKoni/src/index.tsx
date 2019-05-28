import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniToolbar } from './components/EditorToolbar';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

GGEditor.setTrackable(false);

export default () => {
  return (
    <PageHeaderWrapper
      content={formatMessage({
        id: 'BLOCK_NAME.description',
        defaultMessage: 'description',
      })}
    >
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <KoniToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={2} className={styles.editorSidebar}>
            <KoniItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Koni className={styles.koni} />
          </Col>
          <Col span={6} className={styles.editorSidebar}>
            <KoniDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <KoniContextMenu />
      </GGEditor>
    </PageHeaderWrapper>
  );
};

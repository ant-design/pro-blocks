import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Input } from 'antd';
import styles from './Center.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

@connect(({ loading, BLOCK_NAME_CAMEL_CASE }) => ({
  currentUser: BLOCK_NAME_CAMEL_CASE.currentUser,
  currentUserLoading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchCurrent'],
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    const { tabKey } = state;
    const urlTabKey = location.pathname.replace(`${match.path}/`, '');
    if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
      return {
        tabKey: urlTabKey,
      };
    }
    return null;
  }

  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchCurrent',
    });
  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [...newTags, { key: `new-${newTags.length}`, label: inputValue }];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const { currentUser, currentUserLoading, children } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
            {!dataLoading ? (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser.signature}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <i className={styles.title} />
                    {currentUser.title}
                  </p>
                  <p>
                    <i className={styles.group} />
                    {currentUser.group}
                  </p>
                  <p>
                    <i className={styles.address} />
                    {currentUser.geographic.province.label}
                    {currentUser.geographic.city.label}
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.tags}>
                  <div className={styles.tagsTitle}>标签</div>
                  {currentUser.tags.concat(newTags).map(item => (
                    <Tag key={item.key}>{item.label}</Tag>
                  ))}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" />
                    </Tag>
                  )}
                </div>
                <Divider style={{ marginTop: 16 }} dashed />
                <div className={styles.team}>
                  <div className={styles.teamTitle}>团队</div>
                  <Row gutter={36}>
                    {currentUser.notice.map(item => (
                      <Col key={item.id} lg={24} xl={12}>
                        <Link to={item.href}>
                          <Avatar size="small" src={item.logo} />
                          {item.member}
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            ) : null}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={this.onTabChange}
          >
            {children || tabKey}
          </Card>
        </Col>
      </Row>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

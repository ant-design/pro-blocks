import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Icon,
  Menu,
  Popover,
  Row,
  Steps,
  Table,
  Tooltip,
} from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import classNames from 'classnames';
import { connect } from 'dva';
import { AdvancedProfileData } from './data.d';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const extra = (
  <Row
    style={{
      minWidth: 400,
    }}
  >
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>订单金额</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);

const description = (
  <Descriptions className={styles.headerList} size="small" column={2}>
    <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
    <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
    <Descriptions.Item label="关联单据">
      <a href="">12421</a>
    </Descriptions.Item>
    <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
    <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
  </Descriptions>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.effects['BLOCK_NAME_CAMEL_CASE/fetchAdvanced'],
  }),
)
class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  { loading: boolean; BLOCK_NAME_CAMEL_CASE: AdvancedProfileData; dispatch: Dispatch<any> },
  {
    operationKey: string;
    stepDirection: 'horizontal' | 'vertical';
  }
> {
  public state: {
    operationKey: string;
    stepDirection: 'horizontal' | 'vertical';
  } = {
    operationKey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  setStepDirection = () => {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  };

  render() {
    const { stepDirection, operationKey } = this.state;
    const { BLOCK_NAME_CAMEL_CASE, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = BLOCK_NAME_CAMEL_CASE;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="单号：234231029431"
        extra={action}
        content={description}
        extraContent={extra}
        tabActiveKey="detail"
        tabList={[
          {
            key: 'detail',
            tab: '详情',
          },
          {
            key: 'rule',
            tab: '规则',
          },
        ]}
      >
        <div
          style={{
            margin: 24,
            marginTop: 48,
          }}
          className={styles.main}
        >
          <GridContent>
            <Card title="流程进度" style={{ marginBottom: 24 }}>
              <Steps direction={stepDirection} progressDot={customDot} current={1}>
                <Step title="创建项目" description={desc1} />
                <Step title="部门初审" description={desc2} />
                <Step title="财务复核" />
                <Step title="完成" />
              </Steps>
            </Card>
            <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
                <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
                <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
                <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title="信息组">
                <Descriptions.Item label="某某数据">725</Descriptions.Item>
                <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      某某数据
                      <Tooltip title="数据说明">
                        <Icon
                          style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                          type="info-circle-o"
                        />
                      </Tooltip>
                    </span>
                  }
                >
                  725
                </Descriptions.Item>
                <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
              </Descriptions>
              <h4 style={{ marginBottom: 16 }}>信息组</h4>
              <Card type="inner" title="多层级信息组">
                <Descriptions style={{ marginBottom: 16 }} title="组名称">
                  <Descriptions.Item label="负责人">林东东</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234567</Descriptions.Item>
                  <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
                  <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                  <Descriptions.Item label="描述">
                    这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions style={{ marginBottom: 16 }} title="组名称" column={1}>
                  <Descriptions.Item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions title="组名称">
                  <Descriptions.Item label="负责人">付小小</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
              <div className={styles.noData}>
                <Icon type="frown-o" />
                暂无数据
              </div>
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

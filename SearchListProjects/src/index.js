import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Input } from 'antd';

import { TagSelect, AvatarList, Ellipsis } from 'ant-design-pro';

import StandardFormRow from './components/StandardFormRow';
import PageHeaderWrapper from './components/PageHeaderWrapper';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ BLOCK_NAME_CAMEL_CASE, loading }) => ({
  BLOCK_NAME_CAMEL_CASE,
  loading: loading.models.BLOCK_NAME_CAMEL_CASE,
}))
@Form.create({
  onValuesChange({ dispatch }, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    console.log(changedValues, allValues);
    // 模拟查询表单生效
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  },
})
class CoverCardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      BLOCK_NAME_CAMEL_CASE: { list = [] },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={<a>{item.title}</a>}
                description={<Ellipsis lines={2}>{item.subDescription}</Ellipsis>}
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="mini">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={`${item.id}-avatar-${i}`}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={mainSearch}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.coverCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect expandable>
                      <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                      <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                      <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                      <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                      <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                      <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                      <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                      <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                      <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                      <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="其它选项" grid last>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="作者">
                      {getFieldDecorator('author', {})(
                        <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                          <Option value="lisa">王昭君</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="好评度">
                      {getFieldDecorator('rate', {})(
                        <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                          <Option value="good">优秀</Option>
                          <Option value="normal">普通</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CoverCardList;

import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="BLOCK_NAME.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          <FormattedMessage id="BLOCK_NAME.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </>
);
interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(formatMessage({ id: 'BLOCK_NAME.basic.update.success' }));
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              label={formatMessage({ id: 'BLOCK_NAME.basic.email' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.email-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label={formatMessage({ id: 'BLOCK_NAME.basic.nickname' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.nickname-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="profile"
              label={formatMessage({ id: 'BLOCK_NAME.basic.profile' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.profile-message' }, {}),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({ id: 'BLOCK_NAME.basic.profile-placeholder' })}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name="country"
              label={formatMessage({ id: 'BLOCK_NAME.basic.country' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.country-message' }, {}),
                },
              ]}
            >
              <Select style={{ maxWidth: 220 }}>
                <Option value="China">中国</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="geographic"
              label={formatMessage({ id: 'BLOCK_NAME.basic.geographic' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.geographic-message' }, {}),
                },
                {
                  validator: validatorGeographic,
                },
              ]}
            >
              <GeographicView />
            </Form.Item>
            <Form.Item
              name="address"
              label={formatMessage({ id: 'BLOCK_NAME.basic.address' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.address-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label={formatMessage({ id: 'BLOCK_NAME.basic.phone' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'BLOCK_NAME.basic.phone-message' }, {}),
                },
                { validator: validatorPhone },
              ]}
            >
              <PhoneView />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="BLOCK_NAME.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ BLOCK_NAME_CAMEL_CASE }: { BLOCK_NAME_CAMEL_CASE: { currentUser: CurrentUser } }) => ({
    currentUser: BLOCK_NAME_CAMEL_CASE.currentUser,
  }),
)(BaseView);

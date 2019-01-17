import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import { Menu } from 'antd';
import styles from './style.less';
import BaseView from './components/base';
import SecurityView from './components/security';
import BindingView from './components/binding';
import NotificationView from './components/notification';

const { Item } = Menu;

@connect(({ BLOCK_NAME_CAMEL_CASE }) => ({
  currentUser: BLOCK_NAME_CAMEL_CASE.currentUser,
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends Component {
  constructor(props) {
    super(props);
    const menuMap = {
      base: <FormattedMessage id="BLOCK_NAME.menuMap.basic" defaultMessage="Basic Settings" />,
      security: (
        <FormattedMessage id="BLOCK_NAME.menuMap.security" defaultMessage="Security Settings" />
      ),
      binding: (
        <FormattedMessage id="BLOCK_NAME.menuMap.binding" defaultMessage="Account Binding" />
      ),
      notification: (
        <FormattedMessage
          id="BLOCK_NAME.menuMap.notification"
          defaultMessage="New Message Notification"
        />
      ),
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      case 'notification':
        return <NotificationView />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <div
        className={styles.main}
        ref={ref => {
          this.main = ref;
        }}
      >
        <div className={styles.leftmenu}>
          <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;

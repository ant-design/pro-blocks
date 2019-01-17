import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};

@connect(({ BLOCK_NAME_CAMEL_CASE, loading }) => {
  const { province, city } = BLOCK_NAME_CAMEL_CASE;
  return {
    province,
    city,
    loading: loading.models.BLOCK_NAME_CAMEL_CASE,
  };
})
class GeographicView extends PureComponent {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchProvince',
    });
  };

  componentDidUpdate(props) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province) {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
        payload: value.province.key,
      });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = item => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
      payload: item.key,
    });
    onChange({
      province: item,
      city: nullSlectItem,
    });
  };

  selectCityItem = item => {
    const { value, onChange } = this.props;
    onChange({
      province: value.province,
      city: item,
    });
  };

  conversionObject() {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem,
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { loading } = this.props;
    return (
      <Spin spinning={loading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}

export default GeographicView;

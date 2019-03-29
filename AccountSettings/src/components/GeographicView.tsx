import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';
import styles from './GeographicView.less';
import { Dispatch } from 'redux';
import { ProvinceData, CityData } from '../data';
const { Option } = Select;

interface SelectItem {
  label: string;
  key: string;
}
const nullSlectItem: SelectItem = {
  label: '',
  key: '',
};

interface GeographicViewProps {
  dispatch?: Dispatch;
  province?: ProvinceData[];
  city?: CityData[];
  value?: {
    province: SelectItem;
    city: SelectItem;
  };
  loading?: boolean;
  onChange?: (value: { province: SelectItem; city: SelectItem }) => void;
}

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading,
  }: {
    BLOCK_NAME_CAMEL_CASE: {
      province: ProvinceData[];
      city: CityData[];
    };
    loading: any;
  }) => {
    const { province, city } = BLOCK_NAME_CAMEL_CASE;
    return {
      province,
      city,
      loading: loading.models.BLOCK_NAME_CAMEL_CASE,
    };
  }
)
class GeographicView extends Component<GeographicViewProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch &&
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/fetchProvince',
      });
  };

  componentDidUpdate(props: GeographicViewProps) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province) {
      dispatch &&
        dispatch({
          type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
          payload: value.province.key,
        });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    if (province) {
      return this.getOption(province);
    }
    return [];
  }

  getCityOption = () => {
    const { city } = this.props;
    if (city) {
      return this.getOption(city);
    }
    return [];
  };

  getOption = (list: CityData[] | ProvinceData[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return (list as CityData[]).map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = (item: SelectItem) => {
    const { dispatch, onChange } = this.props;

    dispatch &&
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
        payload: item.key,
      });

    onChange &&
      onChange({
        province: item,
        city: nullSlectItem,
      });
  };

  selectCityItem = (item: SelectItem) => {
    const { value, onChange } = this.props;
    if (value && onChange) {
      onChange({
        province: value.province,
        city: item,
      });
    }
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

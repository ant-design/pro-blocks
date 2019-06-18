import React, { Component } from 'react';
import { Select, Spin } from 'antd';

import { Dispatch } from 'redux';
import { connect } from 'dva';
import { CityType, ProvinceType } from '../data.d';
import styles from './GeographicView.less';

const { Option } = Select;

interface SelectItem {
  label: string;
  key: string;
}
const nullSelectItem: SelectItem = {
  label: '',
  key: '',
};

interface GeographicViewProps {
  dispatch?: Dispatch<any>;
  province?: ProvinceType[];
  city?: CityType[];
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
      province: ProvinceType[];
      city: CityType[];
    };
    loading: any;
  }) => {
    const { province, city } = BLOCK_NAME_CAMEL_CASE;
    return {
      province,
      city,
      loading: loading.models.BLOCK_NAME_CAMEL_CASE,
    };
  },
)
class GeographicView extends Component<GeographicViewProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/fetchProvince',
      });
    }
  };

  componentDidUpdate(props: GeographicViewProps) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province) {
      if (dispatch) {
        dispatch({
          type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
          payload: value.province.key,
        });
      }
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

  getOption = (list: CityType[] | ProvinceType[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return (list as CityType[]).map(item => (
      <Option key={item.key} value={item.key}>
        {item.label}
      </Option>
    ));
  };

  selectProvinceItem = (item: SelectItem) => {
    const { dispatch, onChange } = this.props;

    if (dispatch) {
      dispatch({
        type: 'BLOCK_NAME_CAMEL_CASE/fetchCity',
        payload: item.key,
      });
    }
    if (onChange) {
      onChange({
        province: item,
        city: nullSelectItem,
      });
    }
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
        province: nullSelectItem,
        city: nullSelectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSelectItem,
      city: city || nullSelectItem,
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

import React from 'react';
import { Select, Spin } from 'antd';
import { useRequest } from 'umi';
import { LabeledValue } from 'antd/es/select';
import { queryProvince, queryCity } from '../service';
import { GeographicItemType } from '../data.d';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSelectItem: LabeledValue = {
  label: '',
  value: '',
  key: '',
};

interface GeographicViewProps {
  value?: {
    province: LabeledValue;
    city: LabeledValue;
  };
  onChange?: (value: { province: LabeledValue; city: LabeledValue }) => void;
}

const GeographicView: React.FC<GeographicViewProps> = ({ value, onChange }) => {
  // 获取省份列表
  const { data: provinceList, loading } = useRequest(() => {
    return queryProvince();
  });

  // 根据省份的变化更新对应的城市列表
  const { data: cityList, loading: cityLoading } = useRequest(
    () => {
      if (value?.province) {
        return queryCity(value?.province.key || '');
      }
      return {
        data: [],
        loading: false,
      };
    },
    {
      refreshDeps: [value?.province],
    },
  );

  // 展示对应的select的Options
  const getOption = (list: GeographicItemType[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  // 获取省份对应的展示
  const getProvinceOption = () => {
    if (provinceList) {
      return getOption(provinceList);
    }
    return [];
  };

  const selectProvinceItem = (item: LabeledValue) => {
    if (onChange) {
      onChange({
        province: item,
        city: nullSelectItem,
      });
    }
  };

  const selectCityItem = (item: LabeledValue) => {
    if (value && onChange) {
      onChange({
        province: value.province,
        city: item,
      });
    }
  };

  const getCityOption = () => {
    if (cityList) {
      return getOption(cityList);
    }
    return [];
  };

  return (
    <Spin spinning={loading || cityLoading} wrapperClassName={styles.row}>
      <Select
        className={styles.item}
        value={value?.province}
        labelInValue
        showSearch
        onSelect={selectProvinceItem}
      >
        {getProvinceOption()}
      </Select>
      <Select
        className={styles.item}
        value={value?.city}
        labelInValue
        showSearch
        onSelect={selectCityItem}
      >
        {getCityOption()}
      </Select>
    </Spin>
  );
};

export default GeographicView;

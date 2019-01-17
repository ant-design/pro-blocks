import { message } from 'antd';
import { fakeSubmitForm } from './service';

export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};

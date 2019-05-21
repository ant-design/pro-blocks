import { message } from 'antd';
import { fakeSubmitForm } from './service';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';

export interface ModalState {}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    submitRegularForm: Effect;
  };
}
const Model: ModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
};

export default Model;

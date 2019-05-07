import { queryCurrent } from './service';
import { CurrentUser } from './data';

export interface ModalState {
  currentUser: Partial<CurrentUser>;
}

import { Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default Model;

import { Reducer, Effect } from 'umi';
import { CurrentUser, ListItemDataType } from './data.d';
import { queryCurrent, queryFakeList } from './service';

export interface ModalState {
  currentUser: Partial<CurrentUser>;
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
    fetch: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    queryList: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    currentUser: {},
    list: [],
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...(state as ModalState),
        currentUser: action.payload || {},
      };
    },
    queryList(state, action) {
      return {
        ...(state as ModalState),
        list: action.payload,
      };
    },
  },
};

export default Model;

import { queryCurrent } from './service';
import { Dispatch } from 'redux';
import { CurrentUser } from './data';

export interface ModalState {
  currentUser: CurrentUser;
}

type callType<T, A extends any[], R> = (thisArg?: T, ...args: A) => R;
Function.call;
export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(
      _: ModalState,
      {
        call,
        put,
      }: {
        call: callType<Function, [], Promise<any>>;
        put: Dispatch;
      }
    ) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(
      state: ModalState,
      action: {
        payload: CurrentUser;
      }
    ) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

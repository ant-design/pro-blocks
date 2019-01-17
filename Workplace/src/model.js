import { queryCurrent, queryProjectNotice, queryActivities, fakeChartData } from './service';

export default {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
  state: {
    user: {
      currentUser: {},
    },
    project: {
      notice: [],
    },
    activities: {
      list: [],
    },
    chart: {
      visitData: [],
      visitData2: [],
      salesData: [],
      searchData: [],
      offlineData: [],
      offlineChartData: [],
      salesTypeData: [],
      salesTypeDataOnline: [],
      salesTypeDataOffline: [],
      radarData: [],
      loading: false,
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        user: {
          currentUser: action.payload || {},
        },
      };
    },
    saveNotice(state, action) {
      return {
        ...state,
        project: {
          notice: action.payload,
        },
      };
    },
    saveList(state, action) {
      return {
        ...state,
        activities: {
          list: action.payload,
        },
      };
    },
    saveChart(state, { payload }) {
      return {
        ...state,
        chart: {
          ...payload,
        },
      };
    },
    clear(state) {
      return {
        ...state,
        chart: {
          visitData: [],
          visitData2: [],
          salesData: [],
          searchData: [],
          offlineData: [],
          offlineChartData: [],
          salesTypeData: [],
          salesTypeDataOnline: [],
          salesTypeDataOffline: [],
          radarData: [],
        },
      };
    },
  },
  effects: {
    *init(_, { put }) {
      yield put({ type: 'fetchUserCurrent' });
      yield put({ type: 'fetchProjectNotice' });
      yield put({ type: 'fetchActivitiesList' });
      yield put({ type: 'fetchChart' });
    },
    *fetchUserCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchActivitiesList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchChart(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'saveChart',
        payload: response,
      });
    },
  },
};

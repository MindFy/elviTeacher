import { queryRule, changePwd, addRule, setTraderInfo } from '../services/api';
import { setUserData } from "../utils/userData";
import { setAuthority } from "../utils/authority";

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryRule, payload);
      if (response.code === 4000001 && response.message === 'ACCESS DENIED') {
        setAuthority('guest');
        setUserData(null);
      }
      if (response.code === 0 && response.data ) {
        yield put({
          type: 'save',
          payload: response,
        });
      }

      if (callback) callback(response);
    },
    *settraderinfo({ payload, callback }, { call, put }) {      
      const response = yield call(setTraderInfo, payload);
      if (response.code === 4000001 && response.message === 'ACCESS DENIED') {
        setAuthority('guest');
        setUserData(null);
      }
      if (callback) callback(response);
    },
    *changepwd({ payload, callback }, { call, put }) {
      const response = yield call(changePwd, payload);
      if (callback) callback(response);
    },
    *logout({ payload, callback }, { call, put }) {
      setAuthority('guest');
      setUserData(null);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      var listData = [];
      for (var bb_name in action.payload.data) {
        var item = {};
        item.name = bb_name;
        item.trader_auto = action.payload.data[bb_name].trader_auto?'yes':'no';
        item.fluctuate_price = action.payload.data[bb_name].fluctuate_price;
        item.current = action.payload.data[bb_name].current;
        item.dynamic = action.payload.data[bb_name].dynamic;
        listData.push(item);
      }
      return {
        ...state,
        data: {
          list: listData
        }
      };
    },
  },
};

import { createStore } from 'vuex';
import user from './modules/user';
import memo from './modules/memo';

// 创建Vuex存储
const store = createStore({
  modules: {
    user,
    memo
  }
});

export default store; 
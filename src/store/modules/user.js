import * as userApi from '@/api/user';

const state = {
  token: uni.getStorageSync('memo_token') || '',
  userInfo: uni.getStorageSync('userInfo') || null
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    uni.setStorageSync('memo_token', token);
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
    uni.setStorageSync('userInfo', userInfo);
  },
  CLEAR_USER(state) {
    state.token = '';
    state.userInfo = null;
    uni.removeStorageSync('memo_token');
    uni.removeStorageSync('userInfo');
  }
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      userApi.login({ username, password })
        .then(res => {
          const userData = res.data;
          commit('SET_TOKEN', userData.token);
          commit('SET_USER_INFO', userData);
          resolve(userData);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 用户注册
  register({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      userApi.register({ username, password })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 忘记密码
  forgetPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      userApi.forgetPassword(data)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 退出登录
  logout({ commit }) {
    return new Promise(resolve => {
      commit('CLEAR_USER');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}; 
import * as memoApi from '@/api/memo';

const state = {
  memoList: [],
  total: 0,
  currentMemo: null
};

const mutations = {
  SET_MEMO_LIST(state, { list, total }) {
    state.memoList = list;
    state.total = total;
  },
  SET_CURRENT_MEMO(state, memo) {
    state.currentMemo = memo;
  },
  ADD_MEMO(state, memo) {
    state.memoList.unshift(memo);
    state.total += 1;
  },
  UPDATE_MEMO(state, updatedMemo) {
    const index = state.memoList.findIndex(item => item.id === updatedMemo.id);
    if (index !== -1) {
      state.memoList.splice(index, 1, updatedMemo);
    }
    if (state.currentMemo && state.currentMemo.id === updatedMemo.id) {
      state.currentMemo = updatedMemo;
    }
  },
  DELETE_MEMO(state, memoId) {
    const index = state.memoList.findIndex(item => item.id === memoId);
    if (index !== -1) {
      state.memoList.splice(index, 1);
      state.total -= 1;
    }
    if (state.currentMemo && state.currentMemo.id === memoId) {
      state.currentMemo = null;
    }
  }
};

const actions = {
  // 获取备忘录列表
  getMemoList({ commit }, params = {}) {
    return new Promise((resolve, reject) => {
      memoApi.getMemoList(params)
        .then(res => {
          commit('SET_MEMO_LIST', res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 获取备忘录详情
  getMemoDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      memoApi.getMemoDetail(id)
        .then(res => {
          commit('SET_CURRENT_MEMO', res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 创建备忘录
  createMemo({ commit }, data) {
    return new Promise((resolve, reject) => {
      memoApi.createMemo(data)
        .then(res => {
          commit('ADD_MEMO', res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 更新备忘录
  updateMemo({ commit }, data) {
    return new Promise((resolve, reject) => {
      memoApi.updateMemo(data)
        .then(res => {
          commit('UPDATE_MEMO', res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 删除备忘录
  deleteMemo({ commit }, id) {
    return new Promise((resolve, reject) => {
      memoApi.deleteMemo(id)
        .then(res => {
          commit('DELETE_MEMO', id);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 分享备忘录
  shareMemo({ commit }, data) {
    return new Promise((resolve, reject) => {
      memoApi.shareMemo(data)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  // 搜索备忘录
  searchMemo({ commit }, params) {
    return new Promise((resolve, reject) => {
      memoApi.searchMemo(params)
        .then(res => {
          commit('SET_MEMO_LIST', res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}; 
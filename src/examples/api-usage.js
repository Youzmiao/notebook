import { 
  login, 
  register, 
  forgetPassword 
} from '@/api/user';

import { 
  getMemoList, 
  getMemoDetail, 
  createMemo, 
  updateMemo, 
  deleteMemo, 
  shareMemo, 
  searchMemo 
} from '@/api/memo';

import { setToken, getToken, removeToken, isLoggedIn } from '@/utils/token';

/**
 * 用户登录示例
 */
export function loginExample(username, password) {
  return login({ username, password })
    .then(res => {
      // 保存token
      setToken(res.data.token);
      // 保存用户信息
      uni.setStorageSync('userInfo', res.data);
      return res.data;
    });
}

/**
 * 用户注册示例
 */
export function registerExample(username, password) {
  return register({ username, password })
    .then(res => {
      return res.data;
    });
}

/**
 * 重置密码示例
 */
export function resetPasswordExample(username, verifyCode, newPassword) {
  return forgetPassword({ username, verifyCode, newPassword })
    .then(res => {
      return res.data;
    });
}

/**
 * 获取备忘录列表示例
 */
export function getMemoListExample(page = 1, pageSize = 10, keyword = '') {
  return getMemoList({ page, pageSize, keyword })
    .then(res => {
      return res.data;
    });
}

/**
 * 获取备忘录详情示例
 */
export function getMemoDetailExample(id) {
  return getMemoDetail(id)
    .then(res => {
      return res.data;
    });
}

/**
 * 创建备忘录示例
 */
export function createMemoExample(title, content) {
  return createMemo({ title, content })
    .then(res => {
      return res.data;
    });
}

/**
 * 更新备忘录示例
 */
export function updateMemoExample(id, title, content) {
  return updateMemo({ id, title, content })
    .then(res => {
      return res.data;
    });
}

/**
 * 删除备忘录示例
 */
export function deleteMemoExample(id) {
  return deleteMemo(id)
    .then(res => {
      return res.data;
    });
}

/**
 * 分享备忘录示例
 */
export function shareMemoExample(id, shareType) {
  return shareMemo({ id, shareType })
    .then(res => {
      return res.data;
    });
}

/**
 * 搜索备忘录示例
 */
export function searchMemoExample(keyword, page = 1, pageSize = 10) {
  return searchMemo({ keyword, page, pageSize })
    .then(res => {
      return res.data;
    });
} 
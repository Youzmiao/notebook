/**
 * token相关工具函数
 */

// token的存储key
const TOKEN_KEY = 'memo_token';

/**
 * 设置token
 * @param {string} token - 用户token
 */
export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token);
}

/**
 * 获取token
 * @returns {string} token字符串
 */
export function getToken() {
  return uni.getStorageSync(TOKEN_KEY);
}

/**
 * 移除token
 */
export function removeToken() {
  uni.removeStorageSync(TOKEN_KEY);
}

/**
 * 判断用户是否已登录
 * @returns {boolean} 是否已登录
 */
export function isLoggedIn() {
  return !!getToken();
} 
/**
 * 用户相关API
 */
import request from '@/utils/request';

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 请求Promise
 */
export function login(data) {
  return request.post('/api/user/login', data);
}

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise} 请求Promise
 */
export function register(data) {
  return request.post('/api/user/register', data);
}

/**
 * 重置密码
 * @param {Object} data - 密码重置信息
 * @param {string} data.username - 用户名
 * @param {string} data.verifyCode - 验证码
 * @param {string} data.newPassword - 新密码
 * @returns {Promise} 请求Promise
 */
export function forgetPassword(data) {
  return request.post('/api/user/forget-password', data);
} 
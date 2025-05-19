/**
 * HTTP请求工具函数 - 使用uni.request替代axios以适配小程序环境
 */
import { getToken } from './token';

// API基础URL
const BASE_URL = 'https://qpmqdrflsvas.sealoshzh.site';
const TIMEOUT = 15000; // 请求超时时间

/**
 * 封装uni.request请求
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 构建请求配置
    const requestOptions = {
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      timeout: TIMEOUT,
      header: options.headers || {},
      success: (res) => {
        const data = res.data;
        
        // 如果状态码不是200，则判断为错误
        if (data.code !== 200) {
          uni.showToast({
            title: data.message || '请求失败',
            icon: 'none',
            duration: 2000
          });
          
          // 401: 未登录或token过期
          if (data.code === 401) {
            // 清除本地token并跳转到登录页
            uni.showModal({
              title: '提示',
              content: '登录已过期，请重新登录',
              success: function (res) {
                if (res.confirm) {
                  // 清除token
                  uni.removeStorageSync('memo_token');
                  uni.removeStorageSync('userInfo');
                  uni.reLaunch({
                    url: '/pages/login/login'
                  });
                }
              }
            });
          }
          
          reject(data);
        } else {
          resolve(data);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        let message = '请求失败';
        if (err.errMsg.includes('timeout')) {
          message = '请求超时';
        }
        uni.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        });
        reject(err);
      }
    };
    
    // 处理不同请求方法的数据
    if (options.method === 'GET' || options.method === 'get') {
      requestOptions.data = options.params || {};
    } else {
      requestOptions.data = options.data || {};
    }
    
    // 添加token到请求头
    const token = getToken();
    if (token) {
      requestOptions.header['Authorization'] = `Bearer ${token}`;
    }
    
    // 发送请求
    uni.request(requestOptions);
  });
};

/**
 * GET请求
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
request.get = (url, params = {}, headers = {}) => {
  return request({
    url,
    method: 'GET',
    params,
    headers
  });
};

/**
 * POST请求
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
request.post = (url, data = {}, headers = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    headers
  });
};

/**
 * PUT请求
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
request.put = (url, data = {}, headers = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    headers
  });
};

/**
 * DELETE请求
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise
 */
request.delete = (url, params = {}, headers = {}) => {
  return request({
    url,
    method: 'DELETE',
    params,
    headers
  });
};

export default request; 
/**
 * 备忘录相关API
 */
import request from '@/utils/request';

/**
 * 获取备忘录列表
 * @param {Object} params - 查询参数
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页条数
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise} 请求Promise
 */
export function getMemoList(params) {
  return request.get('/api/memo/list', params);
}

/**
 * 获取备忘录详情
 * @param {string} id - 备忘录ID
 * @returns {Promise} 请求Promise
 */
export function getMemoDetail(id) {
  return request.get('/api/memo/detail', { id });
}

/**
 * 创建备忘录
 * @param {Object} data - 备忘录信息
 * @param {string} data.title - 备忘录标题
 * @param {string} data.content - 备忘录内容
 * @returns {Promise} 请求Promise
 */
export function createMemo(data) {
  return request.post('/api/memo/create', data);
}

/**
 * 更新备忘录
 * @param {Object} data - 备忘录信息
 * @param {string} data.id - 备忘录ID
 * @param {string} data.title - 备忘录标题
 * @param {string} data.content - 备忘录内容
 * @returns {Promise} 请求Promise
 */
export function updateMemo(data) {
  return request.put('/api/memo/update', data);
}

/**
 * 删除备忘录
 * @param {string} id - 备忘录ID
 * @returns {Promise} 请求Promise
 */
export function deleteMemo(id) {
  return request.delete('/api/memo/delete', { id });
}

/**
 * 分享备忘录
 * @param {Object} data - 分享信息
 * @param {string} data.id - 备忘录ID
 * @param {number} data.shareType - 分享类型(1-微信好友，2-朋友圈，3-生成链接)
 * @returns {Promise} 请求Promise
 */
export function shareMemo(data) {
  return request.post('/api/memo/share', data);
}

/**
 * 搜索备忘录
 * @param {Object} params - 查询参数
 * @param {string} params.keyword - 搜索关键词
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=10] - 每页条数
 * @returns {Promise} 请求Promise
 */
export function searchMemo(params) {
  return request.get('/api/memo/search', params);
} 
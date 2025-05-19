/**
 * 路由权限拦截器
 */
import { isLoggedIn } from './token';

// 不需要登录就能访问的白名单路径
const whiteList = [
  '/pages/login/login',
  '/pages/register/register'
];

/**
 * 页面跳转权限检查
 * 在main.js中调用
 */
export function setupPermissionGuard() {
  // 页面跳转拦截
  const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
  
  list.forEach(item => {
    uni.addInterceptor(item, {
      invoke(e) {
        // 获取要跳转的页面路径（目标路由）
        const url = e.url.split('?')[0];
        
        // 如果在白名单中或已登录，直接跳转
        if (whiteList.includes(url) || isLoggedIn()) {
          return e;
        } else {
          // 如果未登录，跳转到登录页
          uni.reLaunch({
            url: '/pages/login/login'
          });
          return false;
        }
      },
      fail(err) {
        console.error('路由拦截器错误:', err);
      }
    });
  });
  
  // 初始页面检查
  function checkInitialPage() {
    const pages = getCurrentPages();
    
    // 如果页面栈为空，说明是首次加载
    if (!pages || pages.length === 0) {
      // 检查是否登录
      if (!isLoggedIn()) {
        // 如果未登录，跳转到登录页面
        uni.reLaunch({ url: '/pages/login/login' });
      }
    }
  }
  
  // 小程序环境下启动时检查初始页面
  if (uni.getSystemInfoSync().platform !== 'web') {
    setTimeout(checkInitialPage, 100);
  }
} 
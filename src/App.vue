<script>
import { isLoggedIn } from '@/utils/token';

export default {
  onLaunch: function () {
    console.log('App Launch');
    
    // 检查登录状态
    if (!isLoggedIn()) {
      // 如果未登录，跳转到登录页
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  background-color: #f8f8f8;
}
</style>

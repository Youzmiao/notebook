<template>
  <view class="profile-container">
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="avatar-box">
        <text class="default-avatar" v-if="!userInfo || !userInfo.avatar">👤</text>
        <image class="avatar" v-else :src="userInfo.avatar" mode="aspectFill"></image>
      </view>
      <view class="user-details">
        <view class="username">{{ userInfo ? userInfo.username : '游客' }}</view>
        <view class="user-id" v-if="userInfo">ID: {{ userInfo.userId }}</view>
      </view>
    </view>
    
    <!-- 统计信息 -->
    <view class="stats-section">
      <view class="stat-item">
        <view class="stat-number">{{ total }}</view>
        <view class="stat-label">备忘录</view>
      </view>
      <view class="stat-item">
        <view class="stat-number">0</view>
        <view class="stat-label">收藏</view>
      </view>
      <view class="stat-item">
        <view class="stat-number">0</view>
        <view class="stat-label">分享</view>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="syncData">
          <text class="menu-icon">🔄</text>
          <text class="menu-title">同步数据</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="goToSettings">
          <text class="menu-icon">⚙️</text>
          <text class="menu-title">设置</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="goToFeedback">
          <text class="menu-icon">📝</text>
          <text class="menu-title">意见反馈</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="goToAbout">
          <text class="menu-icon">ℹ️</text>
          <text class="menu-title">关于我们</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
      
      <view class="logout-btn" @click="handleLogout" v-if="userInfo">退出登录</view>
      <view class="login-btn" @click="goToLogin" v-else>立即登录</view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('memo', ['total'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    
    // 退出登录
    async handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              await this.logout();
              uni.showToast({
                title: '已退出登录',
                icon: 'success'
              });
              
              // 跳转到登录页
              setTimeout(() => {
                uni.reLaunch({
                  url: '/pages/login/login'
                });
              }, 1500);
            } catch (error) {
              uni.showToast({
                title: '退出失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },
    
    // 跳转到登录页
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    
    // 同步数据
    syncData() {
      if (!this.userInfo) {
        this.goToLogin();
        return;
      }
      
      uni.showLoading({
        title: '同步中...'
      });
      
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: '同步成功',
          icon: 'success'
        });
      }, 1500);
    },
    
    // 跳转到设置页面
    goToSettings() {
      uni.showToast({
        title: '设置功能开发中',
        icon: 'none'
      });
    },
    
    // 跳转到反馈页面
    goToFeedback() {
      uni.showToast({
        title: '反馈功能开发中',
        icon: 'none'
      });
    },
    
    // 跳转到关于页面
    goToAbout() {
      uni.showToast({
        title: '关于功能开发中',
        icon: 'none'
      });
    }
  }
};
</script>

<style lang="scss">
.profile-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  
  .user-info-section {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    
    .avatar-box {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .default-avatar {
        font-size: 40px;
      }
      
      .avatar {
        width: 100%;
        height: 100%;
      }
    }
    
    .user-details {
      flex: 1;
      
      .username {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .user-id {
        font-size: 12px;
        color: #999;
      }
    }
  }
  
  .stats-section {
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        font-size: 20px;
        font-weight: bold;
        color: #409eff;
        margin-bottom: 5px;
      }
      
      .stat-label {
        font-size: 12px;
        color: #666;
      }
    }
  }
  
  .menu-section {
    .menu-group {
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      overflow: hidden;
      
      .menu-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #f5f5f5;
        
        &:last-child {
          border-bottom: none;
        }
        
        .menu-icon {
          margin-right: 10px;
          font-size: 18px;
        }
        
        .menu-title {
          flex: 1;
          font-size: 15px;
        }
        
        .menu-arrow {
          color: #ccc;
          font-size: 14px;
        }
      }
    }
    
    .logout-btn, .login-btn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      font-size: 16px;
    }
    
    .logout-btn {
      color: #ff5a5f;
    }
    
    .login-btn {
      color: #409eff;
    }
  }
}
</style> 
<template>
  <view class="login-container">
    <!-- 用户头像和应用名称 -->
    <view class="logo-container">
      <view class="logo-box">
        <image class="logo-image" src="/static/images/user-icon.png"></image>
      </view>
      <text class="app-name">UniApp</text>
    </view>
    
    <!-- 登录表单 -->
    <view class="form-container">
      <!-- 用户名/手机号输入框 -->
      <view class="input-box">
        <view class="icon-container">
          <image class="input-icon" src="/static/images/user-input-icon.png"></image>
        </view>
        <input 
          class="input" 
          type="text" 
          placeholder="用户名/手机号" 
          placeholder-class="placeholder"
          v-model="loginForm.username"
        />
      </view>
      
      <!-- 密码输入框 -->
      <view class="input-box">
        <view class="icon-container">
          <image class="input-icon" src="/static/images/lock-input-icon.png"></image>
        </view>
        <input 
          class="input" 
          type="password" 
          placeholder="请输入密码" 
          placeholder-class="placeholder"
          v-model="loginForm.password"
          password
        />
      </view>
      
      <!-- 忘记密码 -->
      <view class="forgot-password">
        <text @click="forgotPassword">忘记密码?</text>
      </view>
      
      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登 录</button>
      
      <!-- 注册链接 -->
      <view class="register-link">
        <text>还没有账号? </text>
        <text class="register-text" @click="goToRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 处理登录
    async handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        uni.showToast({
          title: '用户名和密码不能为空',
          icon: 'none'
        });
        return;
      }
      
      try {
        // 显示加载
        uni.showLoading({
          title: '登录中...'
        });
        
        // 调用登录接口
        const result = await this.$store.dispatch('user/login', this.loginForm);
        
        // 关闭加载
        uni.hideLoading();
        
        // 登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 跳转到首页
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
        
      } catch (error) {
        // 关闭加载
        uni.hideLoading();
        
        // 显示错误提示
        uni.showToast({
          title: error.message || '登录失败，请重试',
          icon: 'none'
        });
      }
    },
    
    // 跳转到注册页
    goToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    },
    
    // 忘记密码
    forgotPassword() {
      uni.showToast({
        title: '忘记密码功能开发中',
        icon: 'none'
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #8a9af8, #6e6ef9);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  // 背景装饰元素
  &::before, &::after {
    content: "";
    position: absolute;
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::before {
    top: -100rpx;
    right: -100rpx;
  }
  
  &::after {
    bottom: -100rpx;
    left: -100rpx;
  }
}

.logo-container {
  margin-top: 150rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-box {
  width: 160rpx;
  height: 160rpx;
  background-color: #fff;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  width: 100rpx;
  height: 100rpx;
}

.app-name {
  margin-top: 30rpx;
  font-size: 48rpx;
  font-weight: 600;
  color: #fff;
}

.form-container {
  width: 85%;
  margin-top: 80rpx;
}

.input-box {
  height: 100rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.icon-container {
  width: 90rpx;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f3f7;
  border-right: 1rpx solid rgba(0, 0, 0, 0.05);
}

.input-icon {
  width: 40rpx;
  height: 40rpx;
}

.input {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #333;
  padding: 0 30rpx;
}

.placeholder {
  color: #999;
}

.forgot-password {
  text-align: right;
  margin: 10rpx 20rpx 40rpx;
  
  text {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
  }
}

.login-btn {
  height: 100rpx;
  background: linear-gradient(to right, #6e6ef9, #8a9af8);
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
  border-radius: 12rpx;
  box-shadow: 0 10rpx 20rpx rgba(122, 108, 249, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60rpx;
  border: none;
}

.register-link {
  text-align: center;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  
  .register-text {
    color: #fff;
    font-weight: 500;
  }
}
</style> 
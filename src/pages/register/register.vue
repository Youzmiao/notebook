<template>
  <view class="register-container">
    <view class="register-form">
      <view class="title">注册账号</view>
      
      <view class="input-item">
        <input type="text" v-model="registerForm.username" placeholder="请输入用户名" />
      </view>
      
      <view class="input-item">
        <input type="password" v-model="registerForm.password" placeholder="请输入密码" />
      </view>
      
      <view class="input-item">
        <input type="password" v-model="confirmPassword" placeholder="请确认密码" />
      </view>
      
      <button class="register-btn" @click="handleRegister">注册</button>
      
      <view class="login-link">
        <text @click="goToLogin">已有账号？返回登录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      confirmPassword: ''
    };
  },
  methods: {
    // 处理注册
    async handleRegister() {
      // 表单验证
      if (!this.registerForm.username) {
        uni.showToast({
          title: '请输入用户名',
          icon: 'none'
        });
        return;
      }
      
      if (!this.registerForm.password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        });
        return;
      }
      
      if (this.registerForm.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        });
        return;
      }
      
      try {
        // 显示加载
        uni.showLoading({
          title: '注册中...'
        });
        
        // 调用注册接口
        await this.$store.dispatch('user/register', this.registerForm);
        
        // 关闭加载
        uni.hideLoading();
        
        // 注册成功提示
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        });
        
        // 跳转到登录页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
        
      } catch (error) {
        // 关闭加载
        uni.hideLoading();
        
        // 显示错误提示
        uni.showToast({
          title: error.message || '注册失败，请重试',
          icon: 'none'
        });
      }
    },
    
    // 跳转到登录页
    goToLogin() {
      uni.navigateBack();
    }
  }
};
</script>

<style lang="scss">
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  
  .register-form {
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    
    .title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 30px;
      font-weight: bold;
    }
    
    .input-item {
      margin-bottom: 20px;
      
      input {
        width: 100%;
        height: 45px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 15px;
        font-size: 16px;
      }
    }
    
    .register-btn {
      width: 100%;
      height: 45px;
      background-color: #409eff;
      color: #fff;
      border-radius: 4px;
      margin-top: 10px;
      font-size: 16px;
    }
    
    .login-link {
      margin-top: 20px;
      text-align: center;
      
      text {
        color: #409eff;
        font-size: 14px;
      }
    }
  }
}
</style> 
<template>
  <view class="edit-memo">
    <view class="form-item">
      <input 
        class="title-input" 
        v-model="memoForm.title" 
        placeholder="请输入标题" 
      />
    </view>
    
    <view class="form-item">
      <textarea 
        class="content-textarea" 
        v-model="memoForm.content" 
        placeholder="请输入备忘录内容" 
      />
    </view>
    
    <view class="btn-group">
      <button class="cancel-btn" @click="goBack">取消</button>
      <button class="save-btn" @click="saveMemo">保存</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: '',
      memoForm: {
        id: '',
        title: '',
        content: ''
      }
    };
  },
  computed: {
    ...mapState('memo', ['currentMemo'])
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
      this.fetchMemoDetail();
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  methods: {
    ...mapActions('memo', ['getMemoDetail', 'updateMemo']),
    
    // 获取备忘录详情
    async fetchMemoDetail() {
      try {
        uni.showLoading({ title: '加载中...' });
        
        await this.getMemoDetail(this.id);
        
        // 将数据填充到表单
        if (this.currentMemo) {
          this.memoForm = {
            id: this.currentMemo.id,
            title: this.currentMemo.title,
            content: this.currentMemo.content
          };
        }
        
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: '获取备忘录详情失败',
          icon: 'none'
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }
    },
    
    // 保存备忘录
    async saveMemo() {
      if (!this.memoForm.title.trim()) {
        uni.showToast({
          title: '请输入备忘录标题',
          icon: 'none'
        });
        return;
      }
      
      try {
        // 显示加载
        uni.showLoading({ title: '保存中...' });
        
        // 调用更新备忘录接口
        await this.updateMemo(this.memoForm);
        
        // 关闭加载
        uni.hideLoading();
        
        // 保存成功提示
        uni.showToast({
          title: '更新成功',
          icon: 'success'
        });
        
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
        
      } catch (error) {
        // 关闭加载
        uni.hideLoading();
        
        // 显示错误提示
        uni.showToast({
          title: error.message || '更新失败，请重试',
          icon: 'none'
        });
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    }
  }
};
</script>

<style lang="scss">
.edit-memo {
  padding: 20px;
  
  .form-item {
    margin-bottom: 20px;
    
    .title-input {
      width: 100%;
      height: 50px;
      padding: 0 15px;
      font-size: 18px;
      border-bottom: 1px solid #eaeaea;
    }
    
    .content-textarea {
      width: 100%;
      height: 300px;
      padding: 15px;
      font-size: 16px;
      line-height: 1.5;
      border: 1px solid #eaeaea;
      border-radius: 5px;
    }
  }
  
  .btn-group {
    display: flex;
    justify-content: space-between;
    
    button {
      width: 45%;
      height: 45px;
      font-size: 16px;
      border-radius: 5px;
    }
    
    .cancel-btn {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .save-btn {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style> 
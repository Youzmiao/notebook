<template>
  <view class="memo-detail" v-if="memo">
    <view class="memo-header">
      <view class="memo-title">{{ memo.title }}</view>
      <view class="memo-time">{{ memo.time }}</view>
    </view>
    
    <view class="memo-content">{{ memo.content }}</view>
    
    <view class="action-bar">
      <view class="action-btn edit" @click="goToEdit">编辑</view>
      <view class="action-btn share" @click="handleShare">分享</view>
      <view class="action-btn delete" @click="handleDelete">删除</view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: ''
    };
  },
  computed: {
    ...mapState('memo', ['currentMemo']),
    memo() {
      return this.currentMemo;
    }
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
    ...mapActions('memo', ['getMemoDetail', 'deleteMemo', 'shareMemo']),
    
    // 获取备忘录详情
    async fetchMemoDetail() {
      try {
        uni.showLoading({ title: '加载中...' });
        
        await this.getMemoDetail(this.id);
        
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
    
    // 跳转到编辑页
    goToEdit() {
      uni.navigateTo({
        url: `/pages/memo/edit?id=${this.id}`
      });
    },
    
    // 分享备忘录
    async handleShare() {
      try {
        uni.showLoading({ title: '生成分享链接...' });
        
        const result = await this.shareMemo({ id: this.id, shareType: 3 });
        
        uni.hideLoading();
        
        if (result && result.shareUrl) {
          uni.showModal({
            title: '分享链接',
            content: result.shareUrl,
            confirmText: '复制',
            success: (res) => {
              if (res.confirm) {
                uni.setClipboardData({
                  data: result.shareUrl,
                  success: () => {
                    uni.showToast({
                      title: '链接已复制',
                      icon: 'success'
                    });
                  }
                });
              }
            }
          });
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    },
    
    // 删除备忘录
    handleDelete() {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条备忘录吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '删除中...' });
              
              await this.deleteMemo(this.id);
              
              uni.hideLoading();
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
              
              setTimeout(() => {
                uni.navigateBack();
              }, 1500);
            } catch (error) {
              uni.hideLoading();
              uni.showToast({
                title: '删除失败',
                icon: 'none'
              });
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.memo-detail {
  padding: 20px;
  
  .memo-header {
    margin-bottom: 20px;
    
    .memo-title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .memo-time {
      font-size: 14px;
      color: #999;
    }
  }
  
  .memo-content {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 30px;
    white-space: pre-wrap;
  }
  
  .action-bar {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      
      &.edit {
        background-color: #ecf5ff;
        color: #409eff;
      }
      
      &.share {
        background-color: #f0f9eb;
        color: #67c23a;
      }
      
      &.delete {
        background-color: #fef0f0;
        color: #f56c6c;
      }
    }
  }
}
</style> 
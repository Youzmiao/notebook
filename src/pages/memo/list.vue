<template>
  <view class="memo-list-container">
    <!-- 搜索框 -->
    <view class="search-box">
      <view class="search-input">
        <input 
          type="text" 
          v-model="keyword" 
          placeholder="搜索备忘录" 
          @confirm="handleSearch"
        />
        <text class="search-icon" @click="handleSearch">🔍</text>
      </view>
    </view>
    
    <!-- 备忘录列表 -->
    <view class="memo-list">
      <view 
        class="memo-item" 
        v-for="(item, index) in memoList" 
        :key="item.id"
        @click="goToDetail(item.id)"
      >
        <view class="memo-title">{{ item.title }}</view>
        <view class="memo-content">{{ item.content }}</view>
        <view class="memo-time">{{ item.time }}</view>
        
        <view class="memo-actions">
          <view class="action-btn edit" @click.stop="goToEdit(item.id)">编辑</view>
          <view class="action-btn share" @click.stop="handleShare(item.id)">分享</view>
          <view class="action-btn delete" @click.stop="handleDelete(item.id)">删除</view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="memoList.length === 0">
        <view class="empty-icon">📝</view>
        <view class="empty-text">暂无备忘录，点击下方按钮创建</view>
      </view>
    </view>
    
    <!-- 分页 -->
    <view class="pagination" v-if="total > 0">
      <view class="page-info">共 {{ total }} 条</view>
      <view class="page-btn prev" :class="{ disabled: page <= 1 }" @click="prevPage">上一页</view>
      <view class="page-number">{{ page }}</view>
      <view class="page-btn next" :class="{ disabled: page >= maxPage }" @click="nextPage">下一页</view>
    </view>
    
    <!-- 添加按钮 -->
    <view class="add-btn" @click="goToCreate">+</view>
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      keyword: '',
      page: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapState('memo', ['memoList', 'total']),
    maxPage() {
      return Math.ceil(this.total / this.pageSize);
    }
  },
  onLoad() {
    this.loadMemoList();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.loadMemoList().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    // 加载备忘录列表
    async loadMemoList() {
      try {
        uni.showLoading({ title: '加载中...' });
        
        await this.$store.dispatch('memo/getMemoList', { 
          page: this.page, 
          pageSize: this.pageSize, 
          keyword: this.keyword 
        });
        
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: '加载备忘录失败',
          icon: 'none'
        });
      }
    },
    
    // 搜索备忘录
    async handleSearch() {
      this.page = 1;
      try {
        if (this.keyword) {
          await this.$store.dispatch('memo/searchMemo', {
            keyword: this.keyword,
            page: this.page,
            pageSize: this.pageSize
          });
        } else {
          await this.loadMemoList();
        }
      } catch (error) {
        uni.showToast({
          title: '搜索失败',
          icon: 'none'
        });
      }
    },
    
    // 删除备忘录
    handleDelete(id) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条备忘录吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '删除中...' });
              
              await this.$store.dispatch('memo/deleteMemo', id);
              
              uni.hideLoading();
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
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
    },
    
    // 分享备忘录
    async handleShare(id) {
      try {
        uni.showLoading({ title: '生成分享链接...' });
        
        const result = await this.$store.dispatch('memo/shareMemo', { id, shareType: 3 });
        
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
    
    // 上一页
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.loadMemoList();
      }
    },
    
    // 下一页
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++;
        this.loadMemoList();
      }
    },
    
    // 跳转到详情页
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/memo/detail?id=${id}`
      });
    },
    
    // 跳转到编辑页
    goToEdit(id) {
      uni.navigateTo({
        url: `/pages/memo/edit?id=${id}`
      });
    },
    
    // 跳转到创建页
    goToCreate() {
      uni.navigateTo({
        url: '/pages/memo/create'
      });
    }
  }
};
</script>

<style lang="scss">
.memo-list-container {
  padding: 20px;
  padding-bottom: 80px;
  
  .search-box {
    margin-bottom: 20px;
    
    .search-input {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 20px;
      padding: 0 15px;
      height: 40px;
      
      input {
        flex: 1;
        height: 100%;
        font-size: 14px;
      }
      
      .search-icon {
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
  
  .memo-list {
    .memo-item {
      background-color: #fff;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      
      .memo-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .memo-content {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      
      .memo-time {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      
      .memo-actions {
        display: flex;
        justify-content: flex-end;
        
        .action-btn {
          padding: 5px 10px;
          border-radius: 3px;
          font-size: 12px;
          margin-left: 10px;
          
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
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0;
      
      .empty-icon {
        font-size: 40px;
        margin-bottom: 20px;
      }
      
      .empty-text {
        font-size: 14px;
        color: #999;
      }
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    
    .page-info {
      font-size: 12px;
      color: #999;
      margin-right: 15px;
    }
    
    .page-btn {
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 12px;
      
      &.disabled {
        color: #ccc;
        cursor: not-allowed;
      }
    }
    
    .page-number {
      margin: 0 10px;
      font-size: 14px;
    }
  }
  
  .add-btn {
    position: fixed;
    right: 30px;
    bottom: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #409eff;
    color: #fff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
}
</style> 
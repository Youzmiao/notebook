<template>
  <view class="index-container">
    <view class="header">
      <view class="welcome">
        <text class="greeting">您好，</text>
        <text class="username">{{ userInfo ? userInfo.username : '游客' }}</text>
      </view>
      <view class="date">{{ currentDate }}</view>
    </view>
    
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
    
    <view class="tabs">
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'all' }" 
        @click="switchTab('all')"
      >全部</view>
      <view 
        class="tab-item" 
        :class="{ active: activeTab === 'recent' }" 
        @click="switchTab('recent')"
      >最近</view>
    </view>
    
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
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="memoList.length === 0">
        <view class="empty-icon">📝</view>
        <view class="empty-text">暂无备忘录，点击下方按钮创建</view>
      </view>
    </view>
    
    <!-- 添加按钮 -->
    <view class="add-btn" @click="goToCreate">+</view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      keyword: '',
      activeTab: 'all',
      currentDate: '',
      page: 1,
      pageSize: 10
    };
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('memo', ['memoList', 'total'])
  },
  onLoad() {
    this.setCurrentDate();
    this.loadMemoList();
  },
  onShow() {
    // 每次页面显示时刷新列表
    this.loadMemoList();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.loadMemoList().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    // 如果还有更多数据，加载下一页
    if (this.memoList.length < this.total) {
      this.page++;
      this.loadMoreMemo();
    }
  },
  methods: {
    ...mapActions('memo', ['getMemoList', 'searchMemo']),
    
    // 设置当前日期
    setCurrentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      this.currentDate = `${year}-${month}-${day}`;
    },
    
    // 加载备忘录列表
    async loadMemoList() {
      try {
        uni.showLoading({ title: '加载中...' });
        
        const params = {
          page: this.page,
          pageSize: this.pageSize
        };
        
        if (this.keyword) {
          params.keyword = this.keyword;
        }
        
        await this.getMemoList(params);
        
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: '加载备忘录失败',
          icon: 'none'
        });
      }
    },
    
    // 加载更多
    async loadMoreMemo() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize
        };
        
        if (this.keyword) {
          params.keyword = this.keyword;
        }
        
        await this.getMemoList(params);
      } catch (error) {
        uni.showToast({
          title: '加载更多失败',
          icon: 'none'
        });
      }
    },
    
    // 搜索备忘录
    handleSearch() {
      this.page = 1;
      if (this.keyword) {
        this.searchMemo({
          keyword: this.keyword,
          page: this.page,
          pageSize: this.pageSize
        });
      } else {
        this.loadMemoList();
      }
    },
    
    // 切换标签
    switchTab(tab) {
      this.activeTab = tab;
      this.page = 1;
      this.loadMemoList();
    },
    
    // 跳转到详情页
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/memo/detail?id=${id}`
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
.index-container {
  padding: 20px;
  padding-bottom: 80px;
  background-color: #f5f5f5;
  min-height: 100vh;
  
  .header {
    margin-bottom: 20px;
    
    .welcome {
      margin-bottom: 5px;
      
      .greeting {
        font-size: 16px;
        color: #666;
      }
      
      .username {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
    }
    
    .date {
      font-size: 14px;
      color: #999;
    }
  }
  
  .search-box {
    margin-bottom: 20px;
    
    .search-input {
      display: flex;
      align-items: center;
      background-color: #fff;
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
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
    
    .tab-item {
      padding: 8px 20px;
      font-size: 14px;
      color: #666;
      margin-right: 15px;
      border-radius: 20px;
      
      &.active {
        background-color: #409eff;
        color: #fff;
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

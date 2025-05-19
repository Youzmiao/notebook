<template>
  <view class="search-container">
    <!-- 顶部搜索框 -->
    <view class="search-header">
      <view class="back-icon" @click="goBack">
        <image src="../../static/icons/back.svg" mode="aspectFit"></image>
      </view>
      <view class="search-input-box">
        <input 
          class="search-input" 
          v-model="keyword" 
          placeholder="搜索笔记" 
          confirm-type="search"
          @confirm="handleSearch"
          focus
        />
        <view class="clear-icon" v-if="keyword" @click="clearKeyword">
          <image src="../../static/icons/close.svg" mode="aspectFit"></image>
        </view>
      </view>
      <view class="search-btn" @click="handleSearch">搜索</view>
    </view>
    
    <!-- 搜索结果 -->
    <view class="search-results" v-if="keyword">
      <!-- 加载中 -->
      <view class="loading-container" v-if="loading">
        <view class="loading-spinner"></view>
        <text class="loading-text">搜索中...</text>
      </view>
      
      <!-- 结果列表 -->
      <block v-else>
        <view class="memo-list" v-if="searchResults.length > 0">
          <view class="memo-item" v-for="(item, index) in searchResults" :key="item.id" @click="viewMemo(item)">
            <view class="memo-content">
              <text class="memo-title">{{item.title}}</text>
              <text class="memo-desc">{{item.content}}</text>
              <text class="memo-time">{{item.time}}</text>
            </view>
          </view>
        </view>
        
        <!-- 无结果提示 -->
        <view class="empty-tip" v-else>
          <text>未找到包含"{{keyword}}"的笔记</text>
        </view>
      </block>
    </view>
    
    <!-- 搜索历史 -->
    <view class="search-history" v-else>
      <view class="history-header">
        <text class="history-title">搜索历史</text>
        <view class="clear-history" @click="clearHistory">
          <image src="../../static/icons/delete.svg" mode="aspectFit"></image>
        </view>
      </view>
      
      <view class="history-list" v-if="searchHistory.length > 0">
        <view class="history-item" v-for="(item, index) in searchHistory" :key="index" @click="useHistoryKeyword(item)">
          <text>{{item}}</text>
        </view>
      </view>
      
      <view class="empty-history" v-else>
        <text>暂无搜索历史</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { searchMemo } from '@/api/memo';

// 搜索关键词
const keyword = ref('');
// 加载状态
const loading = ref(false);
// 搜索结果
const searchResults = ref([]);
// 搜索历史
const searchHistory = ref([]);
// 分页参数
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
});

// 页面加载时获取搜索历史
onMounted(() => {
  const history = uni.getStorageSync('searchHistory');
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
});

// 处理搜索
const handleSearch = () => {
  if (!keyword.value) {
    uni.showToast({
      title: '请输入搜索关键词',
      icon: 'none'
    });
    return;
  }
  
  // 保存到搜索历史
  saveToHistory(keyword.value);
  
  // 开始搜索
  loading.value = true;
  searchResults.value = [];
  
  searchMemo({
    keyword: keyword.value,
    page: pagination.value.page,
    pageSize: pagination.value.pageSize
  }).then(res => {
    loading.value = false;
    searchResults.value = res.data.list;
    pagination.value.total = res.data.total;
  }).catch(err => {
    loading.value = false;
    uni.showToast({
      title: '搜索失败，请重试',
      icon: 'none'
    });
  });
};

// 查看备忘录详情
const viewMemo = (item) => {
  uni.navigateTo({
    url: '/pages/memo/detail?id=' + item.id
  });
};

// 清空关键词
const clearKeyword = () => {
  keyword.value = '';
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 使用历史关键词
const useHistoryKeyword = (key) => {
  keyword.value = key;
  handleSearch();
};

// 清空搜索历史
const clearHistory = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清空搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        searchHistory.value = [];
        uni.removeStorageSync('searchHistory');
      }
    }
  });
};

// 保存到搜索历史
const saveToHistory = (key) => {
  // 如果已存在，先移除再添加到最前面
  const index = searchHistory.value.indexOf(key);
  if (index !== -1) {
    searchHistory.value.splice(index, 1);
  }
  
  // 添加到最前面
  searchHistory.value.unshift(key);
  
  // 最多保留10条记录
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10);
  }
  
  // 保存到本地存储
  uni.setStorageSync('searchHistory', JSON.stringify(searchHistory.value));
};
</script>

<style lang="scss">
.search-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.back-icon {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
}

.back-icon image {
  width: 40rpx;
  height: 40rpx;
}

.search-input-box {
  flex: 1;
  height: 80rpx;
  background-color: #f2f3f7;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  position: relative;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333;
}

.clear-icon {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-icon image {
  width: 30rpx;
  height: 30rpx;
}

.search-btn {
  font-size: 30rpx;
  color: #007aff;
  padding: 0 20rpx;
  margin-left: 20rpx;
}

.search-results, .search-history {
  flex: 1;
  overflow-y: auto;
  padding: 0 30rpx;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200rpx;
  margin-top: 100rpx;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid #e0e0e0;
  border-top: 4rpx solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #999;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.memo-list {
  padding-top: 30rpx;
}

.memo-item {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.memo-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.memo-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
  display: block;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.memo-time {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 100rpx 0;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
}

.history-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.clear-history {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.clear-history image {
  width: 36rpx;
  height: 36rpx;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
}

.history-item {
  padding: 15rpx 30rpx;
  background-color: #fff;
  border-radius: 40rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.empty-history {
  text-align: center;
  color: #999;
  padding: 50rpx 0;
}
</style> 
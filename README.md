# UniApp备忘录应用

## 项目介绍

这是一个基于UniApp框架开发的跨平台备忘录应用，支持用户登录注册、备忘录的增删改查、分享等功能。应用采用前后端分离架构，前端使用Vue3+Vuex实现，后端API基于Node.js+MongoDB提供数据服务。

## 功能特点

- 用户管理：注册、登录、忘记密码
- 备忘录管理：创建、编辑、删除、查看详情
- 备忘录列表：分页加载、关键词搜索
- 备忘录分享：支持多种分享方式
- 路由权限控制：基于token的鉴权机制
- 统一的API请求处理：错误处理、token自动添加、请求响应拦截
- 响应式UI设计：适配多种终端设备





## 安装与运行

### 环境要求

- Node.js 14.0+
- HBuilderX 3.0+

### 安装依赖

```bash
# 安装项目依赖
npm install
```

### 开发运行

```bash
# H5开发模式
npm run dev:h5

# 微信小程序开发模式
npm run dev:mp-weixin
```

### 生产构建

```bash
# H5生产构建
npm run build:h5

# 微信小程序生产构建
npm run build:mp-weixin
```

## 使用说明

1. 打开应用后，首先需要注册账号或登录
2. 登录成功后，会自动跳转到备忘录列表页
3. 点击底部"+"按钮可以创建新的备忘录
4. 点击列表项可查看备忘录详情
5. 在详情页可以编辑或删除备忘录
6. 使用搜索框可以按关键词搜索备忘录

## 项目配置

主要配置文件及说明：

- `manifest.json`：应用配置文件，包括应用名称、图标、SDK配置等
- `pages.json`：页面路由配置，包括页面路径、窗口样式、tabBar等
- `src/utils/request.js`：API请求配置，包括基础URL、超时时间等

## 注意事项

- 开发时请确保后端API服务已启动
- 本地开发时API默认地址为：`https://qpmqdrflsvas.sealoshzh.site`
- 如需修改API地址，请在 `src/utils/request.js` 文件中修改 `BASE_URL` 常量


## 贡献指南

1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交你的更改：`git commit -m 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交Pull Request

## 版权信息

Copyright © 2023 UniApp备忘录团队 

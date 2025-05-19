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

## 技术栈

- 前端框架：UniApp + Vue3 + Vuex
- UI组件：UniUI
- 样式预处理：SCSS
- 请求封装：基于uni.request的封装
- 状态管理：Vuex
- 构建工具：Vite
- 跨平台支持：H5、微信小程序、APP等

## 项目结构

```
uni-preset-vue-vite/
├── dist/                 # 编译打包目录
├── src/                  # 源代码
│   ├── api/              # API接口封装
│   │   ├── memo.js       # 备忘录相关API
│   │   └── user.js       # 用户相关API
│   ├── pages/            # 页面目录
│   │   ├── index/        # 首页
│   │   ├── login/        # 登录页
│   │   ├── register/     # 注册页
│   │   └── memo/         # 备忘录相关页面
│   ├── static/           # 静态资源
│   │   └── images/       # 图片资源
│   ├── store/            # Vuex状态管理
│   │   ├── index.js      # store入口
│   │   └── modules/      # store模块
│   │       ├── memo.js   # 备忘录模块
│   │       └── user.js   # 用户模块
│   ├── utils/            # 工具函数
│   │   ├── request.js    # 请求封装
│   │   └── token.js      # token管理
│   ├── App.vue           # 应用入口组件
│   ├── main.js           # 应用入口JS
│   ├── pages.json        # 页面路由配置
│   ├── manifest.json     # 应用配置
│   └── uni.scss          # 全局样式变量
├── index.html            # H5入口HTML
└── package.json          # 项目依赖配置
```

## API接口说明

应用对接了以下主要API接口：

### 用户相关

- `/api/user/login`：用户登录
- `/api/user/register`：用户注册
- `/api/user/forget-password`：忘记密码

### 备忘录相关

- `/api/memo/list`：获取备忘录列表
- `/api/memo/detail`：获取备忘录详情
- `/api/memo/create`：创建备忘录
- `/api/memo/update`：更新备忘录
- `/api/memo/delete`：删除备忘录
- `/api/memo/share`：分享备忘录
- `/api/memo/search`：搜索备忘录

更详细的API文档请参考 `api-docs.md` 文件。

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

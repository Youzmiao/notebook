#这是一个基于nodejs的后端项目，数据库连接方式为mongodb://root:xnm6dt9s@test-db-mongodb.ns-x073n0bb.svc:27017
# 备忘录应用API接口文档

## 目录
1. [用户认证相关接口](#1-用户认证相关接口)
2. [备忘录相关接口](#2-备忘录相关接口)

## 1. 用户认证相关接口

### 1.1 用户登录

**接口描述**：用户登录接口

**请求URL**：`/api/user/login`

**请求方式**：POST

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| username | 是 | string | 用户名或手机号 |
| password | 是 | string | 密码（建议前端先进行MD5加密） |

**返回示例**：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1001,
    "username": "张三",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.token | string | 用户登录令牌，后续请求需要携带在请求头中 |
| data.userId | int | 用户ID |
| data.username | string | 用户名 |
| data.avatar | string | 用户头像URL |

### 1.2 用户注册

**接口描述**：用户注册接口

**请求URL**：`/api/user/register`

**请求方式**：POST

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| username | 是 | string | 用户名或手机号 |
| password | 是 | string | 密码（建议前端先进行MD5加密） |

**返回示例**：

```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": 1001,
    "username": "张三"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.userId | int | 用户ID |
| data.username | string | 用户名 |

### 1.3 忘记密码

**接口描述**：忘记密码接口

**请求URL**：`/api/user/forget-password`

**请求方式**：POST

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| username | 是 | string | 用户名或手机号 |
| verifyCode | 是 | string | 验证码 |
| newPassword | 是 | string | 新密码（建议前端先进行MD5加密） |

**返回示例**：

```json
{
  "code": 200,
  "message": "密码重置成功",
  "data": null
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |

## 2. 备忘录相关接口

### 2.1 获取备忘录列表

**接口描述**：获取用户的备忘录列表

**请求URL**：`/api/memo/list`

**请求方式**：GET

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| page | 否 | int | 页码，默认1 |
| pageSize | 否 | int | 每页条数，默认10 |
| keyword | 否 | string | 搜索关键词 |

**返回示例**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 24,
    "list": [
      {
        "id": 1,
        "title": "今日待办事项",
        "content": "1. 完成项目报告 2. 参加下午3点的会议 3. 回复客户邮件",
        "time": "2023-10-25 10:30",
        "createTime": "2023-10-25 10:30:00",
        "updateTime": "2023-10-25 10:30:00"
      },
      {
        "id": 2,
        "title": "购物清单",
        "content": "牛奶、面包、鸡蛋、水果、蔬菜",
        "time": "2023-10-24 15:45",
        "createTime": "2023-10-24 15:45:00",
        "updateTime": "2023-10-24 15:45:00"
      }
    ]
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.total | int | 总记录数 |
| data.list | array | 备忘录列表 |
| data.list[].id | int | 备忘录ID |
| data.list[].title | string | 标题 |
| data.list[].content | string | 内容 |
| data.list[].time | string | 显示的时间（格式化后） |
| data.list[].createTime | string | 创建时间 |
| data.list[].updateTime | string | 更新时间 |

### 2.2 获取备忘录详情

**接口描述**：获取备忘录详情

**请求URL**：`/api/memo/detail`

**请求方式**：GET

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | int | 备忘录ID |

**返回示例**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "title": "今日待办事项",
    "content": "1. 完成项目报告\n2. 参加下午3点的会议\n3. 回复客户邮件\n4. 准备明天的演讲材料\n5. 健身1小时",
    "time": "2023-10-25 10:30",
    "createTime": "2023-10-25 10:30:00",
    "updateTime": "2023-10-25 10:30:00"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.id | int | 备忘录ID |
| data.title | string | 标题 |
| data.content | string | 内容 |
| data.time | string | 显示的时间（格式化后） |
| data.createTime | string | 创建时间 |
| data.updateTime | string | 更新时间 |

### 2.3 创建备忘录

**接口描述**：创建新的备忘录

**请求URL**：`/api/memo/create`

**请求方式**：POST

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| title | 是 | string | 标题 |
| content | 是 | string | 内容 |

**返回示例**：

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": 3,
    "title": "学习计划",
    "content": "UniApp开发、Vue3新特性、TypeScript基础",
    "time": "2023-10-26 09:15",
    "createTime": "2023-10-26 09:15:00",
    "updateTime": "2023-10-26 09:15:00"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据，创建的备忘录信息 |

### 2.4 更新备忘录

**接口描述**：更新备忘录

**请求URL**：`/api/memo/update`

**请求方式**：PUT

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | int | 备忘录ID |
| title | 是 | string | 标题 |
| content | 是 | string | 内容 |

**返回示例**：

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "title": "今日待办事项（已更新）",
    "content": "1. 完成项目报告（已完成）\n2. 参加下午3点的会议\n3. 回复客户邮件",
    "time": "2023-10-25 15:20",
    "createTime": "2023-10-25 10:30:00",
    "updateTime": "2023-10-25 15:20:00"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据，更新后的备忘录信息 |

### 2.5 删除备忘录

**接口描述**：删除备忘录

**请求URL**：`/api/memo/delete`

**请求方式**：DELETE

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | int | 备忘录ID |

**返回示例**：

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |

### 2.6 分享备忘录

**接口描述**：生成备忘录分享链接

**请求URL**：`/api/memo/share`

**请求方式**：POST

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | int | 备忘录ID |
| shareType | 是 | int | 分享类型：1-微信好友，2-朋友圈，3-生成链接 |

**返回示例**：

```json
{
  "code": 200,
  "message": "分享成功",
  "data": {
    "shareUrl": "https://example.com/share/memo/12345",
    "expireTime": "2023-11-25 10:30:00"
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.shareUrl | string | 分享链接 |
| data.expireTime | string | 链接过期时间 |

### 2.7 搜索备忘录

**接口描述**：搜索备忘录

**请求URL**：`/api/memo/search`

**请求方式**：GET

**请求头**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| Authorization | 是 | string | 用户登录令牌，格式为"Bearer {token}" |

**请求参数**：

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| keyword | 是 | string | 搜索关键词 |
| page | 否 | int | 页码，默认1 |
| pageSize | 否 | int | 每页条数，默认10 |

**返回示例**：

```json
{
  "code": 200,
  "message": "搜索成功",
  "data": {
    "total": 2,
    "list": [
      {
        "id": 1,
        "title": "今日待办事项",
        "content": "1. 完成项目报告 2. 参加下午3点的会议 3. 回复客户邮件",
        "time": "2023-10-25 10:30",
        "createTime": "2023-10-25 10:30:00",
        "updateTime": "2023-10-25 10:30:00"
      },
      {
        "id": 3,
        "title": "项目计划",
        "content": "完成项目规划文档",
        "time": "2023-10-23 14:20",
        "createTime": "2023-10-23 14:20:00",
        "updateTime": "2023-10-23 14:20:00"
      }
    ]
  }
}
```

**返回参数说明**：

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | int | 状态码，200表示成功 |
| message | string | 提示信息 |
| data | object | 返回的数据 |
| data.total | int | 总记录数 |
| data.list | array | 备忘录列表 |

## 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（未登录或token无效） |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 | 
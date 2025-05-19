# 备忘录应用接口对接文档

## 基本信息

- 接口基础路径: `https://hdwrapxkucpo.sealoshzh.site`
- 数据返回格式: JSON
- 认证方式: Bearer Token (JWT)

## 接口通用规范

### 请求头

需要认证的接口必须在请求头中携带 Token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 响应格式

所有接口统一返回格式：

```json
{
  "code": 200,      // 状态码，200表示成功
  "message": "操作成功", // 提示信息
  "data": {}        // 返回数据，可能是对象、数组或null
}
```

### 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（未登录或token无效） |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 1. 用户认证接口

### 1.1 用户登录

- **接口URL**: `/api/user/login`
- **请求方式**: POST
- **请求参数**:

```json
{
  "username": "用户名",
  "password": "密码"
}
```

- **成功响应**:

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "60d5f8f9b9b6c8a0b8b0f8a0",
    "username": "用户名",
    "avatar": "头像URL"
  }
}
```

- **失败响应**:

```json
{
  "code": 401,
  "message": "用户名或密码错误",
  "data": null
}
```

### 1.2 用户注册

- **接口URL**: `/api/user/register`
- **请求方式**: POST
- **请求参数**:

```json
{
  "username": "用户名",
  "password": "密码"
}
```

- **成功响应**:

```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": "60d5f8f9b9b6c8a0b8b0f8a0",
    "username": "用户名"
  }
}
```

- **失败响应**:

```json
{
  "code": 400,
  "message": "用户名已存在",
  "data": null
}
```

### 1.3 忘记密码

- **接口URL**: `/api/user/forget-password`
- **请求方式**: POST
- **请求参数**:

```json
{
  "username": "用户名",
  "verifyCode": "验证码",
  "newPassword": "新密码"
}
```

- **成功响应**:

```json
{
  "code": 200,
  "message": "密码重置成功",
  "data": null
}
```

- **失败响应**:

```json
{
  "code": 404,
  "message": "用户不存在",
  "data": null
}
```

## 2. 备忘录接口

### 2.1 获取备忘录列表

- **接口URL**: `/api/memo/list`
- **请求方式**: GET
- **请求头**: 需要Authorization
- **请求参数**: 

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| page | 否 | int | 页码，默认1 |
| pageSize | 否 | int | 每页条数，默认10 |
| keyword | 否 | string | 搜索关键词 |

- **成功响应**:

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 24,
    "list": [
      {
        "id": "60d5f8f9b9b6c8a0b8b0f8a0",
        "title": "今日待办事项",
        "content": "1. 完成项目报告 2. 参加下午3点的会议 3. 回复客户邮件",
        "time": "2023-10-25 10:30",
        "createTime": "2023-10-25 10:30:00",
        "updateTime": "2023-10-25 10:30:00"
      },
      {
        "id": "60d5f8f9b9b6c8a0b8b0f8a1",
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

- **失败响应**:

```json
{
  "code": 401,
  "message": "未授权，token无效",
  "data": null
}
```

### 2.2 获取备忘录详情

- **接口URL**: `/api/memo/detail`
- **请求方式**: GET
- **请求头**: 需要Authorization
- **请求参数**: 

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | string | 备忘录ID |

- **成功响应**:

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "60d5f8f9b9b6c8a0b8b0f8a0",
    "title": "今日待办事项",
    "content": "1. 完成项目报告\n2. 参加下午3点的会议\n3. 回复客户邮件\n4. 准备明天的演讲材料\n5. 健身1小时",
    "time": "2023-10-25 10:30",
    "createTime": "2023-10-25 10:30:00",
    "updateTime": "2023-10-25 10:30:00"
  }
}
```

- **失败响应**:

```json
{
  "code": 404,
  "message": "备忘录不存在",
  "data": null
}
```

### 2.3 创建备忘录

- **接口URL**: `/api/memo/create`
- **请求方式**: POST
- **请求头**: 需要Authorization
- **请求参数**:

```json
{
  "title": "备忘录标题",
  "content": "备忘录内容"
}
```

- **成功响应**:

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": "60d5f8f9b9b6c8a0b8b0f8a0",
    "title": "备忘录标题",
    "content": "备忘录内容",
    "time": "2023-10-26 09:15",
    "createTime": "2023-10-26 09:15:00",
    "updateTime": "2023-10-26 09:15:00"
  }
}
```

- **失败响应**:

```json
{
  "code": 400,
  "message": "请求参数错误",
  "data": null
}
```

### 2.4 更新备忘录

- **接口URL**: `/api/memo/update`
- **请求方式**: PUT
- **请求头**: 需要Authorization
- **请求参数**:

```json
{
  "id": "60d5f8f9b9b6c8a0b8b0f8a0",
  "title": "更新后的标题",
  "content": "更新后的内容"
}
```

- **成功响应**:

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": "60d5f8f9b9b6c8a0b8b0f8a0",
    "title": "更新后的标题",
    "content": "更新后的内容",
    "time": "2023-10-25 15:20",
    "createTime": "2023-10-25 10:30:00",
    "updateTime": "2023-10-25 15:20:00"
  }
}
```

- **失败响应**:

```json
{
  "code": 404,
  "message": "备忘录不存在",
  "data": null
}
```

### 2.5 删除备忘录

- **接口URL**: `/api/memo/delete`
- **请求方式**: DELETE
- **请求头**: 需要Authorization
- **请求参数**: 

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| id | 是 | string | 备忘录ID |

- **成功响应**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

- **失败响应**:

```json
{
  "code": 404,
  "message": "备忘录不存在",
  "data": null
}
```

### 2.6 分享备忘录

- **接口URL**: `/api/memo/share`
- **请求方式**: POST
- **请求头**: 需要Authorization
- **请求参数**:

```json
{
  "id": "60d5f8f9b9b6c8a0b8b0f8a0",
  "shareType": 3
}
```

shareType: 1-微信好友，2-朋友圈，3-生成链接

- **成功响应**:

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

- **失败响应**:

```json
{
  "code": 404,
  "message": "备忘录不存在",
  "data": null
}
```

### 2.7 搜索备忘录

- **接口URL**: `/api/memo/search`
- **请求方式**: GET
- **请求头**: 需要Authorization
- **请求参数**: 

| 参数名 | 必选 | 类型 | 说明 |
| --- | --- | --- | --- |
| keyword | 是 | string | 搜索关键词 |
| page | 否 | int | 页码，默认1 |
| pageSize | 否 | int | 每页条数，默认10 |

- **成功响应**:

```json
{
  "code": 200,
  "message": "搜索成功",
  "data": {
    "total": 2,
    "list": [
      {
        "id": "60d5f8f9b9b6c8a0b8b0f8a0",
        "title": "今日待办事项",
        "content": "1. 完成项目报告 2. 参加下午3点的会议 3. 回复客户邮件",
        "time": "2023-10-25 10:30",
        "createTime": "2023-10-25 10:30:00",
        "updateTime": "2023-10-25 10:30:00"
      },
      {
        "id": "60d5f8f9b9b6c8a0b8b0f8a1",
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

- **失败响应**:

```json
{
  "code": 400,
  "message": "搜索关键词不能为空",
  "data": null
}
```

## 3. API调用示例

### 使用Axios调用示例（JavaScript）

```javascript
// 1. 用户登录示例
axios.post('https://hdwrapxkucpo.sealoshzh.site/api/user/login', {
  username: 'testuser',
  password: 'password123'
})
.then(response => {
  // 保存token
  const token = response.data.data.token;
  localStorage.setItem('token', token);
  console.log('登录成功', response.data);
})
.catch(error => {
  console.error('登录失败', error.response.data);
});

// 2. 获取备忘录列表示例
axios.get('https://hdwrapxkucpo.sealoshzh.site/api/memo/list', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  params: {
    page: 1,
    pageSize: 10
  }
})
.then(response => {
  console.log('获取备忘录列表成功', response.data);
})
.catch(error => {
  console.error('获取备忘录列表失败', error.response.data);
});

// 3. 创建备忘录示例
axios.post('https://hdwrapxkucpo.sealoshzh.site/api/memo/create', 
  {
    title: '新备忘录',
    content: '备忘录内容'
  },
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
)
.then(response => {
  console.log('创建备忘录成功', response.data);
})
.catch(error => {
  console.error('创建备忘录失败', error.response.data);
});
``` 
# 图书借阅系统（PC端）

## 技术栈

前端：vue + elemen-ui + axios

后端：springboot + mysql

### 前端

前端分为前台和后台

#### 前台

- 借阅
  - 按书名检索
  - 图书详情，借阅图书，图书报修
- 投诉
  - 按标题检索
  - 添加投诉，投诉详情
- 报修
  - 按书名检索
  - 投诉详情
- 个人中心
  - 修改信息
  - 更改密码
  - 借阅记录
    - 归还图书
  - 投诉记录
    - 投诉详情

#### 后台

- 用户管理
  - 按账号检索
  - 添加用户，修改用户，删除用户，重置密码
- 图书管理
  - 按书名检索
  - 添加书籍，修改书籍，删除书籍，书籍详情
- 投诉管理
  - 按投诉标题检索
  - 回复投诉，投诉详情，删除投诉
- 报修管理
  - 按书名检索
  - 处理报修、删除报修
    - 处理报修：4种状态（审核中、无故障、维修中、已修复）
- 借还管理
  - 按书名检索
  - 借阅审核、删除借阅
    - 借阅审核：5种状态（审核中、不通过、借阅中、归还中、已归还）
- 日志管理
  - 删除日志

### 后端（ pending）

springboot + mysql
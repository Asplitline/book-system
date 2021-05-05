export const BASE_URL = 'http://localhost:8088/'
export const IMG_URL = 'http://localhost:8088/'
export const ADD = 0
export const EDIT = 1
export const NORMAL = 0
export const ADMIN = 1
export const DEFAULT_PWD = 123456
export const PREFIX_BOOK = 'BM-'
export const aMenu = [
    { index: 'user', name: '用户管理', icon: '' },
    { index: 'category', name: '分类管理', icon: '' },
    { index: 'book', name: '书籍管理', icon: '' },
    // { index: 'message', name: '留言管理', icon: '' },
    { index: 'correction', name: '勘误管理', icon: '' },
    { index: 'borrow', name: '借阅管理', icon: '' },
    { index: 'log', name: '日志管理', icon: '' }
]

export const aMiniMenu = ['user', 'category', 'book', 'message', 'correction', 'borrow', 'log']
export const hMenu = [
    { index: 'index', name: '首页', icon: '' },
    { index: 'bookCenter', name: '图书中心', icon: '' },
    { index: 'errata', name: '书籍勘误', icon: '' },
    // { index: 'messageBoard', name: '留言板', icon: '' },
    { index: 'info', name: '个人中心', icon: '' }
]
export const hMiniMenu = ['index', 'bookCenter', 'errata', 'messageBoard', 'info']

export const levelState = [
    { id: 0, type: 'primary', name: '普通' },
    { id: 1, type: 'danger', name: '管理员' }
]

export const borrowState = [
    { id: 0, type: 'primary', name: '审核中', value: '申请中..' },
    { id: 1, type: 'warning', name: '已拒绝', value: '被拒绝..' },
    { id: 2, type: 'success', name: '借阅中', value: '已借阅..' },
    { id: 3, type: 'danger', name: '归还中', value: '归还中..' },
    { id: 4, type: 'info', name: '已归还', value: '借阅图书' }
]

export const replyState = [
    { id: 0, type: 'primary', name: '未回复' },
    { id: 1, type: 'success', name: '已回复' }
]

export const errataState = [
    { id: 0, type: 'primary', name: '待审核' },
    { id: 1, type: 'success', name: '已通过' },
    { id: 2, type: 'danger', name: '已驳回' }
]

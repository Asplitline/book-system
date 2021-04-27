export const BASE_URL = 'http://localhost:8088/'
export const IMG_URL = 'http://localhost:8088/'
export const ADD = 0
export const EDIT = 1
export const DEFAULT_PWD = 123456
export const aMenu = [
    { index: 'user', name: '用户管理', icon: '' },
    { index: 'book', name: '书籍管理', icon: '' },
    { index: 'message', name: '留言管理', icon: '' },
    { index: 'correction', name: '勘误管理', icon: '' },
    { index: 'borrow', name: '借阅管理', icon: '' },
    { index: 'log', name: '日志管理', icon: '' }
]

export const aMiniMenu = ['user', 'book', 'message', 'correction', 'borrow', 'log']
export const hMenu = [
    { index: 'index', name: '首页', icon: '' },
    { index: 'bookCenter', name: '图书中心', icon: '' },
    { index: 'errata', name: '书籍勘误', icon: '' },
    { index: 'messageBoard', name: '留言板', icon: '' },
    { index: 'info', name: '个人中心', icon: '' }
]
export const hMiniMenu = ['index', 'bookCenter', 'errata', 'messageBoard', 'info']

export const levelState = [
    { id: 0, type: 'primary', name: '普通' },
    { id: 1, type: 'danger', name: '管理员' }
]

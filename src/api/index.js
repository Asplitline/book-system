import api from './helper'
const { _get, _post, _delete, _put } = api

// base
const base = {
    changePassword: _get('/user/changePassword')
}
// user
const user = {
    getUserList: _get('user/pageUser'),
    addUser: _post('user/insert'),
    editUser: _put('user/updateIgnoreNull'),
    deleteUser: _delete('user/delete')
}
// file
const file = {
    getFile: _get('/util/getFilesByUserId'),
    addFile: _post('/list/insert'),
    editFile: _put('/list/updateIgnoreNull')
}
// category
const category = {
    getCategory: _get('lable/list'),
    getCategoryList: _get('lable/pageLable'),
    addCategory: _post('lable/insert'),
    editCategory: _put('lable/updateIgnoreNull'),
    deleteCategory: _delete('lable/delete')
}
// book
const book = {
    getBookList: _get('book/pageBook'),
    addBook: _post('book/insert'),
    editBook: _put('book/updateIgnoreNull'),
    deleteBook: _delete('book/delete')
}
// correction
const correction = {
    getCorrectionList: _get('addvice/pageAddvice'),
    addCorrection: _post('addvice/insert'),
    editCorrection: _put('addvice/updateIgnoreNull'),
    deleteCorrection: _delete('addvice/delete')
}
// borrow
const borrow = {
    getBorrowList: _get('borrow/pageBorrow'),
    addBorrow: _post('borrow/insert'),
    editBorrow: _put('borrow/updateIgnoreNull'),
    deleteBorrow: _delete('borrow/delete')
}
// log
const log = {
    getLogList: _get('logs/page'),
    deleteLog: _delete('logs/delete')
}
export default {
    ...base,
    ...category,
    ...user,
    ...file,
    ...book,
    ...correction,
    ...borrow,
    ...log
}

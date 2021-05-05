import api from './helper'
const { _get, _post, _delete, _put } = api
const TRADITION_MODEL = 2
// base
const base = {
    changePassword: _get('/user/changePassword'),
    login: _post('account/api/login', TRADITION_MODEL),
    register: _post('account/api/regist'),
    upload: _post('/util/uploadfile')
}
// user
const user = {
    getUser: _get('user/list'),
    getUserList: _get('user/pageUser'),
    addUser: _post('user/insert'),
    editUser: _put('user/updateIgnoreNull'),
    deleteUser: _delete('user/delete')
}
// file
const file = {
    getFile: _get('/list/list'),
    // ques id 无法修改
    getFileById: _get('util/getFilesByUserId'),
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
    getBook: _get('/book/list'),
    getBookList: _get('book/pageBook'),
    addBook: _post('book/insert'),
    editBook: _put('book/updateIgnoreNull'),
    deleteBook: _delete('book/delete')
}
// correction
// tag advice api ? use
// const correction = {
//     getCorrectionList: _get('addvice/pageAddvice'),
//     addCorrection: _post('addvice/insert'),
//     editCorrection: _put('addvice/updateIgnoreNull'),
//     deleteCorrection: _delete('addvice/delete')
// }
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
// errata
const errata = {
    getErrataList: _get('repair/pageRepair'),
    addErrata: _post('repair/insert'),
    editErrata: _put('repair/updateIgnoreNull'),
    deleteErrata: _delete('repair/delete')
}
export default {
    ...base,
    ...category,
    ...user,
    ...file,
    ...book,
    // ...correction,
    ...borrow,
    ...log,
    ...errata
}

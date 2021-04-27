import api from './helper'
const { _get, _post, _delete, _put } = api

// base
const base = {
    changePassword: _get('/user/changePassword')
}
// user
// console.log(_post, _get, _delete)
const user = {
    getUserList: _get('user/pageUser'),
    deleteUser: _delete('user/delete')
}
const file = {
    addFile: _post('/list/insert'),
    editFile: _put('/list/updateIgnoreNull')
}
export default {
    ...base,
    ...user,
    ...file
}

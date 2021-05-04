import { IMG_URL } from '@static'
export function setSession (name, value) {
    sessionStorage.setItem(name, JSON.stringify(value))
}
export function getSession (name) {
    return sessionStorage.getItem(name) != null && JSON.parse(sessionStorage.getItem(name))
}
export function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}
export function deepClone (data = {}) {
    if (typeof data !== 'object' || data === null) {
        return data
    }
    let res
    if (data instanceof Array) {
        res = []
    } else {
        res = {}
    }
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            res[key] = deepClone(data[key])
        }
    }
    return res
}
export function convertURL (obj = {}) {
    const arr = []
    for (const key in obj) {
        if (obj[key] && key) {
            arr.push(`${key}=${obj[key]}`)
        }
    }
    return arr.join('&')
}
export function bindIMG (url) {
    return IMG_URL + url
}
export function checkEmail (rule, value, callback) {
    const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    if (!reg.test(value)) {
        return callback(new Error('电子邮箱格式错误'))
    } else {
        return callback()
    }
}
export function checkPhone (rule, value, callback) {
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!reg.test(value)) {
        return callback(new Error('手机号码格式错误'))
    } else {
        return callback()
    }
}
export function checkBM (rule, value, callback) {
    const reg = /^\d{6}$/
    if (!reg.test(value.trim())) {
        return callback(new Error('请输入6位数字作为书籍编号'))
    }
    return callback()
}

export function getUid (randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
}

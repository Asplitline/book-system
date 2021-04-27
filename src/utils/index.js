import { IMG_URL } from '@static'
export function setSession (name, value) {
    sessionStorage.setItem(name, JSON.stringify(value))
}
export function getSession (name) {
    return sessionStorage.getItem(name) && JSON.parse(sessionStorage.getItem(name))
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
export function bindIMG (url) {
    return IMG_URL + url
}

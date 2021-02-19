import Vue from 'vue'
// 绑定服务器端地址
Vue.prototype.bindUrl = function (url) {
    return 'http://127.0.0.1:8089/' + url
}
// 绑定图片上传地址
Vue.prototype.bindImg = function (url) {
    return 'http://127.0.0.1:8089/' + url
}
// 转换URL
Vue.prototype.toURL = function (obj) {
    const arr = []
    for (const key in obj) {
        arr.push(key + '=' + obj[key])
    }
    return arr.join('&')
}
// 建议深拷贝
Vue.prototype.convertDeepCopy = function (data) {
    return JSON.parse(JSON.stringify(data))
}

import Vue from 'vue'
// 绑定服务器端地址
Vue.prototype.bindUrl = function (url) {
    return 'http://127.0.0.1:8088/' + url
}
// 绑定图片上传地址
Vue.prototype.bindImg = function (url) {
    return 'http://127.0.0.1:8088/' + url
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
// 时间格式化
Vue.filter('formatDate', date => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = pad0(date.getMonth() + 1)
    const day = pad0(date.getDate())
    const hour = pad0(date.getHours())
    const minute = pad0(date.getMinutes())
    const second = pad0(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

// 补0
function pad0 (data, len = 2) {
    return ('00000000000' + data).substr(-len)
}

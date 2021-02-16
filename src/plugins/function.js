import Vue from 'vue'

Vue.prototype.bindUrl = function (url) {
    return 'http://127.0.0.1:8089/book/' + url
}

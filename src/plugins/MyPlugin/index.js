
import api from '@api'
import { pad0 } from '@utils'
const MyPlugin = {}
MyPlugin.install = (Vue, options) => {
    Vue.prototype.$api = api
    Vue.filter('formatDate', (date, MODEL = 0) => {
        if (!date) return 'unknown error'
        date = new Date(date)
        const year = date.getFullYear()
        const month = pad0(date.getMonth() + 1)
        const day = pad0(date.getDate())
        const hour = pad0(date.getHours())
        const minute = pad0(date.getMinutes())
        const second = pad0(date.getSeconds())
        if (MODEL === 0) {
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        } else if (MODEL === 1) {
            return `${year}-${month}-${day}`
        } else {
            return `${year}-${month}-${day} ${hour}:${minute}`
        }
    })
    Vue.filter('ch', (val) => {
        return `第${val}章`
    })
}

export default MyPlugin

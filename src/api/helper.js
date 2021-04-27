import axios from 'axios'
import { BASE_URL } from '@static'
const http = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
})

const _get = (url) => {
    return (params) => {
        return http.get(url, { params })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

const _post = (url) => {
    return (params) => {
        return http.post(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

const _delete = (url) => {
    return (params) => {
        return http.delete(url, { params })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}

const _put = (url) => {
    return (params) => {
        return http.put(url, params)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    }
}
export default {
    _get, _post, _delete, _put
}

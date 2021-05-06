const path = require('path')
function load (url) {
    return path.resolve(__dirname, url)
}
module.exports = {
    chainWebpack: config => {
        // 生产环境
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.prod.js')
            config.set('externals', {
                "element-ui": "ElementUI",
                "vue": 'Vue',
                'vue-router': 'VueRouter',
                "axios": 'axios'
            })
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.compress.drop_console = true
                return args
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        // 开发环境
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.dev.js')
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
        config.resolve.alias
            .set('@css', load('./src/assets/css'))
            .set('@views', load('./src/views'))
            .set('@mixins', load('./src/mixins'))
            .set('@plugins', load('./src/plugins'))
            .set('@static', load('./src/static'))
            .set('@utils', load('./src/utils'))
            .set('@api', load('./src/api'))
            .set('@store', load('./src/store'))
    }
}
module.exports = {
    chainWebpack: config => {
        // 生产环境
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main.prod.js')
            config.set('externals', {
                "element-ui": "ElementUI",
                "vue": 'Vue',
                'vue-router': 'VueRouter',
                "axios": 'axios',
                'vue-quill-editor': 'VueQuillEditor',
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
    }
}
export default {
    data () {
        return {
            query: {
                page: 1,
                size: 10,
                keyword: null
            },
            total: 10
        }
    },
    methods: {
        handleSizeChange (value, callback) {
            this.query.size = value
            callback && callback()
        },
        handleCurrentChange (value, callback) {
            this.query.page = value
            callback && callback()
        },
        clearIpt (callback) {
            this.query.keyword = null
            callback && callback()
        },
        clearDialog (formName) {
            this.$refs[formName].resetFields()
        }
    }
}

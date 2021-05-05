import { mapMutations } from 'vuex'

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
        ...mapMutations(['setCurrentUser']),
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
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        handleSuccess (success, info, callback) {
            if (success) {
                this.$message.success(`${info}成功`)
                callback && callback()
            } else {
                this.$message.error(`${info}失败`)
            }
        },
        logOut () {
            sessionStorage.clear()
            this.$store.commit('setCurrentUser', null)
            this.$router.push({ name: 'login' })
        },
        handleConfirm (info, success) {
            this.$confirm(`即将${info}，是否继续 ~`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(success)
        }
    }
}

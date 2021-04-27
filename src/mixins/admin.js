import common from './common'
export default {
    mixins: [common],
    data () {
        return {
            name: 'admin'
        }
    },
    methods: {
        deleteById (delCallback, fetchCallback, id, info) {
            this.$confirm(`即将删除${info}，是否继续 ~`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            })
                .then(async () => {
                    const { success } = await delCallback({ id })
                    if (success) {
                        this.$message.success('删除成功')
                        fetchCallback()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
                .catch(() => {
                    this.$message.warning('已取消删除')
                })
        }
    }
}

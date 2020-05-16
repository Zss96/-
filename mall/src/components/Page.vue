<template>
    <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            @prev-click="prev"
            @next-click="next"
            @current-change="pageChange"
            :page-size='size'
            :total="totalpage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'page',
    props:{
        totalpage:{
            type: Number,
            default: 0,
        },
        size:{
            type: Number,
            default: 0
        }
    },
    methods:{
        prev(page){
            // this.page = this.page-1;
            // this.getGoods()
            this.$emit('pageClick',page)
        },
        next(page){
            // this.page = this.page+1;
            // this.getGoods()
            this.$emit('pageClick',page)
        },
        pageChange(page){
            // this.page = page;
            // this.getGoods()
            this.$emit('pageClick',page)
        }
    }
}
</script>

<style scoped>
    .page {
        margin-top: 20px;
    }
</style>
<template>
  <div class="mydiscount">
        <Top :member_id="member_id" class="top"/>
        <div class="other">
            <div class="div">
                <div class="discount" v-for="(item,index) in mydiscount" :key="index">
                    <div>{{item.shop.shop_name}}</div>
                    <div><span>{{item.discount}}</span>折</div>
                </div>
               
            </div>
        </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
export default {
    name: 'mydiscount',
       components: {
        Top,
    },
    data(){
        return{
            mydiscount: []
        }
    },
    methods: {
       getMydsicount(){
           let data = {
               member_id: this.member_id
           }
            return http('member/search/mydiscount',data,'get').then(res=>{
                this.mydiscount = res.data.data
            })
       }
    },
    created(){
        this.member_id = this.$route.query.member_id
        this.getMydsicount()
    }
}
</script>

<style scoped>
    .div {
        padding-top: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .discount {
        width: 200px;
        /* height: 100px; */
        border-radius: 10px;
        background-color: #fe553e;
        color: #fff;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
        /* margin-left: 10px; */
    }
    .discount  span {
        font-size: 32px;
        font-weight: bold;
    }
</style>
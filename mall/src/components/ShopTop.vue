<template>
  <div class="shoptop">
      <div class="header">
            <div class="logo" @click="backIndex"><i class="el-icon-headset"></i></div>
            <div class="middle">
                <img :src="reqUrl+shopInfo.logo" v-if="shopInfo.logo">
                <span v-if="shopInfo.shop_name">{{shopInfo.shop_name}}中心</span>
           </div>
            <div class="show" v-if="type==1">
                <router-link  v-if="shopInfo.shop_name" tag="div" class="add" :to="{path: '/businfo',query:{shop_id: shop_id}}">编辑信息</router-link>
                <router-link v-else tag="div" class="add" :to="{path: '/businfo',query:{shop_id: shop_id}}">添加信息</router-link>
            </div>
            <div class="right" @click="layou">退出</div>

        </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'shoptop',
    props: {
        shop_id: {
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 0
        }
    },
    data(){
        return{
            shopInfo: {}
        }
    },
    methods: {
         backIndex(){
           let  query = {
                    shop_id: this.shop_id
                } 
            this.$router.push({name: 'business',query:query})  
        },
        layou(){
           this.$router.push({name: 'login'})   
        },
        getShopInfo() {
            let that = this, 
                data={
                    shop_id: this.shop_id
                }
         return http('admin/shopInfo',data,'get').then(res=>{
              that.shopInfo = res.data.data;
            })

        },
    },
    created() {
        this.getShopInfo()
    }
}
</script>

<style scoped>
     .shoptop {
         margin-bottom: 20px;
        background-color: #161616;      
        position: relative;

       }
       .logo {
           width: 148px;
       }
       .logo img {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           border: 1px solid red;
       }
       .logo i {
            font-size: 41px;
            padding-top: 12px;
       }
       .header {
           width: 1024px;
            height: 60px;
            line-height: 60px;
            margin: 0 auto;
            font-size: 18px;
            color: #fff;
            display: flex;
       }
       .middle {
           flex: 1;
           text-align: center;
       }
       .nav {
           flex: 3;
       }
       .show {
           flex: 3;
           text-align: right;
       }
       .right {
           flex: 1;
           text-align: right;
       }
        .middle img {
            width: 40px;
            vertical-align: middle;
        }
        .middle span {
         vertical-align: center;
        }
</style>
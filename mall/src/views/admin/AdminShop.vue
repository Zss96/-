<template>
    <div class="adminshop">
       <Top :type="type" :admin_id="admin_id"/>
      <!-- <div class="top">
        <div>   <span class="title">耳机发烧友</span>
        <span class="name">商家中心</span></div>
        <div class="logo">
          <img :src="reqUrl+shopInfo.logo">
           <span>{{shopInfo.shop_name}}中心</span>
        </div>
      </div> -->
      <!-- <div class="banner">
         <el-carousel :interval="4000" arrow="always">
            <el-carousel-item v-for="(item,index) in banners" :key="index">
              <img :src="reqUrl+item.url" alt=""  style="max-width: 100%;height: 100%">
            </el-carousel-item>
          </el-carousel>
      </div> -->
      <div class="other">
         <Banner :banners="banners"/>
        <div class="business-info">
          <h3>{{shopInfo.shop_name}}简介</h3>
          <p class="business-info-content"> {{shopInfo.shopintro}}</p>
      </div>
      <div class="other-info">
        <div>负责人: {{shopInfo.controller}}</div>
        <div>电 话:{{shopInfo.phone}}</div>
      </div>
      <el-row>
        <el-button type="primary" @click="auditShop(shop_id)">确认审核</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-row>
      </div>
    </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/AdminTop'
import Banner from '../../components/shopBanner'
export default {
    name: 'adminshop',
      components: {
        Top,
        Banner
    },
    data(){
      return{
          admin_id: '',
          shop_id: 0,
          shopInfo: {},
          banners: [],
          type: 1
      }
    },
    methods: {
      getShopInfo() {
        let that = this, 
            data={
              shop_id: this.shop_id
            }
         return http('admin/shopInfo',data,'get').then(res=>{
           console.log(res)
              that.shopInfo = res.data.data;
              that.banners = res.data.banners;
         })

      },
      cancel(){
        this.$router.go(-1);
      },
       auditShop(shop_id){
        console.log(shop_id)
        let that = this, 
          data = {
          shop_id,
          shopstatus: 1
        }
        return http('admin/auditshop',data,'post').then(res=>{
          console.log(res)
              that.$router.go(-1);
        })

      }
    },
    created(){
      this.admin_id = this.$route.query.admin_id
         this.shop_id = this.$route.query.shop_id
          this.getShopInfo();
    }
    
}
</script>

<style scoped>
/* .top {
    display: flex;
    height: 40px;
  }
  .top div {
    flex: 1;
  } */
 .right {
    text-align: right;
  }
  .right button {
    border: none;
    background-color: #0b8dd8;
    color: #Fff;
    display: inline-block;
    width: 100px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
    padding: 0 10px;
  }
  .right .addgoods {
    height: 30px;
    text-align: center;
    border-radius: 10px;
    padding: 0 10px;
  }
  .logo img {
    width: 40px;
    vertical-align: middle;
  }
  .logo span {
    vertical-align: center;
  }
  .title {
    color: #0b8dd8;
    font-size: 24px;
    font-weight: bold;
  }
  .name {
    color: #000;
    font-size: 16px;
  }
  .banner {
    height: 300px;
    width: 500px;
    margin: 0 auto;
  }
  .business-info{
    margin: 20px 0;
  }
  .business-info-content{
    text-indent: 2rem;
    margin-top: 10px;
  }
  .other-info {
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
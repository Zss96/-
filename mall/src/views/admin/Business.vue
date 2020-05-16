<template>
  <div class="business">
    <Top :shop_id = "shop_id" :type="type"/>
      <div class="other">
       <!--  <div class="top">
        <div>   <span class="title">耳机发烧友</span>
        <span class="name">商家中心</span></div>
        <div class="logo">
          <img :src="reqUrl+shopInfo.logo" v-if="shopInfo.logo">
           <span v-if="shopInfo.shop_name">{{shopInfo.shop_name}}中心</span>
        </div>
         <div class="right">
            <router-link  v-if="shopInfo.shop_name" tag="button" class="add" :to="{path: '/businfo',query:{shop_id: shop_id}}">编辑信息</router-link>
            <router-link v-else tag="button" class="add" :to="{path: '/businfo',query:{shop_id: shop_id}}">添加信息</router-link>
          </div>
      </div> -->
      <div class="banner" v-if="banners!=''">
         <el-carousel :interval="4000" arrow="always" >
            <el-carousel-item v-for="(item,index) in banners" :key="index">
              <img :src="reqUrl+item.url" alt=""  style="width: 500px;">
            </el-carousel-item>
          </el-carousel>
      </div>
      <div class="business-info" v-if="shopInfo.shop_name">
          <h3>{{shopInfo.shop_name}}简介</h3>
          <p class="business-info-content"> {{shopInfo.shopintro}}</p>
      </div>
      <div class="goods-info">
        <div class="goods-top">
          <h3>{{shopInfo.shop_name}}商品</h3>
          
        <div class="right">
           <button class="addgoods" @click="setDiscount" style="margin-right: 30px;">折扣设置</button>
            <button class="addgoods" @click="order" style="margin-right: 30px;">订单详情</button>
            <button class="addgoods" @click="addGoods">添加商品</button>
              <!-- <router-link tag="button" class="addgoods" :to="{path: '/addgoods',query:{shop_id: shop_id,shop_name: shopInfo.shop_name,logo:reqUrl+shopInfo.logo }}">添加商品</router-link> -->
        </div>
        </div>
        <div class="goods" v-if="goodsList.length>0">
          <div class="goods-item">
            <div class="goods-name">商品名称</div>
            <div class="goods-stock">库存</div>
            <div class="origin-price">原价格</div>
            <div class="origin-price">现价格</div>
            <div class="goods-ope"><div>操作</div></div>
          </div>

          <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
            <div class="goods-name">{{item.name}}</div>
            <div class="goods-stock">{{item.stock}}</div>
            <div class="origin-price">{{item.origin_price}}</div>
             <div class="current-price">{{item.current_price}}</div>
            <div class="goods-ope">
                <router-link tag="div" :to="{path: '/addgoods',query:{goods_id: item.goods_id,shop_name: shopInfo.shop_name,logo:reqUrl+shopInfo.logo }}">编辑</router-link>
              <div :data-id="item.goods_id" @click="delGoods">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/ShopTop'
export default {
    name: 'business', 
    components:{
      Top
    },
    data() {
      return{
        shop_id: 0,
        shopInfo: {},
        banners: [],
        goodsList: [],
        delImgs: [],
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
              that.shopInfo = res.data.data;
              that.banners = res.data.banners;
              console.log(res.data.banners)
         })

      },
      getGoodsList() {
        let that = this, 
          data={
            shop_id: this.shop_id,
            status: 0
         }
        return http('admin/goodsInfo',data,'get').then(res=>{
            console.log(res)
            that.goodsList = res.data.data
       
         })
      },
      addGoods(){
        if(this.shopInfo.shopstatus == 0){
          this.$message.error('还未通过审核，请等待...');
          return;
        }
        let query = {
          shop_id: this.shop_id,
          shop_name: this.shopInfo.shop_name,
          logo:reqUrl+this.shopInfo.logo
        }
        this.$router.push({name: 'addgoods',query:query})
      },
      order(){
         let query = {
          shop_id: this.shop_id,
          shop_name: this.shopInfo.shop_name,
          logo:reqUrl+this.shopInfo.logo
        }
        this.$router.push({name: 'shoporder',query:query})
      },
      setDiscount(){
        let query = {
          shop_id: this.shop_id,
          shop_name: this.shopInfo.shop_name,
          logo:reqUrl+this.shopInfo.logo
        }
        this.$router.push({name: 'setdiscount',query:query})
      },
      delGoods(e){
       let data={
         goods_id:e.target.dataset.id,
         status: 1
       },
       that= this;
       return http('admin/goodsInfo',data,'get').then(res=>{
         console.log(res)
        let  data1= res.data
         if(data1.banners.length.length>0){
            data1.banners.forEach(item=>{
              that.delImgs.push(item.url)
            })
         }
         if(data1.infos.length>0){
            data1.infos.forEach(item=>{
              that.delImgs.push(item.url)
            })
         }
       if(that.delImgs.length>0){
          that.delImg();
       }
        return http('admin/delgoods',data,'post').then(res=>{
          if(res.data.code==1){
              that.$message({
                  message:'删除成功',
                  type: 'success'
                });
              that.getGoodsList();
          }
       
        })
       })
    
      },
      delImg(addImgs) {
         let data={
          delImgs : this.delImgs
        },
        that = this;
        console.log(this.delImg)
        if(this.delImg==undefined){
          return;
        }
        return http('uploads/delImg',data,'get').then(res=>{
          console.log(res.data.code)
         
        })
      }

    },
    created(){
      console.log(this.$route.query.shop_id)
      this.shop_id = this.$route.query.shop_id
      this.getShopInfo();
      this.getGoodsList();
    }
    
}
</script>

<style scoped>
  .top {
    display: flex;
    height: 40px;
  }
  .top div {
    flex: 1;
  }
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
  .goods-top {
    display: flex;
    height: 62px;
  }
  .goods-top h3{
    display: block;
    flex: 2;
    line-height: 62px;
  }
  .goods-top div {
    flex: 2;
    line-height: 62px;
    text-align: right;
  }
  .goods {
       border: 1px solid black;
  }
  .goods-item {
    display: flex;
     border: 1px solid black;
  }
  .goods-item div {
    flex: 1;
    text-align: center;
    border-right: 1px solid black;
  }
  .goods-item .goods-name{
    flex: 2;
  }
  .goods-item div:nth-last-child(1){
    border-right: none;
  }
  .goods-ope {
    align-items: center;
    display: flex;

  }
  .goods-ope div {
    flex: 1;
  }
</style>
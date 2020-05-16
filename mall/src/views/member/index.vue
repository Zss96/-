<template>
  <div class="index">
    <Top :member_id="member_id" class="top"/>
    <Banner :banners="banners" :member_id="member_id" class="banner"/>
    <div class="goods-title">
        <div class="other">
            热销商品
        </div>
    </div>
    <div class="goods" v-if="goods.length>0">
        <!-- <h3>推荐店铺</h3>
        <div class="goodshops">
            <div class="goodshop-item" v-for="(item,index) in shops" :key="index" @click="goToShop(item.shop_id)">
                <div class="shop-item-top">
                    <img :src="reqUrl+item.logourl" alt="">
                </div>
                <div class="shop-item-info">
                    <p>{{item.shop_name}}</p>
                    <p class="star"><i class="el-icon-star-on"></i>{{item.star}}</p>
                </div>
            </div>
        </div> -->
        <!-- <div class="goods-left"  @click="goToGoods(goods[0].goods_id)">
            <img :src="reqUrl+goods[0].url" alt="" style="width: 100%;height:100%" v-if="goods[0].url">
        </div>
        <div class="goods-right">
            <div class="right-top" @click="goToGoods(goods[1].goods_id)">
                 <img :src="reqUrl+goods[1].url" alt="" style="width: 100%;height:100%" v-if="goods[1].url">
            </div>
            <div class="right-bottom">
                <div class="right-left" @click="goToGoods(goods[2].goods_id)">
                    <img :src="reqUrl+goods[2].url" alt="" style="width: 100%;height:100%" v-if="goods[2].url">
                </div>
                <div class="right-right" @click="goToGoods(goods[3].goods_id)">
                    <img :src="reqUrl+goods[3].url" alt="" style="width: 100%;height:100%" v-if="goods[3].url">
                </div>
            </div>
        </div>
         <div class="middle">

         </div> -->
         <div class="re-goods-item" v-for="(item,index) in hotgoods" :key="index" :style="{backgroundImage: 'url(' +reqUrl+item.url[0].url + ')',
                                     backgroundRepeat: 'no-repeat',backgroundSize:'100% 100%'}" @click="toGoods(item.goods_id)">
             <div class="re-name">{{item.name}}</div>
         </div>
    </div>
    <div class="goods-title">
        <div class="other">
            为你推荐

        </div>
    </div>
    <div class="other">
        <div class="hot-goods">
        <div class="hot-item"  v-for="(item,index) in pushgoods" :key="index">
            <div class="hot-left" v-if="(index+1)%2==0">
                <div class="hot-left-top right"></div>
               <div class="left-info">
                   <div class="left-brand">{{item.brand}}</div>
                   <div class="push_title">{{item.push_title}}</div>
                   <div class="evaluation">{{item.evaluating}}</div>
                   <div class="button">
                       <button @click="toGoods(item.goods_id)">进一步了解</button>
                       <button class="buy" @click="buy(item.goods_id,item.shop_id)">立即购买</button>
                   </div>
               </div>
            </div>
            <div class="hot-right">
                <el-image :src="reqUrl+item.push_img" mode="fill" style="width: 355px;height:355px;"/>

            </div>
            <div class="hot-left" v-if="(index+1)%2!=0">
                <div class="hot-left-top"></div>
               <div class="left-info">
                   <div class="left-brand">{{item.brand}}</div>
                   <div class="push_title">{{item.push_title}}</div>
                   <div class="evaluation">{{item.evaluating}}</div>
                   <div class="button">
                       <button  @click="toGoods(item.goods_id)">进一步了解</button>
                       <button class="buy" @click="buy(item.goods_id,item.shop_id)">立即购买</button>
                   </div>
               </div>
            </div>
        </div>
    </div>
    </div>
    <!-- <div class="all-goods">
        <h3>推荐商品</h3>
        <Goods :goods="goods" :member_id="member_id"/>
    </div>
    <page :totalpage="totalpage" :size="size" @pageClick="pageClick($event)" class="page"></page> -->
      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->

  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Goods from '../../components/Goods'
import Top from '../../components/Top'
import Banner from '../../components/BannerIndex'
import Page from '../../components/Page'
export default {
    name: 'index',
    components: {
        Goods,
        Top,
        Banner,
        Page
    },
    data(){
        return {
            member_id: '',
            memberInfo: {},
            banners: [],
            shops: [],
            hotgoods: [],
            pushgoods: [],

            page: 1,
            size: 20,
            showMore: false,
            goods: [],

            
            totalpage: 0
        }
    },
    methods: {
        getInfo(){
            let that = this,
                data = {
                    member_id: this.member_id
                }
            return http('member/getinfo',data,'get').then(res=>{
                console.log(res)
                that.memberInfo = res.data.data;
            })
        },

        getindex(){
            let that = this;
            return http('admin/getindex',{},'get').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    that.otherInfo = res.data.data[0]
                    that.getBanners();
                    // that.getGoodShop();
                    this.gethotGoods()
                }
            })
        },
        getBanners(){
            let data = {
                num: this.otherInfo.bannerNum
            }
            console.log(data)
            return http('member/getbanner',data,'get').then(res=>{
                console.log(res)
                this.banners = res.data.data
            })
        },
        // getGoodShop(){
        //     let data = {
        //         // num: this.otherInfo.shopNum
        //         num: 3
        //     }
        //     return http('member/getgoodshop',data,'get').then(res=>{
        //         console.log(res)
        //         this.shops = res.data.shops
        //     })
        // },
        getGoods(reset){
            let data = {
                page: reset||this.page,
                size: this.size
            }
            return http('member/getgoods',data,'get').then(res=>{
                console.log(res)
                this.goods =   res.data.goods;
                this.totalpage = res.data.total
            })
        },
        goToShop(shop_id){
            console.log(shop_id)
            let query = {
                shop_id,
                member_id :this.member_id
            }
                this.$router.push({name: 'shopdetail',query:query})  
        },
        pageClick(page){
            console.log(page)
            this.page = page
            this.getGoods()
        },
        goToGoods(goods_id){
            // console.log(goods_id+'===='+this.member_id)
            let query = {
                goods_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'goodsdetail',query:query})  
        },
        gethotGoods(){
            let data = {
                size: this.otherInfo.hotNum
            }
            return http('member/hot/goods',data,'get').then(res=>{
                this.hotgoods = res.data.data
            })
        },
        getpushGoods(){
            // let data = {
            //     num: 4
            // }
            return http('member/push/goods',{},'get').then(res=>{
                this.pushgoods = res.data.data
            })
        },
        toGoods(goods_id){
            // console.log(goods_id+'===='+this.member_id)
            let query = {
                goods_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'goodsdetail',query:query})  
        },
        toLogin(){
            console.log(111)
            this.$router.push({name: 'login'})
        },
        buy(goods_id,shop_id){
            let member_id = this.member_id,
              data = {
                member_id,
                goods_id,
                num: 1,
                buy: 0,
                shop_id,
            }
            console.log(member_id)
            if(member_id==''){
                this.toLogin()
            }
            return http('member/joincart',data,'post').then(res=>{
                console.log(res)
               if(res.data.code==1){
               let  carts_id=res.data.carts_id*1,
                 query = {
                 carts_id,
                 member_id : this.member_id
             }
              this.$router.push({name: 'order',query:query})  
               }

            })
        },

    },
    created(){
       this.member_id = this.$route.query.member_id
       this.getInfo()
       this.getindex()
       this.getGoods(1)
       this.getpushGoods()
    },
}
</script>

<style scoped>
    .index {
        background-color: #F8F6F9;
    }
    .goods {
        width: 1024px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .goods img {
        width: 100%;
        height: 100%;
    }
    .goods-left {
        width: 307px;
        height: 567px;
    }
    .goods-right {
        width: 717px;
        height: 567px;
    }
    .all-goods {
        width: 1024px;
        margin: 0 auto;
    }
    .shops h3,
    .all-goods h3 {
        margin-bottom: 20px;
    }
    .goodshops {
        display: flex;
        flex-wrap: wrap;
        padding: 0 60px;
    }
    .goodshop-item {
        width: 150px;
        height: 150px;
        border: 1px solid #999;
        text-align: center;
        margin-left: 10px;

    }
    .goodshop-item img {
        width: 130px;
        height: 100px;
    }
    .star {
       color: #999;
    }
    .banner {
        margin-top: 80px;
    }
    .page {
        width: 1024px;
        margin: 20px auto;
    }
    .top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }
    .goods-title {
        line-height: 40px;
        font-size: 16px;
        background-color: #E01840;
        color: #fff;
    }
    .right-top {
        height: 50%;
        height: 313px;
    }
    .right-bottom {
        display: flex;
        height: 50%;
        height: 252px;
    }
    .re-goods-item{
        width: 250px;
        height: 256px;
    }
    .re-name {
        margin-top: 206px;
        text-align: center;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
    }
    /* .right-left {
        width: 284px
    }
    .right-right {
        width: 434px;
    }
    .middle {
        height: 390px;
        border: 1px solid red;
    } */
    .hot-goods {
        padding: 0 78px;
    }
    .hot-item {
        height: 355px;
        display: flex;
        margin-bottom: 28px;
        position: relative;
    }
    /* .hot-left {
        width: 140px;
         position: relative; 
    } */
    .left-info {
        width: 405px;
        height: 285px;
        padding: 46px 18px 7px 34px;
        background-color: #fff;
    }
    /* .left {
        position: absolute;
        bottom: 0;
    }
    .right {
        right: 0;
    } */
    .left-brand{
        font-size:18px;
        color: #FF0000
    }
    .push_title {
        font-size:24px;
        font-weight:normal;
        color:rgba(0,0,0,1);
    }
    .evaluation {
        font-size:18px;
        color:rgba(140,139,139,1);
    }
    .button button {
        width:144px;
        height:38px;
        font-size:18px;
        border-radius: 19px;
        border:0px solid rgba(160,160,160,1);
        color:rgba(120,120,120,1);
    }
    .button .buy {
        background-color: #DF1940;
        color: #fff;
    }
    .hot-right {
        /* width: 727px; */
        width: 463px;
        background-color: #111219;
    }
    .hot-left-top {
        width: 260px;
        height: 70px;
        background-color: #111219;
    }
    .right {
        margin-left: 145px;
    }
</style>
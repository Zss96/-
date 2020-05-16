<template>
  <div class="shopdetail">
    <Top :member_id="member_id"/>
    <div class="other">
        <Banner :banners="banners"/>
    <div class="business-info">
        <h3>{{shopInfo.shop_name}}简介</h3>
        <p class="business-info-content"> {{shopInfo.shopintro}}</p>
    </div>
    <div class="all-goods">
        <div class="all-goods-top"> 
            <h3>{{shopInfo.shop_name}}商品</h3>
            <div class="right">
                <button class="addgoods" @click="tapGo">获取优惠卷</button>
            </div>
        </div>
        <Goods :goods="goods" :member_id="member_id"/>
    </div>
    <page :totalpage="totalpage" :size="size" @pageClick="pageClick($event)"></page>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Banner from '../../components/shopBanner'
import Goods from '../../components/Goods'
import Page from '../../components/Page'
export default {
    name: 'shopdetail',
    components:{
        Top,
        Banner,
        Goods,
        Page
    },
    data(){
        return{
            shopInfo:[],
            banners:[],

            shop_id: NaN,
            member_id: NaN,
            page: 1,
            size: 10,
            goods:[],
            totalpage: 0,
            discount: 0
        }
    },
    methods:{
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
        getShopGoods(reset){
            let data = {
                page: reset||this.page,
                size: this.size,
                shop_id: this.shop_id
            }
            return http('member/searchgoods',data,'get').then(res=>{
                console.log(res)
                this.goods = res.data.goods;
                this.totalpage = res.data.total
            })
        },
        pageClick(page){
            console.log(page)
            this.page = page
            this.getShopGoods()
        },
        getDiscount(){
            let data = {
                shop_id: this.shop_id,
                member_id: this.member_id
            }
            return http('member/getmydiscount',data,'get').then(res=>{
                console.log(res)
                this.discount = res.data.data;
            })
        },
        tapGo(){   
            let query = {
                    member_id: this.member_id,
                    shop_id: this.shop_id
                }
            if(this.discount>0){
                 this.$message({
                        message: '你已经拥有优惠卷，请使用后再获取',
                        type: 'warning'
                });
                return;
            }
            this.$router.push({name: 'getdiscount',query:query})  
        },
    },
    created(){
        this.member_id = this.$route.query.member_id
        this.shop_id = this.$route.query.shop_id
        this. getShopInfo()
        this.getShopGoods()
        this. getDiscount()

    }

}
</script>

<style scoped>

h3{
    margin:20px 0;
}
  .business-info{
     margin: 20px 0;
  }
  .business-info-content{
    text-indent: 2rem;
    margin-top: 10px;
  }
  .all-goods-top {
      display: flex;
  }
  .all-goods-top div {
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
</style>
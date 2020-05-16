<template>
  <div class="goodsdetail">
    <Top :member_id="member_id"/>
    <div class="other">
        <div class="im-info">
        <div><Banner :banners="banners"/></div>
        <div class="goods-intro">
            <h3>{{goodsInfo.name}}</h3>
            <p class="origin_price">原价格：{{goodsInfo.origin_price}}</p>
            <p class="current_price">现价格:{{goodsInfo.current_price}}</p>
            <div class="expert">
                <h3>专家评测</h3>
                <p>预估价格:{{goodsInfo.future_price}}</p>
                <p class="evaluating">专家评价:{{goodsInfo.evaluating}}</p>
            </div>
            <p class="star">
                <i class="el-icon-star-on">{{goodsInfo.star}} </i>
                <i class="el-icon-shopping-bag-1">{{goodsInfo.buyNum}}</i>
            </p>
            <div class="btn">
                <el-button type="primary" round @click="joinCart">加入购物车</el-button>
                <el-button type="danger" round @click="buy">立即购买</el-button>
                <el-button type="warning" round @click="pk">商品对比</el-button>
            </div>
        </div>
    </div>
    
    <div class="other-info">
         <h3>商品参数</h3>  
    </div>
    <el-tabs type="border-card">
        <el-tab-pane label="商品参数">
            <div class="info">
                <div class="info-item">商品名称：{{goodsInfo.name}}</div>
                <div class="info-item">商品品牌：{{goodsInfo.brand}}</div>
                <div class="info-item">商品型号：{{goodsInfo.model}}</div>
                <div class="info-item">商品材质：{{goodsInfo.material}}</div>
                <div class="info-item">颜色分类：{{goodsInfo.colour}}</div>
                <div class="info-item">商品类别：{{goodsInfo.category}}</div>
                <div class="info-item">是否带麦：{{goodsInfo.wheat}}</div>
                <div class="info-item">佩戴方式：{{goodsInfo.wear}}</div>
                <div class="info-item">耳机类型：{{goodsInfo.type}}</div>
                <div class="info-item">耳机阻抗：{{goodsInfo.impedance}}</div>
                <div class="info-item">频响范围：{{goodsInfo.freq}}</div>
                <div class="info-item">保修日期：{{goodsInfo.warranty}}</div>
                <div class="info-item">耳机库存：{{goodsInfo.stock}}</div>
            </div>
            <div class="intro">
                <img  v-for="(item,index) in infoUrl" :key="index" :src="reqUrl+item.url" alt="">
            </div>
        </el-tab-pane>
        <el-tab-pane label="用户评价">
            <div class="comment-item" v-for="(item,index) in comments" :key="index">
                <div>
                    <span>用户{{item.user}}</span>
                    <div class="commentstar">
                        <div class="commentstar-item">
                            总体评价
                            <el-rate v-model="item.star" disabled ></el-rate>
                        </div>
                        <div class="commentstar-item">
                            外观评价
                            <el-rate v-model="item.appearancestar" disabled ></el-rate>
                        </div>
                        <div class="commentstar-item">
                            音质评价
                            <el-rate v-model="item.tunestar" disabled ></el-rate>
                        </div>
                        <div class="commentstar-item">
                            价格评价
                            <el-rate v-model="item.pricestar" disabled ></el-rate>
                        </div>
                    </div>
                   
                </div>
               
                <div class="info-detail">
                    <p>{{item.evaluate}}</p>
                </div>
                <div class="info-imgs">
                  <img :src="reqUrl+imgitem.url"  v-for="(imgitem,imgindex) in item.evaluateurl" :key="imgindex">
                </div>
            
               
            </div>
        </el-tab-pane>
        <el-tab-pane label="其他商品">
             <Goods :goods="goods" :member_id="member_id"/>
        </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Banner from '../../components/Banner'
import Goods from '../../components/Goods'
import Page from '../../components/Page'
export default {
    name: 'goodsdetail',
    components:{
        Top,
        Banner,
        Goods,
        Page
    },
    data(){
        return{
            member_id: NaN,
            memberInfo: {},
            banners: [],
            goodsInfo: [],
            infoUrl:[],
            page: 1,
            size: 100,
            shop_id: '',
            goods: [],
            user: '',
            comments:[] 
        }
    },
    watch: {    
    '$route' (to, from) {   
         this.$router.go(0); 
         console.log(to)
         console.log(from)  
    }},
    methods: {
        getInfo(){
            let that = this,
                data = {
                    member_id: this.member_id
                }
            if(this.member_id==''){
                return;
            }
            return http('member/getinfo',data,'get').then(res=>{
                console.log(res)
                this.memberInfo = res.data.data
                this.user = res.data.data.user
                console.log(this.user)
            })
        },
        getShopGoods(reset){
            let data = {
                page: reset||this.page,
                size: this.size,
                shop_id: this.shop_id,
                goods_id: this.goods_id
            }
            return http('member/searchgoods',data,'get').then(res=>{
                console.log(res)
                this.goods = res.data.goods;
                this.totalpage = res.data.total
            })
        },
        tapGo(){   
            let discount = this.memberInfo.discount,
                query = {
                    member_id: this.member_id
                }
            if(this.member_id==''){
                this.toLogin()
            }
            if(discount>0){
                 this.$message({
                        message: '你已经拥有优惠卷，请使用后再获取',
                        type: 'warning'
                });
                return;
            }
            this.$router.push({name: 'getdiscount',query:query})  
        },
        getGoods(){
            console.log(this.goods_id)
           let that = this, 
            data={
              goods_id: this.goods_id
            }
            return http('admin/searchgoodsinfo',data,'get').then(res=>{
                console.log(res)
                that.goodsInfo = res.data.data;
                that.banners = res.data.banners;
                that.infoUrl = res.data.infoUrl;
                that.shop_id = res.data.data.shop_id
                this.getShopGoods(1)
            })
        },
        joinCart(){
            let data = {
                member_id: this.member_id,
                goods_id: this.goods_id,
                num: 1,
                user: this.user,
                shop_id: this.goodsInfo.shop_id
            }
            console.log(this.goodsInfo.shop_id)
            if(this.member_id==''){
                this.toLogin()
            }
            return http('member/joincart',data,'post').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    this.$message({
                        message: '加入购物车成功',
                });
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        buy(){
              let data = {
                member_id: this.member_id,
                goods_id: this.goods_id,
                num: 1,
                buy: 0,
                shop_id: this.goodsInfo.shop_id
            }
            if(this.member_id==''){
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
        pk(){
            let query = {
                member_id: this.member_id,
                goods_id: this.goods_id,
            }
            this.$router.push({name: 'contrast',query:query})  
        },
        getEvaluate(){
            let data = {
                goods_id: this.goods_id
            }
            return http('member/goods/searchcomment',data,'get').then(res=>{
                console.log(res)
                this.comments = res.data.data
            })
        },
        toLogin(){
            console.log(111)
            this.$router.push({name: 'login'})
        },
    },
    created(){
        this.member_id = this.$route.query.member_id;
        this.goods_id = this.$route.query.goods_id;
        this.getInfo();
        this.getGoods();
        this. getEvaluate();
        
    }
}
</script>

<style scoped>
  .im-info{
      display: flex;
  }
  .goods-intro{
      margin-left: 30px;
  }
  .origin_price{
      color: #999;
      text-decoration: line-through;
  }
  .current_price {
      font-size: 20px;
      font-weight: bold;
      color: red;
  }
  .expert {
      margin-top: 30px;
      color: aqua
  }
    .price {
      margin: 20px 0;
      
  }
  .other-info h3,
  .evaluate h3,
  .price h3 {
      margin-bottom: 20px;
  }
  
  .info {
      display: flex;
      flex-wrap: wrap;
  }
  .info-item {
      width: 300px;
      
  }

  .intro {
      text-align: center;
  }
  .star {
      color: #999;
  }
  .btn {
      margin-top: 20px;
  }
  .evaluating{
      width: 500px;
  }
  .comment-item {
      border: 1px solid #999;
      margin: 10px 0;
  }
  .commentstar {
      display: flex;
      margin: 20px 0;
  }
  .commentstar>div {
      flex: 1;
      display: flex;
  }
  .info-imgs img {
    width: 200px;
    height: 200px;
  }
</style>
<template>
  <div class="pk">
      <!-- <div class="left"> -->
            <!-- <div class="top">  -->
                <!-- <el-form :inline="true">
                    <el-input placeholder="请输入内容" style="width: 88%" v-model="searchval.left" @input="inputTip(true)">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button icon="el-icon-close" circle style="margin-left:10px" @click="closeSearch"></el-button>
                </el-form>
                <ul v-if="isshowSearch">
                        <li v-for="(item,index) in searchres" :key="index">
                            <div class="searchname" v-if="item.isgoods==1" @click="getGoods(item.goods_id,index,true)">{{item.name}}</div>
                        </li>
                </ul> -->
             
                <div class="goods" v-if="left.goods_id">
                       
                    <el-image v-if="left.url"
                    style="width: 88%; height: 300px"
                    :src="reqUrl+left.url"
                    fit="fill"></el-image>
                    <div>{{left.name}}</div>
                    <div>当前价格：{{left.current_price|formatPrice}}</div>
                    <div>专家价格：{{left.future_price|formatPrice}}</div>
                    <div>专业评测：{{left.evaluating}}</div>
   
                    <div class="goods-info">外观：<el-rate v-model="left.appearancestar" disabled></el-rate></div>
                    <div class="goods-info">音质：<el-rate v-model="left.tunestar" disabled ></el-rate></div>
                    <div class="goods-info">价格：<el-rate v-model="left.pricestar" disabled ></el-rate></div>
                    <div class="goods-info">总体：<el-rate v-model="left.star" disabled ></el-rate></div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">外观评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badappearance/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midappearance/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodappearance/left.count*100" status="exception"></el-progress></div>
                        </div>
                        
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">价格评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badstar/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midstar/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodstar/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">音质评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badtune/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midtune/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodtune/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">总体评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badstar/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midstar/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodstar/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button type="primary" round @click="joinCart">加入购物车</el-button>
                        <el-button type="danger" round @click="buy">立即购买</el-button>
                    </div>
                </div>

            <!-- </div> -->
        <!-- </div> -->
  </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'pk',
    props:{
        left:{
            type: Object,
            default(){
                 return {} 
            }
        },
        member_id:{
            type: String,
            default: '0'  
        }
    },
    filters:{
     formatPrice:function(value){
          let tempVal = parseFloat(value).toFixed(3)
          let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }
     },
    methods: {
        joinCart(){
            let data = {
                member_id: this.member_id,
                goods_id: this.left.goods_id,
                num: 1,
                user: this.user,
                shop_id: this.left.shop_id,
            }
            if(this.member_id==0){
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
                goods_id: this.left.goods_id,
                num: 1,
                buy: 0,
                shop_id: this.left.shop_id
            }
            if(this.member_id==0){
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
        toLogin(){
            console.log(111)
            this.$router.push({name: 'login'})
        },
    }
}
</script>

<style scoped>
   
       .goods {
           padding-top: 20px;
       }
       .goods-info {
           display: flex;
       }
       
       .ratio .ratio-title{
           width: 80px;
           line-height: 75px;
       }
       .ratio .ratio-item{
           flex: 4;
       }
       .ratio-item div {
           display: flex;
            width:80%;
            line-height: 25px;
       }
</style>
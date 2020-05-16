<template>
  <div class="order">
        <Top :member_id="member_id"/>
        <div class="other">
            <div class="address">
            <h3>收货信息</h3>
            <el-form  :model="order" label-width="100px">
                <el-form-item label="名字" :inline="true" style="width:400px;">
                    <el-input  v-model="order.order_name" placeholder="请输入收货人名字"></el-input>
                </el-form-item>
                <el-form-item label="电话" style="width:400px;">
                    <el-input v-model="order.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="order.address" placeholder="请输入收货地址"></el-input>
                </el-form-item>
          </el-form>
        </div>
        <div class="cart-item cart-title">
            <div class="goods-info">商品信息</div>
            <div class="goods-price">单价</div>
            <div class="goods-num">数量</div>
            <div>折扣</div>
            <div class="goods-allprice">金额</div>
        </div>
    <div style="margin: 15px 0;"></div>
    <div class="cart-item" v-for="(item,index) in carts" :key="index">
            <div class="goods-info">
                     <img :src="reqUrl+item.url" alt="">
                 <div class="goods-msg">
                   <p>{{item.shop_name}}</p>
                   <p>{{item.name}}</p>
                 </div>
            </div>
            <div class="goods-price">{{item.current_price|formatPrice}}</div>
            <div class="goods-num">
                {{item.num}}
            </div>
            <div>{{item.discount>0? item.discount:'无'}}</div>
            <div class="goods-allprice" v-if="item.discount==0">{{item.current_price*item.num|formatPrice}}</div>
            <div class="goods-allprice" v-else>{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
    </div>
    <div class="money-info">
        <div class="money-list">
            <div class="money">总额：{{totalmoney|formatPrice}}</div>
            <div class="money">应付金额:{{paymount|formatPrice}}</div>
        </div>
        <div>
            <el-button type="danger" @click="buy">支付</el-button>
            <el-button type="info" plain @click="cancel">取消</el-button>
        </div>
    </div>
        </div>
        
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Page from '../../components/Page'
export default {
    name: 'order',
       components: {
        Top,
    },
    data(){
        return{
            member_id: NaN,
            cart_id: '',
            order:{
                address: '',
                order_name: '',
                phone: ''
            },
            carts: [],
            totalmoney: NaN,
            paymount: NaN,
            memberInfo: []
        }
    },
    methods: {
        getInfo(){
            let that = this,
                data = {
                    member_id: this.member_id
                }
            return http('member/getinfo',data,'get').then(res=>{
                let data = res.data.data
                that.memberInfo = res.data.data;
                // this.addressinfo = data.
                this.order.address = data.address;
                this.order.order_name = data.truename;
                this.order.phone = data.phone;
            })
        },
        getOrder(){
            let data = {
                carts_id: this.carts_id,
                member_id: this.member_id
            }
            console.log(this.cart_id)
            return http('member/buygoods',data,'get').then(res=>{
                console.log(res)
                this.carts = res.data.carts
                this.totalmoney = res.data.totalmoney
                this.paymount = res.data.paymount
             })
        },
        cancel(){
            this.$router.go(-1)
        },
        buy(){
            let order = this.order,
            query = {
                member_id:this.member_id
            };
            order.carts_id = this.carts_id;
            order.user = this.memberInfo.user
            console.log(order)
            return http('member/order',order,'post').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    this.$message({
                        message: '购买成功',
                        type: 'success'
                    });
                    this.$router.push({name: 'index',query:query})  
                }
            })
        }
    },
    filters:{
     formatPrice:function(value){
          let tempVal = parseFloat(value).toFixed(3)
          let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }
     },
    created(){
        const {carts_id,member_id} = this.$route.query;
        this.carts_id = carts_id;
        this.member_id = member_id;
        this.getInfo()
        this.getOrder()
    }

}
</script>

<style scoped>
    .font{
        font-size: 14px;
    }
    .cart-item {
        display: flex;
        border: 1px solid #999;
    }
   
    .cart-item div {
        flex: 2;
        font-size: 16px;
        text-align: center;
        line-height: 100px;
    }
    .cart-title {
        border: 0;
    }
     .cart-title div {
         line-height: normal;
     }
    .cart-item p {
        line-height: 40px;
    }
    .cart-item .cart-check {
        flex:1;
    }
    .cart-item .goods-info {
        flex:4;
        display: flex;
    }
  
    .cart-item img {
        width: 100px;
        height: 100px;
    }
    .goods-msg p{
        max-width: 215px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .money-info {
        display: flex;
        margin-top: 30px;  
    }
    .money {
        color: red;
    }
    .money-list {
        margin-right: 10px;
    }
</style>
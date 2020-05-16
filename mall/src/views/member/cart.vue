<template>
  <div class="cart">
    <Top :member_id="member_id"/>
    <div class="other">
        <div v-if="checkedId.length>0">
             <el-button type="danger" @click="buyGoods">立即购买</el-button>
            <el-button type="info" plain @click="delCarts">一件删除</el-button>
        </div>
        <div class="cart-item cart-title">
            <div class="cart-check"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></div>
            <div class="goods-info">商品信息</div>
            <div class="goods-price">单价</div>
            <div class="goods-num">数量</div>
            <div class="discount">折扣</div>
             <div class="goods-allprice">金额</div>
             <div class="goods-ope">操作</div>
        </div>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedGoods"  @change="handleChecked">
            <div class="cart-item" v-for="(item,index) in carts" :key="index">
               <div class="cart-check"> <el-checkbox :label="item.cart_id"><span></span></el-checkbox></div>
                <div class="goods-info">
                         <img :src="reqUrl+item.url" alt="">
                     <div class="goods-msg">
                       <p>{{item.shop_name}}</p>
                       <p>{{item.name}}</p>
                     </div>
                </div>
                <div class="goods-price">{{item.current_price|formatPrice}}</div>
                <div class="goods-num">
                    <i class="el-icon-minus" @click="reduceNum(item.cart_id,item.num)"></i>
                    <el-input v-model="item.num" style="width:60px" @blur="inputBlur(item.cart_id,item.stock,item.num)"></el-input>
                    <i class="el-icon-plus" @click="addNum(item.cart_id,item.num,item.stock)"></i>
                </div>
                 <div class="discount" @click="tapGo(item.discount,item.shop_id)">{{item.discount!=0?item.discount:'无'}}</div>
                <div class="goods-allprice">{{item.discount==0?item.current_price*item.num:item.current_price*item.discount/10|formatPrice}}</div>
                <div class="goods-ope">
                    <el-button type="info" plain @click="delGoods(item.cart_id)">删除</el-button>
                </div>
            </div>
        </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Page from '../../components/Page'
export default {
    name: 'cart',
    data(){
        return{
             member_id: NaN,
             carts: [],
             carts_id:[],
             checkedGoods: [],
             checkedCartsId:[],
             checkedId: [],
             checkAll: false,
             isIndeterminate: false
        }
    },
    components: {
        Top,
        Page
    },
    
    filters:{
     formatPrice:function(value){
          let tempVal = parseFloat(value).toFixed(3)
          let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }
     },
    methods: {
        getCart(){
            let data={
                member_id:this.member_id
            };
            return http('member/getcart',data,'get').then(res=>{
                console.log(res)
                this.carts = res.data.carts 
                this.init()
            })
        }, 
         init() {
            for (let i = 0; i < this.carts.length; i++) {
                this.checkedCartsId.push(this.carts[i].cart_id);
                        console.log(this.checkedCartsId)
            }
            console.log(111)
    
        },
        handleCheckAllChange(val) {
            console.log(val)
            this. checkedGoods = val ?  this.checkedCartsId : [];
            this.isIndeterminate = false;
            console.log(this.checkedId)
            this.checkedId = this.checkedGoods;
        },
         handleChecked(value) {
            console.log(value)
            let checkedCount = value.length;
            this.checkedId= value
            this.checkAll = checkedCount === this.carts.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.carts.length;
         },
         reduceNum(cart_id,num){
             num--;
             if(num==0){
                 this.$message.error('商品数量不能小于1');
                 return;  
             }
             console.log(num)
             this.editNum(cart_id,num)
         },
         addNum(cart_id,num,stock){
            num++;
            if(num>stock){
                 this.$message.error('商品数量不能超过库存量');
                 return;  
            }
            this.editNum(cart_id,num)
         },
         inputBlur(cart_id,stock,num){
             console.log(num)
             if(num>stock){
                 this.$message.error('商品数量不能超过库存量'+stock);
                 return;  
            }
            this.editNum(cart_id,num)
         },
         editNum(cart_id,num){
             //state 0-   1+ 2替换 
             let data = {
                 cart_id,
                 num,
             }
             return http('member/cart/edit',data,'post').then(res=>{
                 console.log(res)
                 if(res.data.code==1){
                     this.getCart()
                 }
             })
         },
         delGoods(cart_id){
             let cartsId = [];
             cartsId.push(cart_id);
            cart_id=cartsId.join(',')
             console.log(cartsId)
             let data = {
                 carts_id:cart_id
             }
             return http('member/cart/del',data,'post').then(res=>{
                 if(res.data.code==1){
                     this.getCart()
                 }
             })
         },
         delCarts(){
             let cart_id = this.checkedId;
            //  console.log(cart_id)
             this.delGoods(cart_id)
         },
         buyGoods(){
            let id = this.checkedId,
                carts_id=id.join(','),
                query = {
                 carts_id,
                 member_id : this.member_id
             }
              this.$router.push({name: 'order',query:query})  

         },
         tapGo(discount,shop_id){   
            let query = {
                    member_id: this.member_id,
                    shop_id
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
    },
    
    created(){
        this.member_id = this.$route.query.member_id
        this.getCart();
        
    }
}
</script>

<style scoped>
    .font{
        font-size: 14px;
    }
    .other {
        padding-top: 20px;
    }
    .cart-item {
        display: flex;
        border-bottom: 1px solid #999;
        margin-top: 20px;
    }
   
    .cart-item div {
        flex: 2;
        font-size: 16px;
        text-align: center;
        line-height: 100px;
    }
     .cart-title div {
         line-height: normal;
     }
    .cart-item p {
        line-height: 40px;
    }
    .cart-item .discount {
        flex:1;
    }
    .cart-item .cart-check {
        flex:1;
    }
    .cart-item .goods-info {
        flex:5;
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
</style>
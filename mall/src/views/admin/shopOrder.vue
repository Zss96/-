<template>
  <div class="shoporder">
    <Top :shop_id = "shop_id"/>
    <div class="other">
        <!-- <div class="top">
            <div><span class="title">耳机发烧友</span>
            <span class="name">商家中心</span>
        </div>
        <div class="logo">
            <h3>订单管理中心</h3>
        </div> -->
    <!-- </div> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first"> 
                <div class="cart-item cart-title">
                    <div class="goods-info">商品信息</div>
                    <div class="goods-num">数量</div>
                    <div class="goods-allprice">收件人信息</div>
                    <div class="status">交易操作</div>
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="cart-item" v-for="(item,index) in carts" :key="index">
                    <div class="goods-info">
                        <img :src="reqUrl+item.url" alt="">
                        <div class="goods-msg">
                            <p>{{item.goods_name}}</p>
                            <p>{{item.goods_model}}</p>
                        </div>
                    </div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice">
                        <p>姓名：{{item.name}}</p>
                        <p>电话：{{item.phone}}</p>
                        <p>地址：{{item.address}}</p>
                    </div>
                    <div class="status">
                        <el-button type="primary" plain  v-if="item.status==0" @click="send(item.order_id)">发货</el-button>
                        <div v-if="item.status==1">待收货</div>
                        <div v-if="item.status==2&&item.assess==0">待评价</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待发货" name="second"> 
                   <div class="cart-item cart-title">
                    <div class="goods-info">商品信息</div>
                    <div class="goods-num">数量</div>
                    <div class="goods-allprice">收件人信息</div>
                    <div class="status">交易操作</div>
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="cart-item" v-for="(item,index) in carts" :key="index">
                    <div class="goods-info">
                        <img :src="reqUrl+item.url" alt="">
                        <div class="goods-msg">
                            <p>{{item.goods_name}}</p>
                            <p>{{item.goods_model}}</p>
                        </div>
                    </div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice">
                        <p>姓名：{{item.name}}</p>
                        <p>电话：{{item.phone}}</p>
                        <p>地址：{{item.address}}</p>
                    </div>
                    <div class="status">
                        <el-button type="primary" plain  v-if="item.status==0" @click="send(item.order_id)">发货</el-button>
                        <div v-if="item.status==1">待收货</div>
                        <div v-if="item.status==2&&item.assess==0">待评价</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已发货" name="third">            
                   <div class="cart-item cart-title">
                    <div class="goods-info">商品信息</div>
                    <div class="goods-num">数量</div>
                    <div class="goods-allprice">收件人信息</div>
                    <div class="status">交易操作</div>
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="cart-item" v-for="(item,index) in carts" :key="index">
                    <div class="goods-info">
                        <img :src="reqUrl+item.url" alt="">
                        <div class="goods-msg">
                            <p>{{item.goods_name}}</p>
                            <p>{{item.goods_model}}</p>
                        </div>
                    </div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice">
                        <p>姓名：{{item.name}}</p>
                        <p>电话：{{item.phone}}</p>
                        <p>地址：{{item.address}}</p>
                    </div>
                    <div class="status">
                        <el-button type="primary" plain  v-if="item.status==0" @click="send(item.order_id)">发货</el-button>
                        <div v-if="item.status==1">待收货</div>
                        <div v-if="item.status==2&&item.assess==0">待评价</div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待评价" name="fourth">
                <div class="cart-item cart-title">
                    <div class="goods-info">商品信息</div>
                    <div class="goods-price">单价</div>
                    <div class="goods-num">数量</div>
                    <div class="goods-allprice">金额</div>
                    <div class="status">交易操作</div>
                </div>
                <div style="margin: 15px 0;"></div>
                <div class="cart-item" v-for="(item,index) in carts" :key="index">
                    <div class="goods-info">
                        <img :src="reqUrl+item.url" alt="">
                        <div class="goods-msg">
                            <p>{{item.goods_name}}</p>
                            <p>{{item.goods_model}}</p>
                        </div>
                    </div>
                    <div class="goods-price">{{item.current_price}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice">{{item.current_price*item.num}}</div>
                    <div class="status">
                        <el-button type="primary" plain  v-if="item.status==0" @click="send(item.order_id)">发货</el-button>
                        <div v-if="item.status==1">待收货</div>
                        <div v-if="item.status==2&&item.assess==0">待评价</div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/ShopTop'
export default {
    name: 'shoporder',
    components: {
        Top
    },
    data(){
        return{
            shop_id: '',
            carts: [],
            activeName: 'first'
        }
    },
    methods: {
        handleClick(tab, event) {
        console.log(tab, event);
         this.getOrder(tab.index) 
      },
      getOrder(type) {
          let data = {
              shop_id: this.shop_id,
              type
          }
          return http('member/getorder',data,'get').then(res=>{
              this.carts = res.data.carts
          })
      },
      send(order_id){
          let data = {
              order_id,
              status: 1
          }
          return http('/member/send',data,'post').then(res=>{
              console.log(res)
          })
      }
    },
     created() {
       console.log(this.$route.query.shop_id)
        this.shop_id = this.$route.query.shop_id
        console.log(this.shop_id)
        this.getOrder(0)
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

    /* .goods-allprice p {
        text-align: left;
    } */
     .cart-item  .goods-allprice{
         flex: 4;
     }
</style>
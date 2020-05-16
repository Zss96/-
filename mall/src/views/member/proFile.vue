<template>
  <div class="profile">
        <Top :member_id="member_id"/>
         <div class="other">
             <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部订单" name="first"> 
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
                    <div class="goods-price">{{item.current_price|formatPrice}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice" v-if="item.discount>0">{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
                    <div class="goods-allprice" v-else>{{item.current_price*item.num|formatPrice}}</div>
                    <div class="status">
                        <div v-if="item.status==0">待发货</div>
                         <div v-if="item.assess==1">已评价</div>
                        <el-button type="primary" plain v-if="item.status==1" @click="confirm(item.order_id)">确认收货</el-button>
                        <el-button type="primary" plain  v-if="item.status==2&&item.assess==0" @click="evaluate(item.order_id)">去评价</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="待发货" name="second"> 
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
                    <div class="goods-price">{{item.current_price|formatPrice}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice" v-if="item.discount>0">{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
                    <div class="goods-allprice" v-else>{{item.current_price*item.num|formatPrice}}</div>
                    <div class="status"> 
                        <div v-if="item.status==0">待发货</div>
                        <el-button type="primary" plain v-if="item.status==1" @click="confirm(item.order_id)">确认收货</el-button>
                        <el-button type="primary" plain  v-if="item.status==2&&item.assess==0">去评价</el-button>
                    </div>
                </div>
                
            </el-tab-pane>
            <el-tab-pane label="待收货" name="third">            
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
                    <div class="goods-price">{{item.current_price|formatPrice}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice" v-if="item.discount>0">{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
                    <div class="goods-allprice" v-else>{{item.current_price*item.num|formatPrice}}</div>
                    <div class="status">
                        <div v-if="item.status==0">待发货</div>
                        <el-button type="primary" plain v-if="item.status==1" @click="confirm(item.order_id)">确认收货</el-button>
                        <el-button type="primary" plain  v-if="item.status==2&&item.assess==0">去评价</el-button>
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
                    <div class="goods-price">{{item.current_price|formatPrice}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice" v-if="item.discount>0">{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
                    <div class="goods-allprice" v-else>{{item.current_price*item.num|formatPrice}}</div>
                    <div class="status">
                        <div v-if="item.status==0">待发货</div>
                        <el-button type="primary" plain v-if="item.status==1" @click="confirm(item.order_id)">确认收货</el-button>
                         <el-button type="primary" plain  v-if="item.status==2&&item.assess==0" @click="evaluate(item.order_id)">去评价</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已评价" name="six">
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
                    <div class="goods-price">{{item.current_price|formatPrice}}</div>
                    <div class="goods-num">{{item.num}}</div>
                    <div class="goods-allprice" v-if="item.discount>0">{{item.current_price*item.num*item.discount/10|formatPrice}}</div>
                    <div class="goods-allprice" v-else>{{item.current_price*item.num|formatPrice}}</div>
                    <div class="status">
                        
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="个人信息" name="five">
                <el-form :inline="true" label-width="100px">
                    <el-form-item label="用户姓名">
                        <el-input v-model="memberInfo.truename" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="memberInfo.email" placeholder="请输入负责人邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="memberInfo.phone" placeholder="请输入用户电话"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="memberInfo.address" placeholder="请输入用户地址" style="width:500px;"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="keep">保存</el-button>
                </el-form>
     
            </el-tab-pane>
        </el-tabs>
         </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
export default {
    name: 'profile',
       data(){
        return{
             member_id: NaN,
            activeName: 'first',
            carts: [],
            memberInfo: {},
            tabindex: ''
             
        }
    },
    components: {
        Top,
    },
        filters:{
     formatPrice:function(value){
          let tempVal = parseFloat(value).toFixed(3)
          let realVal = tempVal.substring(0,  tempVal.length - 1)
                return realVal
            }
     },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.tabindex = tab.index 
        console.log(tab.index)
        if(tab.index<5){
            this.getOrder(tab.index) 
        }else {
            this.getInfo()
        }
         
      },
      getOrder(type) {
          let data = {
              member_id: this.member_id,
              type
          }
          return http('member/getorder',data,'get').then(res=>{
              this.carts = res.data.carts
          })
      },
      confirm(order_id){
          let data = {
              order_id,
              status: 2
          }
          return http('/member/send',data,'post').then(res=>{
              console.log(res)
              if(res.data.code==1){
                  this.getOrder(this.tabindex)
              }
          })
      },
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
      keep(){
            let memberInfo=this.memberInfo
     
        return http('member/updateInfo',memberInfo,'post').then(res=>{
            if(res.data.code==1){
                this.$message({
                    message: '报存信息成功',
                    type: 'success'
        });
            }
        })
      },
      evaluate(order_id){
          let query={
              carts_id: this.carts,
              member_id:this.member_id,
              order_id
          }
          this.$router.push({name: 'evaluate',query:query}) 
      }
    },
    created(){
        this.member_id = this.$route.query.member_id
        this.getOrder(0)      
    },
    
}
</script>

<style scoped>
.font{
        font-size: 14px;
    }
    .cart-item {
        display: flex;
        border-bottom: 1px solid #999;
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
</style>
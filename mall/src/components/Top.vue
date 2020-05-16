<template>
    <div class="top">
        <!-- <div class="logo"><span class="title" @click="backIndex">耳机发烧友</span></div>
        <div class="top-center">
            <div @click="tapGo">优惠卷</div>
            <router-link tag="div" :to="{path: '/share',query:{member_id:member_id}}">社区</router-link>
            <router-link tag="div" :to="{path: '/cart',query:{member_id:member_id}}"><i class="el-icon-shopping-cart-2"></i></router-link>
            <router-link tag="div" :to="{path: '/profile',query:{member_id:member_id}}"><i class="el-icon-s-custom"></i></router-link>
            <div><i class="el-icon-search"></i></div>
            <div><i class="el-icon-more"></i></div>
        </div> -->
      <!-- <div class="right">
          <el-button type="warning" size="mini">退出</el-button>
      </div> -->


      <!--新top  -->
      <div class="header">
          <div class="logo" @click="backIndex"><i class="el-icon-headset"></i></div>
          <div class="nav" >
               <div v-if="isshowSearch" class="search">
                   <el-form :inline="true">
                       <el-input placeholder="请输入内容" style="width: 70%" v-model="searchval" @input="inputTip">
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                        <el-button icon="el-icon-close" circle style="margin-left:172px" @click="closeSearch"></el-button>
                    </el-form>
                    <ul>
                        <li v-for="(item,index) in searchres" :key="index" @click="item.isgoods==1?toGoods(item.goods_id):toShop(item.shop_id)">
                            <div class="searchname">{{item.isgoods==1? item.name : item.shop_name}}</div>
                            <div class="istype">{{item.isgoods==1? '商品' : '店铺'}}</div>
                        </li>
                    </ul>
               </div>

               <ul  v-else>
                 <li class="wear" @click="toGoodsList(1)">
                     头戴式耳机
                     <!-- <i :class="navindex==1?'el-icon-arrow-up':'el-icon-arrow-down'"  @mouseenter="enter(1)" @mouseleave="leave"></i> -->
                 </li>
                 <li class="wear" @click="toGoodsList(2)">
                     入耳式耳机
                     <!-- <i :class="navindex==2?'el-icon-arrow-up':'el-icon-arrow-down'"  @mouseenter="enter(2)" @mouseleave="leave"></i> -->
                 </li>
                 <li @click="member_id==0? toLogin():toShare()">社区</li>
                 <li @click="toConstrast()">对比</li>   
                 <li class="more" @click="moreClick"> 
                     <i class="el-icon-error" v-if="showmore"></i>
                     <i class="el-icon-s-unfold" v-else></i>
                 </li>
                 <li class="searchbtn"><i class="el-icon-search" @click="showSearch"></i></li>
               </ul>
          </div>
      </div>
        <div class="subnav" v-if="showmore">
            <ul class="morenav" >
                <li @click="member_id==0? toLogin():toProfile()">我的</li>
                <li @click="member_id==0? toLogin():toCart()">购物车</li>
                <li @click="member_id==0? toLogin():toMydiscount()">优惠卷</li>
                <li>加入我们</li>
                <li>联系我们</li>
                <li @click="toLogin">登录/退出</li>
            </ul>
        </div>
        <div class="subnav" v-if="navindex==1">
            <ul class="morenav" >
             
            </ul>
        </div>
      
     
    </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'top',
    data(){
        return{
            memberInfo:{},
            navindex: 0,
            showsubnav: false,
            isshowSearch:false,
            searchval: '',
            showmore: false,
            searchres: []
        }
    },
    props:{
        member_id:{
            type: String,
            default: ''
            
        },
    },
    methods: {
        tapGo(){   
            let discount = this.memberInfo.discount,
                query = {
                    member_id: this.member_id
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
        backIndex(){
           let  query = {
                    member_id: this.member_id
                } 
            this.$router.push({name: 'index',query:query})  
        },
        toLogin(){
            console.log(111)
            this.$router.push({name: 'login'})
        },
        toShare(){
            let member_id = this.member_id,
                query = {
                    member_id
                };
                this.$router.push({name: 'share',query:query})  
            
        },
        enter(type){
            this.navindex = type;
            this.showsubnav= true;
            let data = {
                type
            }
            return http('member/gettype/goods',data,'get').then(res=>{
                console.log(res)
            })
        },
        leave(){
            this.navindex = 0;
            this.showsubnav=false;
        },
        moreClick(){
            this.showmore = !this.showmore
        },
        showSearch(){
            this.isshowSearch=true
        },
        closeSearch(){
            this.isshowSearch=false;
        },
        inputTip(){
         
            let data={
                searchval: this.searchval
            }
            if(this.searchval==""){
                this.searchres = []
                return;
            }
            return http('/member/search',data,'get').then(res=>{
                console.log(res)
                this.searchres = res.data.result
            })
               console.log(this.searchval)
        },
        toShop(shop_id){
            console.log(shop_id)
            let query = {
                shop_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'shopdetail',query:query})  
        },
        toGoods(goods_id){
            let query = {
                goods_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'goodsdetail',query:query})  
        },
        toCart(){
            let query = {
                member_id :this.member_id
            }
             this.$router.push({name: 'cart',query:query})  
        },
        toProfile(){
            let query = {
                member_id :this.member_id
            }
             this.$router.push({name: 'profile',query:query})  
        },
        toConstrast(){
            let query = {
                member_id :this.member_id
            }
             this.$router.push({name: 'contrast',query:query})  
        },
        toGoodsList(type){
            let query = {
                member_id :this.member_id,
                goodstype: type
            }
            this.$emit('type',type)
             this.$router.push({name: 'goodslist',query:query})  
        },
        toMydiscount(){
            let query = {
                member_id :this.member_id
            }
            this.$router.push({name: 'mydiscount',query:query})  
        },
        search(){
            let query = {
                    member_id : this.member_id,
                    searchval: this.searchval
                }
             this.$router.push({name: 'search',query:query})  
        }
    },
    created(){
        this.getInfo()
    }
}
</script>

<style scoped>
       /* .top {
           background-color: #0a0a0a;
            display: flex;
            height: 40px;
            margin-bottom: 20px;
       }
         .logo {
        flex: 3
        }
        .top-center {
        flex: 1
        }
       .title {
           font-size: 30px;
           color: #fff;
       }
      .top-center {
        display: flex;
        line-height: 40px; 
        text-align: center;
        color: #fff;
        margin-right: 20px;
    }
   .top-center div{
        flex: 1
        } */


        /* 新top */
        .top {
            background-color: #161616;      
            position: relative;
       }
       .logo {
           width: 148px;
       }
       .logo img {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           border: 1px solid red;
       }
       .logo i {
            font-size: 41px;
            padding-top: 22px;
       }
       .header {
           width: 1024px;
            height: 80px;
            line-height: 80px;
            margin: 0 auto;
            font-size: 18px;
            color: #fff;
            display: flex;
      
       }
       .nav {
           width: 876px;
       }
       .nav>ul{
           display: flex;
       }
       .nav>ul li {
           height: 80px;
           flex: 1;
           list-style: none;
            font-weight: 500;
            transition: color 0.35s ease-ou;
            text-align: center;
       }
       .more i,
       .searchbtn i{
           font-size: 24px;
           padding-top: 30px;
       }
       .wear i {
          font-size: 18px;
          margin-left: 6px;

       }
       .subnav {
           position:absolute;
           /* height: 300px; */
           left: 0;
           right: 0;
           background-color: #242424;
           text-align: center;
           z-index: 99;
       }
       .subnav ul {
           
           height: 700px;
       }
       .morenav  li{
           margin: 0 auto;
            max-width: 460px;
            width: 100%;
            text-align: center;
            font-size: 33px;
            line-height: 60px;
            text-transform: none;
            color: #fff;
       }
       .search ul{
           position: absolute;
           width: 33%;
           padding: 0 28px;
           background-color: #242424;
           z-index: 999;

       }
       .search  li{
           display: flex;
           border-bottom: 1px solid #999;
       }
       .searchname {
           width: 526px;
       }
       .istype {
           font-size: 12px;
       }
       
</style>
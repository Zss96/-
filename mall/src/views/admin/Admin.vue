<template>
  <div class="admin">
    <Top @handleSelect="handleSelect" :admin_id="admin_id"/>
    <!-- <div class="other">
      <div class="top">
      <div>
      <span class="title">耳机发烧友</span>
      </div>
     <div class="logo">
          <div>管理中心</div>
      </div>
      <div class="right">
          <el-button type="warning" size="mini">退出</el-button>
      </div>
    </div> -->
    <div class="other">
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#0b8dd8"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="1">首页设置</el-menu-item>
        <el-submenu index="2">
          <template slot="title">商家审核</template>
          <el-menu-item index="2-1">已审核</el-menu-item>
          <el-menu-item index="2-2">未审核</el-menu-item>
        </el-submenu> 
        <el-submenu index="3">
          <template slot="title">商品评测</template>
          <el-menu-item index="3-1">已评测</el-menu-item>
          <el-menu-item index="3-2">未评测</el-menu-item>
        </el-submenu>
    </el-menu> -->
    <div v-if="key==1">
      <!-- <div class="discount">
         <el-form ref='from' :model = subjects :inline="true" label-width="100px">
           <h3>折扣设置</h3>
            <el-form-item label="答题数（条）">
                <el-input v-model="subjects.counter" placeholder="请输入所需要答题数目"></el-input>
            </el-form-item>
            <el-form-item label="时间（分钟）">
                <el-input v-model="subjects.time" placeholder="请输入答题时间，（分钟）"></el-input>
            </el-form-item>
            <el-form-item label="满分（折）">
                <el-input v-model="subjects.onehundred" placeholder="请输入对应的折扣"></el-input>
            </el-form-item>
            <el-form-item label="优秀（折）">
                <el-input v-model="subjects.excellent" placeholder="请输入对应的折扣"></el-input>
            </el-form-item>
            <el-form-item label="良好（折）">
                <el-input v-model="subjects.good" placeholder="请输入对应的折扣"></el-input>
            </el-form-item>
            <el-form-item label="及格（折）">
                <el-input v-model="subjects.pass" placeholder="请输入对应的折扣"></el-input>
            </el-form-item>
            <el-form-item label="不及格（折）">
                <el-input v-model="subjects.fail" placeholder="请输入对应的折扣"></el-input>
            </el-form-item>
          </el-form>
          <h3>首页设置</h3>
          <el-form :model = subjects :inline="true" label-width="100px">
              <el-form-item label="轮播图（个）">
                <el-input v-model="subjects.bannerNum" placeholder="请输入轮播图个数"></el-input>
              </el-form-item>
              <el-form-item label="店铺（个）">
                <el-input v-model="subjects.shopNum" placeholder="请输入推荐店铺个数"></el-input>
              </el-form-item>
          </el-form>
          <el-button type="primary" @click="keep">保存</el-button>
      </div>
      <div class="subject">
            <div class="right">
              <h3>题目</h3>
              <router-link tag="el-button" type="primary" :to="{path: '/addsubject'}">添加题目</router-link>
            </div>
            <div class="sub-item">
              <div class="sub-title">题目</div>
              <div class="sub-ope"><div>操作</div></div>
            </div>
            <div class="sub-item"  v-for="(item,index) in subjectsInfo" :key="index">
               <div class="sub-title">{{item.title}}</div>
                <div class="sub-ope">
                  <div>
                    <router-link tag="el-button" type="primary" :to="{path: '/addsubject',query:{subjects_id: item.subjects_id}}">编辑/查看</router-link>
                  </div>
                  <div type="primary"><el-button  @click="delSub(item.subjects_id)" >删除</el-button></div>
                </div>
            </div>
      </div> -->
      <div class="index">
        <el-form :model = subjects :inline="true" label-width="110px">
              <el-form-item label="轮播图（个）">
                <el-input v-model="subjects.bannerNum" placeholder="请输入轮播图个数"></el-input>
              </el-form-item>
              <el-form-item label="热销商品(个)">
                <el-input v-model="subjects.hotNum" placeholder="请输入推荐店铺个数"></el-input>
              </el-form-item>
              <el-button type="primary" @click="keep">保存</el-button>
        </el-form>

        <h3>推荐商品</h3>
        <div class="shops">
       <div class="shop-item">
         <div class="shop-logo">品牌</div>
         <div class="shop-name">商品名</div>
         <div class="shop-ope"><div>操作</div></div>
       </div>
       <div class="shop-item"  v-for="(item,index) in goods" :key="index">
         <div class="shop-logo">{{item.brand}}</div>
         <div class="shop-name">{{item.name}}</div>
         <!-- <div class="shop-intro">{{item.material}}</div> -->
         <div class="shop-ope">
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,push: 1,admin_id: admin_id}}">查看</router-link>
           </div>
           <div>
              <el-button  type="primary" v-if="item.push_status==1" @click="push(item.goods_id,2)">取消推荐</el-button>
              <el-button  type="primary" v-else-if="item.push_status==2" @click="push(item.goods_id,1)">设为推荐</el-button>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,push: 1,admin_id: admin_id}}" v-else>填写推荐</router-link>
           </div>
         </div>
       </div>
      </div>
      </div>
    </div>
    <div v-if="key=='2-1'">
       <div class="shops">
       <div class="shop-item">
         <div class="shop-logo">logo</div>
         <div class="shop-name">店铺名</div>
         <div class="shop-intro">店铺介绍</div>
         <div class="shop-ope"><div>操作</div></div>
       </div>
       <div class="shop-item"  v-for="(item,index) in shops" :key="index">
         <div class="shop-logo">  <img :src="reqUrl+item.logo"></div>
         <div class="shop-name">{{item.shop_name}}</div>
         <div class="shop-intro">{{item.shopintro}}</div>
         <div class="shop-ope">
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/adminshop',query:{shop_id: item.shop_id,admin_id: admin_id}}">查看</router-link>
           </div>
           <div type="primary"><el-button  @click="auditShop(item.shop_id)" >确认审核</el-button></div>
         </div>
       </div>
     </div>
    </div>
     <div v-if="key=='2-2'">
      <div class="shops">
        <div class="shop-item">
          <div class="shop-logo">logo</div>
          <div class="shop-name">店铺名</div>
          <div class="shop-intro">店铺介绍</div>
          <div class="shop-ope"><div>操作</div></div>
        </div>
        <div class="shop-item"  v-for="(item,index) in shops" :key="index">
          <div class="shop-logo">  <img :src="reqUrl+item.logo"></div>
          <div class="shop-name">{{item.shop_name}}</div>
          <div class="shop-intro">{{item.shopintro}}</div>
          <div class="shop-ope">
            <div>
               <router-link tag="el-button" type="primary" :to="{path: '/adminshop',query:{shop_id: item.shop_id,admin_id: admin_id}}">查看</router-link>
            </div>
            <div type="primary"><el-button  @click="auditShop(item.shop_id)" >确认审核</el-button></div>
          </div>
        </div>
      </div>
     </div>
    <div v-if="key=='3-1'">
      <div class="shops">
       <div class="shop-item">
         <div class="shop-logo">品牌</div>
         <div class="shop-name">商品名</div>
         <div class="shop-intro">型号</div>
         <div class="shop-ope"><div>操作</div></div>
       </div>
       <div class="shop-item"  v-for="(item,index) in goods" :key="index">
         <div class="shop-logo">{{item.brand}}</div>
         <div class="shop-name">{{item.name}}</div>
         <div class="shop-intro">{{item.model}}</div>
         <div class="shop-ope">
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,admin_id: admin_id}}">查看</router-link>
           </div>
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,admin_id: admin_id}}">评测</router-link>
           </div>
         </div>
       </div>
      </div>
    </div>
    <div v-if="key=='3-2'">
      <div class="shops">
       <div class="shop-item">
         <div class="shop-logo">品牌</div>
         <div class="shop-name">商品名</div>
         <!-- <div class="shop-intro">型号</div> -->
         <div class="shop-ope"><div>操作</div></div>
       </div>
       <div class="shop-item"  v-for="(item,index) in goods" :key="index">
         <div class="shop-logo">{{item.brand}}</div>
         <div class="shop-name">{{item.name}}</div>
         <!-- <div class="shop-intro">{{item.material}}</div> -->
         <div class="shop-ope">
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,admin_id: admin_id}}">查看</router-link>
           </div>
           <div>
              <router-link tag="el-button" type="primary" :to="{path: '/admingood',query:{goods_id: item.goods_id,admin_id: admin_id}}">评测</router-link>
           </div>
         </div>
       </div>
      </div>
  
    </div>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/AdminTop'
export default {
    name: 'admin',
    components:{
      Top
    },
      data() {
      return {
        admin_id: '',
        key: 1,
        shops: [],
        goods : [],
        subjects:{
          bannerNum: '',
          hotNum: ''
        },
        subjectsInfo: []
      };
    },
    methods: {
      handleSelect(key) {
        this.key = key
        if(key==1){
          this.getSub()
        }else if(key=="2-1"){
          this.getShops(1)
        }else if(key=='2-2'){
          this.getShops(0)
        }else if(key=='3-1'){
          this.getGoods(1)
        }else if(key=='3-2'){
          this.getGoods(0)
        }
        
      },
      getSub(){
        return http('admin/searchsubjects',{},'get').then(res=>{
          console.log(res)
          this.subjectsInfo = res.data.data
        })
      },
      delSub(subjects_id){
        let that = this,
            data = {
              subjects_id
            }
        return http('admin/delsubject',data,'post').then(res=>{
          if(res.data.code==1){
            that.getSub()
          }
          console.log(res)
        })
      },
      getShops(shopstatus){
          let data={
            shopstatus
        }   
        return http('admin/searchshops',data,'get').then(res=>{
             console.log(res),
             this.shops = res.data.data
        })
      },
      getGoods(status){
          let data={
            status
        }   
        return http('admin/searchgoods',data,'get').then(res=>{
             console.log(res),
             this.goods = res.data.data
        })
      },
      auditShop(shop_id){
        console.log(shop_id)
        let that = this,
            data = {
              shop_id,
              shopstatus: 1
          }
        return http('admin/auditshop',data,'post').then(res=>{
          console.log(res)
          if(res.data.code==1){
            that.getShops(1)
          }
        })

      },
     keep(){
       let  that = this,
            subjects = this.subjects;
       return http('admin/index',subjects,'post').then(res=>{
          if(res.data.code==1){
              that.$message({
                  message:'保存成功',
                  type: 'success'
                });
          }
       })
     },
     getindex(){
       let that = this;
       return http('admin/getindex',{},'get').then(res=>{
         console.log(res)
         if(res.data.code==1){
            that.subjects = res.data.data[0]
         }
       })
     },
     push(goods_id,push_status){
       let data = {
         goods_id,
         push_status
       }
       return http('admin/push/goods',data,'post').then(res=>{
         if(res.data.code==1){
           this.getGoods(1)
         }
       })
     }

    },
    created(){
      this.admin_id = this.$route.query.admin_id 
      this.getSub()
      this.getindex()
      this.getGoods(1)
    }
}
</script>

<style scoped>
  .index {
    margin: 20px 0;
  }
  /* .top {
    display: flex;
    height: 40px;
    margin-bottom: 50px;
  }
  .top div {
    flex: 1;
  }
  .logo{
    font-size: 28rpx;
    font-weight: bold;
  } */
 .shops {
       border: 1px solid black;
  }
  .shop-item {
    display: flex;
     border: 1px solid black;
  }
 .shop-item div {
    text-align: center;
    border-right: 1px solid black;
    padding-top: 2px;
  }
  .shop-item div:nth-last-child(1){
    border-right: none;
  }
  .shop-logo {
    flex: 1;
  }
  .shop-name {
    flex: 1;
  }
  .shop-intro {
    flex: 2;
  }
  .shop-ope {
    flex: 2;
    display: flex;
  
  }
  .shop-ope div {
    flex: 1;
  }
  .shop-logo img {
    width: 40px;
    height: 40px;
  }
  .right {
       display: flex;
       margin-bottom: 20px;
   }
  .right h3{
     flex: 2;
  }
  .sub-item {
    display: flex;
     border: 1px solid black;
  }
 .sub-item div {
    text-align: center;
    border-right: 1px solid black;
    padding-top: 2px;
  }
  .sub-item div:nth-last-child(1){
    border-right: none;
  }
  .sub-title {
    flex: 3;
  }
  .sub-ope {
      flex: 1;
      display: flex;
  }
  .sub-ope div {
    text-align: center;
    flex: 1;
  }
  .shop-intro {
    height: 46px;
    overflow: hidden;

  }
</style>  
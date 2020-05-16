<template>
  <div class="top">
        <div class="header">
            <div class="logo" @click="backIndex"><i class="el-icon-headset"></i></div>
            <div class="middle"></div>
            <div class="nav" v-if="type==0">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#161616"
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
                </el-menu>
            </div>
            <div class="nav" v-else>管理中心</div>
            <div class="right" @click="layou">退出</div>

        </div>
  </div>
</template>

<script>
export default {
    name: 'top',
    data(){
        return{
            activeIndex: '1',
        }
    },
    props: {
        admin_id:{
            type: String,
            default: ''
        },
        type: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.key = key
            this.$emit('handleSelect',key)
        },
      backIndex(){
           let  query = {
                    admin_id: this.admin_id
                } 
            this.$router.push({name: 'admin',query:query})  
        },
        layou(){
           this.$router.push({name: 'login'})   
        }
    }
}
</script>

<style scoped>
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
            padding-top: 12px;
       }
       .header {
           width: 1024px;
            height: 60px;
            line-height: 60px;
            margin: 0 auto;
            font-size: 18px;
            color: #fff;
            display: flex;
       }
       .middle {
           flex: 1;
           text-align: center;
       }
       .nav {
           flex: 3;
       }
       .right {
           flex: 1;
           text-align: right;
       }
</style>


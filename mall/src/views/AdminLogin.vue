<template>
  <div class="adminlogin">
     <div class="login" v-if="isShow">
         <h1>耳机发烧友</h1>
          <div class="info"><label for="">用户名：</label><input type="text" v-model="user" placeholder="请输入用户名"></div>
          <div class="info"><label for="">密码：</label><input type="password" v-model="password" placeholder="请输入密码"></div>
          <div class="user-type">
            <label v-for="(item,index) in list" :key="index" ><input type="radio" name="login"  :value="item.value" v-model="checkedValue" />{{item.name}}</label>
          </div>
          <div><button @click="login">登录</button></div>
          <div class="bottom" @click="toDo">去注册</div>
     </div>
     <div class="reister" v-if="!isShow">
          <h1>耳机发烧友</h1>
          <div class="info"><label for="">用户名：</label><input type="text" v-model="reuser" placeholder="请输入用户名"></div>
          <div class="info"><label for="">密码：</label><input type="password" v-model="repassword" placeholder="请输入密码"></div>
          <div class="user-type">
            <label v-for="(item,index) in relist" :key="index" ><input type="radio" name="re"  :value="item.value" v-model="recheckedValue" />{{item.name}}</label>
          </div>
          <div><button @click="reister">注册</button></div>
           <div class="bottom" @click="toDo">返回登录</div>
     </div>
  </div>
</template>

<script>
import {http} from '../network/http'

export default {
    name: 'adminlogin',
    data() {
        return{
            isShow: true,
            user: '',
            password: '',
            reuser: '',
            repassword: '',
            checkedValue: 1,
            recheckedValue: 1,
            list:[{value:1,name:'用户'},{value:2,name:'商家'},{value:3,name:'管理'}],
            relist:[{value:1,name:'用户'},{value:2,name:'商家'}]
        }
    },
    methods: {
        toDo() {
            this.isShow = !this.isShow;
        },
        login() {
            let that = this,
                user = this.user,
                password = this.password,
                checkedValue =this.checkedValue,
                data= {
                    user,
                    password,
                    checkedValue
                };
            return http('admin/login',data,'post')
                .then(res => {
                    let code = res.data.code;
                    console.log(code);
                    if( code == 1){
                        if(checkedValue == 1){
                            let member_id = res.data.data[0].member_id
                            console.log(typeof member_id)
                                          that.$message({
                                            message:'登录成功',
                                            type: 'success'
                                        });
                            that.$router.push({name: 'index',query: {'member_id':member_id}})
                        }else if(checkedValue == 2){
                            let shop_id = res.data.data[0].shop_id
                            console.log(shop_id)
                             that.$message({
                                            message:'登录成功',
                                            type: 'success'
                                        });
                            that.$router.push({name: 'business',query: {'shop_id':shop_id}})
                        }else if(checkedValue == 3){
                             that.$message({
                                            message:'登录成功',
                                            type: 'success'
                                        });
                            let admin_id = res.data.data[0].admin_id
                            that.$router.push({name: 'admin',query: {'admin_id':admin_id}})
                        }
                    }else {
                         that.$message({
                                    message:'你输入的账户或密码有误，请重新登录',
                                    type: 'error'
                                });
                    }
                })

        },
        reister() {
                let user = this.reuser,
                password = this.repassword,
                checkedValue =this.recheckedValue,
                data= {
                    user,
                    password,
                    checkedValue
                };
            console.log(this.checkedValue)
            return http('admin/reister',data,'post')
                .then(res => {
                    let code = res.data.code;
                    if(code == 1){
                        alert('注册成功，请去登录')
                    }else {
                        alert('用户名已经存在，请重新输入用户名')
                    }
                })
        }    
    }
}
</script>

<style scoped>
    .adminLogin {
        width: 100%;
        /* height: 100vh; */
    }
    .login,
    .reister {
        margin: 0 auto;
        width: 500px;
        border: 1px solid #ccc;
    }
     .login div,
     .reister div {
        margin: 10px 0;
        text-align: center;
    }
    .info input {
        width: 260px;
        padding: 10px;
    }
    .info label {
        display: inline-block;
        width: 76px;
        text-align: right;
    }
    h1{
        text-align: center;
        background-color: #0b8dd8;
        color: #fff;
    }
    .login button,
    .reister button {
        width: 100px;
        height: 50px;
        border-radius: 8px;
        background-color: #0b8dd8;
        color: #fff;
    }
    .bottom {
        font-size: 12px;
        color: #0b8dd8;
    }
</style>
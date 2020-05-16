<template>
  <div class="setdiscount">
     <Top :shop_id = "shop_id"/>
      <div class="other">
          <div class="discount">
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
            <el-button type="primary" @click="keep">保存</el-button>
          </el-form>
          
      </div>
      <div class="subject">
            <div class="right">
              <h3>题目</h3>
              <router-link tag="el-button" type="primary" :to="{path: '/addsubject',query:{shop_id: shop_id}}">添加题目</router-link>
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
      </div>
      </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/ShopTop'
export default {
    name: 'setdiscount',
     components: {
        Top
    },
    data(){
        return {
            subjects:{
                counter: '',
                time: '',
                onehundred: '',
                excellent: '',
                good: '',
                pass: '',
                fail: ''
            },
            subjectsInfo: [],
            shop_id: ''
        }
    },
    methods: {
        
     keep(){
       let  that = this,
            subjects = this.subjects;
            subjects.shop_id = this.shop_id;
       return http('admin/discount',subjects,'post').then(res=>{
          if(res.data.code==1){
              that.$message({
                  message:'保存成功',
                  type: 'success'
                });
          }
       })
     },
     getDiscount(){
       let that = this,
       data = {
           shop_id: this.shop_id
       };
       return http('admin/getdiscount',data,'get').then(res=>{
         console.log(res)
         if(res.data.code==1){
           if(res.data.data.length>0){
              that.subjects = res.data.data[0]
           }
            
         }
       })
     },
     getSub(){
         let data = {
             shop_id: this.shop_id
         }
        return http('admin/searchsubjects',data,'get').then(res=>{
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
    },
    created(){
       this.shop_id = this.$route.query.shop_id;
       this.getDiscount()
       this.getSub()
    }
}
</script>

<style scoped>
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
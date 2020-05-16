<template>
  <div class="addsubject">
       <Top :shop_id = "shop_id"/>
      <div class="other">
          <el-form ref='from' :model = subjects label-width="100px">
            <el-form-item label="题目">
                <el-input v-model="subjects.title" placeholder="请输入题目"></el-input>
            </el-form-item>
            <el-form-item label="A">
            <el-input v-model="subjects.A" placeholder="请输入A选项"></el-input>
            </el-form-item>
            <el-form-item label="B">
                <el-input v-model="subjects.B" placeholder="请输入B选项"></el-input>
            </el-form-item>
            <el-form-item label="C">
                <el-input v-model="subjects.C" placeholder="请输入C选项"></el-input>
            </el-form-item>
            <el-form-item label="D">
                <el-input v-model="subjects.D" placeholder="请输入D选项"></el-input>
            </el-form-item> 
             <el-form-item label="答案">
                <el-input v-model="subjects.answer" placeholder="请输入答案"></el-input>
            </el-form-item>
          </el-form>
    <el-button type="primary" @click="keep">保存</el-button>
    <el-button type="danger" @click="cancel">取消</el-button>
      </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/ShopTop'
export default {
    name: 'addsubject', 
    components: {
        Top
    },
    data(){
        return{
            subjects: {},
            shop_id: ''

        }
    },
    methods: {
        keep(){
            let that = this, 
            subjects = this.subjects;
            subjects.subjects_id = this.subjects_id,
            subjects.shop_id = this.shop_id;
            return http('admin/addsubjects',subjects,'post').then(res=>{
                console.log(res)
                console.log(res.data.code)
                if(res.data.code==1){
                    console.log(11)
                    that.$router.go(-1);
                }
                  
            })
        },
        cancel(){
            this.$router.go(-1);
        }, 
        getSub(){
            let data= {
                subjects_id: this.subjects_id
            }
            return http('admin/searchsubjects',data,'get').then(res=>{
            console.log(res)
            this.subjects = res.data.data[0]
        })
      }, 
    },
    created(){
        this.subjects_id = this.$route.query.subjects_id;
        this.shop_id = this.$route.query.shop_id;
        if(this.subjects_id!=undefined){
        this.getSub()
        }
    }
}
</script>

<style>

</style>
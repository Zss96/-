<template>
  <div class="evaluate">
        <Top :member_id="member_id"/>
         <div class="other">
           <el-form ref='from' :model = "evaluating" label-width="100px">
              <el-form-item label="外观评价">
                <el-rate v-model="evaluating.appearancestar"></el-rate>
              </el-form-item>
              <el-form-item label="音质评价">
                <el-rate v-model="evaluating.tunestar"></el-rate>
              </el-form-item>
              <el-form-item label="价格评价">
                <el-rate v-model="evaluating.pricestar"></el-rate>
              </el-form-item>
              <el-form-item label="总体评价">
                <el-rate v-model="evaluating.allstar"></el-rate>
              </el-form-item>
              <el-form-item label="其他评价">
                <el-input type="textarea" v-model="evaluating.say" placeholder="请输入评价"></el-input>
              </el-form-item>
           </el-form> 
           <el-form label-width="100px">
              <el-form-item label="添加图片">
                <el-upload  :action="uploadsImgurl"
                  ref="banners"
                  list-type="picture-card" :limit="5"
                  :on-preview="Preview"
                  :on-remove="Remove"
                  :on-success="success"
                  :on-change="Change"
                  :file-list="fileList"
                  :class ='{hide:hide}'>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
          </el-form>
         </div>
         <div>  <el-button @click="keep">发布</el-button></div>

  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
export default {
    name: 'evaluate',
     data(){
        return{
             member_id: '',
             order_id: NaN,
             evaluating:{
              star: null,
              say: '',
             },

             uploadsImgurl: '',
             dialogImageUrl: '',
              dialogVisible: false,
              fileList: [],
              goodsbannersurl: '',
              hide: false,
               delImgs: [],
               addImgs: []
        }
    },
    components: {
        Top
    },
    methods: {
      getGoods(){

      },
        success(res,file,fileList){
         console.log(res)
         console.log(fileList)
         this.fileList = fileList
        this.addImgs.push(file.response.url)
      },
     Remove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
        this.hide= false;
        console.log(fileList)
        console.log(file)
        let  status = 1;
        this.delImgs.push(file.response.url)
        this.delImg()
      },
    Preview(file,fileList) {
         console.log(file, fileList);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file)
      },
      Change(file,fileList){
        console.log(file, fileList);
        if(fileList.length>=5){
            this.uploadBanners = true;
        }
      },
       delImg(addImgs) {
         let data={
          delImgs : addImgs||this.delImgs
        },
        that = this;
        return http('uploads/delImg',data,'get').then(res=>{
          console.log(res.data.code)
         
        })
      },
      keep(){
        let fileList = this.fileList,
            evaluating = this.evaluating,
            evaluatimg = '';
         if(fileList.length>0){
                for(let i= 0;i<fileList.length; i++){
                  evaluatimg += fileList[i].name+','+fileList[i].uid+','+fileList[i].response.url+';'
                }
              }
            evaluating.evaluatimg = evaluatimg;
            evaluating.order_id = this.order_id;
        return http('member/goodscomment', evaluating,'post').then(res=>{
          console.log(res)
          if(res.data.code==1){
            this.$router.go(-1)
          }
        })
      }
    },
      created(){
        const {carts_id,member_id,order_id} = this.$route.query;
        console.log(order_id)
        this.carts_id = carts_id;
        this.member_id = member_id;
        this.order_id = order_id
        this.uploadsImgurl = reqUrl+"/uploads/Img";
    }
}
</script>

<style>

</style>
<template>
  <div class="uploadimg">
      <el-upload :action="reqUrl+'/uploads/Img'"
          ref="banners"
          list-type="picture-card" :limit="5"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="successImg"
          :on-change="bannerChange"
          :file-list="fileList"
          :class ='{hide:uploadBanners}'>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
  </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'uploadimg',
    data(){
        return {
            uploadsImgurl: '',
            uploadBanners: false,
            dialogVisible: false,
            dialogImageUrl: '',
        }
    },
    props: {
      fileList: {
        type: Array,
        defalut() {
          return[] 
        }
      }
    },
    methods: {
        successImg(res,file,fileList){
         console.log(res)
         console.log(fileList)
         this.$emit('addimg',fileList)
       },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.uploadBanners = false;
        this.$emit('removeimg',fileList,file)
      },
      handlePictureCardPreview(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file)
      },
      bannerChange(file,fileList){
        if(fileList.length>=5){
            this.uploadBanners = true;
        }
      },

    },
}
</script>

<style>

</style>
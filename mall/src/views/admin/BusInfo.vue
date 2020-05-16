<template>
  <div class="businfo">
    <Top :shop_id = "shop_id"/>
    <div class="other">
    <!-- <div class="top">
        <div>
          <span class="title">耳机发烧友</span>
          <span class="name">商家中心</span>
        </div>
        <div class="logo">
          <h3>添加商家信息</h3>
        </div>
    </div> -->
    <el-form :inline="true" label-width="100px">
        <el-form-item label="店铺名">
          <el-input v-model="shopname" placeholder="请输入店铺名"></el-input>
        </el-form-item>
         <el-form-item label="负责人">
          <el-input v-model="controller" placeholder="请输入负责人姓名"></el-input>
        </el-form-item>
         <el-form-item label="负责人电话">
          <el-input v-model="phone" placeholder="请输入负责人电话"></el-input>
        </el-form-item>
    </el-form>
    <el-form label-width="100px">
       <el-form-item label="店铺简介">
         <el-col :span="22">
            <el-input 
            type="textarea"  placeholder="请输入内容"
            v-model="shopintro">
          </el-input>
         </el-col>
        </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="店铺轮播图">
        <el-upload :action="uploadsImgurl"
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
      </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="店铺logo">
        <el-upload :action="uploadsImgurl"
          ref="logo"
          list-type="picture-card" :limit="1"
          :on-preview="handlePictureCardPreviewLogo"
          :on-remove="handleRemoveLogo"
          :on-success="successLogo"
          :on-change="logoChange"
          :file-list="fileLogo"
          :class ='{hide:uploadLogo}'>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibleLogo">
          <img width="100%" :src="dialogImageUrlLogo" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="店铺海报">
        <Uploadimg :fileList="fileindex" @addimg="addImg" @removeimg="removeImg"></Uploadimg>
      </el-form-item>
    </el-form>
      <el-button type="primary" @click="keep">提交</el-button>
      <el-button type="danger" @click="cancel">取消</el-button>
    </div>
  </div>

  
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Uploadimg from '../../components/uploadimg'
import Top from '../../components/ShopTop'
export default {
    name: 'businfo',
    components: {
      Uploadimg,
      Top
    },
    data(){
      return{
        shopname: '',
        controller: '',
        phone: '',
        shopintro: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogImageUrlLogo: '',
        dialogVisibleLogo: false,
        shop_id: NaN,
        logourl: '',
        bannersurl: '',
        fileList:[],
        fileLogo: [],
        uploadBanners: false,
        uploadLogo: false,
        delImgs: [],
        addImgs:[],

        fileindex: []
      }
    },
     methods: {
       successImg(res,file,fileList){
         console.log(res)
         console.log(fileList)
         this.fileList = fileList
         this.addImgs.push(file.response.url)
       },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
        this.uploadBanners = false;
        console.log(fileList)
        console.log(file.response.url)
        let  status = 1;
        this.delImgs.push(file.response.url),
        console.log(this.delImgs)
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
      successLogo(res,file,fileLogo){
         console.log(res)
         console.log(fileLogo)
         this.fileLogo = fileLogo
        this.addImgs.push(file.response.url)
      },
      handleRemoveLogo(file, fileLogo) {
        console.log(file, fileLogo);
        this.fileLogo = fileLogo
        this.uploadLogo = false;
        let  status = 2;
        this.delImgs.push(file.response.url)
      },
      handlePictureCardPreviewLogo(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = false;
      },
      logoChange(file,fileLogo){
        if(fileLogo.length>=1){
            this.uploadLogo = true;
        }
      },
      getShopInfo() {
        let that = this, 
            data={
              shop_id: this.shop_id
            }
         return http('admin/shopInfo',data,'get').then(res=>{
              console.log(res)
              let data = res.data.data,
                  url = '';
              that.shopname = data.shop_name
              that.controller=data.controller
              that.phone=data.phone
              that.shopintro=data.shopintro
              console.log(data)
             if(data.logo != ''){
               console.log(111)
                that.uploadLogo = true;
                that.fileLogo.push({
                url:reqUrl+data.logo,
                response: {
                  url: data.logo
                }
              })
             }
             if(data.poster != ''){
                that.fileindex.push({
                url:reqUrl+data.poster,
                response: {
                  url: data.poster
                }
              })
             }
             if(res.data.banners==undefined){
               return;
             }
             console.log(res.data.banners)
              if(res.data.banners.length>=5){
                  that.uploadBanners = true;
              }
              res.data.banners.forEach(item => {
                  url = reqUrl+item.url
                  that.fileList.push({
                      'url': url,
                      'name': item.name,
                      'id': item.uid,
                       response: {
                          url: item.url
                      }
                  })
        
              })
         })
      },
      cancel(){
        let addImgs = this.addImgs;
        if(addImgs.length>0){
          this.delImg(addImgs)
        }
       this.$router.go(-1);
      },
      addImg(fileList){
         console.log(fileList)
        this.fileindex = this.fileindex.concat(fileList)
        this.addImgs.push(fileList[0].response.url)
        console.log(this.fileindex)
      },
      removeImg(fileList,file){
        console.log(fileList,file)
        this.fileindex = fileList
        this.delImgs.push(file.response.url)
      },
      keep() {
        let   that = this,
              shop_id = this.shop_id,
              shopname = this.shopname,
              controller = this.controller,
              phone= this.phone,
              shopintro = this.shopintro,
              fileList =this.fileList,
              fileindex = this.fileindex,
              logo='',
              poster='',
              fileUrl = [];
              if(this.fileLogo.length>0){
                logo=this.fileLogo[0].response.url
              }
              if(this.fileindex.length>0){
                poster=this.fileindex[0].response.url
              }
              console.log(fileList)
              if(fileList.length>0){
                for(let i= 0;i<fileList.length; i++){
                  fileUrl += fileList[i].name+','+fileList[i].uid+','+fileList[i].response.url+';'
                }
            } 
            let  data = {
                shop_id,
                shopname,
                controller,
                phone,
                shopintro,
                fileUrl,
                logo,
                poster
              };
        if(this.delImgs.length>0){
          this.delImg();
        }
        return http('admin/addShopInfo',data,'post').then(res=>{
          if(res.data.code == 1){
            that.$router.go(-1);
          }
        })
      },
      delImg(addImgs) {
         let data={
          delImgs : addImgs||this.delImgs
        },
        that = this;
        return http('uploads/delImg',data,'get').then(res=>{
          console.log(res.data.code)
         
        })
      }
     },
      created() {
       console.log(this.$route.query.shop_id)
        this.shop_id = this.$route.query.shop_id
        console.log(this.shop_id)
        this.uploadsImgurl = reqUrl+"/uploads/Img";
        this.getShopInfo()
      }
      
 
}
</script>

<style scoped>
  .top {
    display: flex;
    height: 40px;
    margin: 50px 0;
  }
  .top div {
    flex: 1;
  }
  .top .add {
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
  .hide .el-upload--picture-card {
    display: none!important;
}
</style>
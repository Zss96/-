<template>
  <div class="addgoods">
      <Top :shop_id = "shop_id"/>
    <div class="other">
      <!-- <div class="top">
        <div>  <span class="title">耳机发烧友</span>
        <span class="name">商家中心</span></div>
        <div class="logo">
          <img :src="logo">
          <span>{{shop_name}}中心</span>
        </div>
    </div> -->
      <el-form ref='from' :model = goods :inline="true" label-width="100px">
        <el-form-item label="产品名称">
          <el-input v-model="goods.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
          <el-form-item label="品牌">
          <el-input v-model="goods.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
          <el-form-item label="型号">
          <el-input v-model="goods.model" placeholder="请输入型号"></el-input>
        </el-form-item>
          <el-form-item label="耳机材质">
          <el-input v-model="goods.material" placeholder="请输入产品名称"></el-input>
        </el-form-item>
          <el-form-item label="颜色分类">
          <el-input v-model="goods.colour" placeholder="请输入颜色分类"></el-input>
        </el-form-item>
          <el-form-item label="耳机类别">
          <el-input v-model="goods.category" placeholder="请输入耳机类别"></el-input>
        </el-form-item>
          <el-form-item label="是否带麦">
          <el-input v-model="goods.wheat" placeholder="请选择"></el-input>
        </el-form-item>
         <el-form-item label="佩戴方式">
          <el-input v-model="goods.wear" placeholder="请输入佩戴方式"></el-input>
        </el-form-item>
        <el-form-item label="耳机类型">
          <el-input v-model="goods.type" placeholder="请输入耳机类型"></el-input>
        </el-form-item>
        <el-form-item label="阻抗">
          <el-input v-model="goods.impedance" placeholder="请输入阻抗"></el-input>
        </el-form-item>
         <el-form-item label="频响范围">
          <el-input v-model="goods.freq" placeholder="请输入频响范围"></el-input>
        </el-form-item>
        
        <el-form-item label="保修期">
          <el-input v-model="goods.warranty" placeholder="请输入保修期"></el-input>
        </el-form-item>

        <el-form-item label="原价格">
          <el-input v-model="goods.origin_price" placeholder="请输入原价格"></el-input>
        </el-form-item>
        
        <el-form-item label="现价格">
          <el-input v-model="goods.current_price" placeholder="请输入现价格"></el-input>
        </el-form-item>
        
         <el-form-item label="库存">
          <el-input v-model="goods.stock" placeholder="请输入负责人电话"></el-input>
        </el-form-item>
     </el-form>
    <el-form label-width="100px">
      <el-form-item label="商品轮播图">
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
      <el-form-item label="商品介绍图">
        <el-upload :action="uploadsImgurl"
          ref="goodsIntro"
          list-type="picture-card" :limit="5"
          :on-preview="IntroPictureCardPreview"
          :on-remove="IntroRemove"
          :on-success="successIntro"
          :on-change="IntroChange"
          :file-list="fileIntro"
          :class ='{hide:uploadIntros}'>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibleIntro">
          <img width="100%" :src="dialogImageUrlIntro" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>

     <el-button type="primary" @click="keep">提交</el-button>
      <el-button type="danger" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/ShopTop'
export default {
    name: 'addgoods',
        components: {
        Top
    },
    data(){
        return{
            shop_id: 0,
            shop_name: '',
            logo: '',
            goods: {
                name: '',
                brand: '',
                model: '',
                material: '',
                colour: '',
                category: '',
                wheat: '',
                wear: '',
                type: '',
                impedance: '',
                freq: '',
                warranty: '',
                origin_price: '',
                current_price: '',
                stock: '',
            },

            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            goodsbannersurl: '',
            uploadBanners: false,

            dialogImageUrlIntro: '',
            dialogVisibleIntro: false,
            fileIntro: [],
            goodsIntro: '',
            uploadIntros: false,
            delImgs: [],
            addImgs:[]
            
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
        console.log(file)
        let  status = 1;
        this.delImgs.push(file.response.url)
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
      successIntro(res,file,fileIntro){
         console.log(res)
         console.log(fileIntro)
         this.fileIntro = fileIntro
         this.addImgs.push(file.response.url)
      },
      IntroRemove(file, fileIntro) {
        console.log(file, fileIntro);
        this.fileIntro = fileIntro
        this.uploadIntros = false;
        console.log(fileIntro)
        console.log(file)
        let  status = 1;
        this.delImgs.push(file.response.url)
      },
      IntroPictureCardPreview(file,fileIntro) {
        this.dialogImageUrlIntro = file.url;
        this.dialogVisibleIntro = true;
        console.log(file)
      },
      IntroChange(file,fileIntro){
        if(fileIntro.length>=5){
            this.uploadIntros = true;
        }
      },
      keep() {
        let   that = this,
              goods = this.goods,
              fileUrl = [],
              infoUrl = '',
              banner = '',
              goods_id = this.goods_id,
              fileList= this.fileList,
              fileIntro = this.fileIntro;
               if(this.delImgs.length>0){
                this.delImg();
              }
              if(fileList.length>0){
                for(let i= 0;i<fileList.length; i++){
                  banner += fileList[i].name+','+fileList[i].uid+','+fileList[i].response.url+';'
                }
              }
           
            if(fileIntro.length>0){
              for(let i= 0;i<fileIntro.length; i++){
                infoUrl += fileIntro[i].name+','+fileIntro[i].uid+','+fileIntro[i].response.url+';'
              }
            }
            goods.banner=banner;
            goods.InfoUrl =infoUrl
            goods.shop_id =this.shop_id;
            goods.shop_name = this.shop_name;
            goods.goods_id = goods_id;
        return http('admin/addgoods',goods,'post',).then(res=>{
          if(res.data.code == 1){
          that.$router.go(-1);
          }

        })
      },
      cancel(){
        let addImgs = this.addImgs;
        this.delImg(addImgs)
       this.$router.go(-1);
      },
      getGoodsInfo() {
        let that = this, 
          data={
            goods_id: this.goods_id,
            status: 1
          },
          url = ''; 
        return http('admin/goodsInfo',data,'get').then(res=>{
          console.log(res)
            console.log(res.data)
            let data = res.data
            that.goods = data.data[0]
            if(data.banners.length>=5){
              that.uploadBanners =true;
            }
            data.banners.forEach(item => {
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
            if(data.infos.length>=5){
              that.uploadIntro =true;
            }
            data.infos.forEach(item => {
                  url = reqUrl+item.url
                  that.fileIntro.push({
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
        this.shop_id = this.$route.query.shop_id
        this.shop_name = this.$route.query.shop_name
        this.logo = this.$route.query.logo
        this.goods_id = this.$route.query.goods_id
        this.uploadsImgurl = reqUrl+"/uploads/Img";
        if(this.goods_id!=undefined){
        this.getGoodsInfo()
        }
        console.log(this.goods_id)

    }
}
</script>

<style scoped>  
    .top {
    display: flex;
    height: 40px;
  }
  .top div {
    flex: 1;
  }
 .right {
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

</style>
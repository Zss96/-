<template>
  <div class="admingood">
    <!-- <div class="top">
        <div>   <span class="title">耳机发烧友</span>
        <span class="name">管理者中心</span></div>
        <div class="logo">
           <span>{{goodsInfo.name}}商品</span>
        </div>
    </div> -->
    <Top :type="type" :admin_id="admin_id"/>
    <div class="banner">
         <el-carousel :interval="4000" arrow="always">
            <el-carousel-item v-for="(item,index) in banners" :key="index">
              <img :src="reqUrl+item.url" alt=""  style="width: 500px;height: 300px">
            </el-carousel-item>
          </el-carousel>
    </div>
    <div class="other">
      <div class="other-info">
         <h3>商品参数</h3>
         <div class="info">
            <div class="info-item">商品名称：{{goodsInfo.name}}</div>
            <div class="info-item">商品品牌：{{goodsInfo.brand}}</div>
            <div class="info-item">商品型号：{{goodsInfo.model}}</div>
            <div class="info-item">商品材质：{{goodsInfo.material}}</div>
            <div class="info-item">颜色分类：{{goodsInfo.colour}}</div>
            <div class="info-item">商品类别：{{goodsInfo.category}}</div>
            <div class="info-item">是否带麦：{{goodsInfo.wheat}}</div>
            <div class="info-item">佩戴方式：{{goodsInfo.wear}}</div>
            <div class="info-item">耳机类型：{{goodsInfo.type}}</div>
            <div class="info-item">耳机阻抗：{{goodsInfo.impedance}}</div>
            <div class="info-item">频响范围：{{goodsInfo.freq}}</div>
            <div class="info-item">保修日期：{{goodsInfo.warranty}}</div>
            <div class="info-item">原价格：{{goodsInfo.origin_price}}</div>
            <div class="info-item">现价格：{{goodsInfo.current_price}}</div>
            <div class="info-item">耳机库存：{{goodsInfo.stock}}</div>
         </div>
    </div>
    <div class="evaluate">
        <h3>专业评测</h3>
        <el-form ref='from' :model = goods  label-width="100px">
            <el-form-item label="预估价格">
                <el-input v-model="goods.future_price" placeholder="请输入预估价格" :disabled="goodsInfo.future_price!=null"></el-input>
            </el-form-item>
            <el-form-item label="专业评价">
              <el-input v-model="goods.evaluating" placeholder="请输入专业评价" type="textarea" :disabled="goodsInfo.evaluating!=null" ></el-input>
            </el-form-item>
            <el-form-item label="推荐标题">
              <el-input v-model="goods.push_title" placeholder="请输入专业评价" type="textarea" ></el-input>
            </el-form-item>
            <el-form-item label="推荐图片">
              <Uploadimg :fileList="fileindex" @addimg="addImg" @removeimg="removeImg"></Uploadimg>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="keep">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Uploadimg from '../../components/uploadimg'
import Top from '../../components/AdminTop'
export default {
    name: 'admingood',
      components: {
        Uploadimg,
        Top
    },
    data(){
        return{
            admin_id: '',
            goods_id: 0,
            banners: [],
            goodsInfo: [],
            goods: {
                future_price: '',
                evaluating: '',
                push_title: ''
            },

            fileindex: [],
            push: 0,
            addImgs: [],
            delImgs: [],
            type: 1
        }
    },
    methods: {
        getGoods(){
            console.log(this.goods_id)
           let that = this, 
            data={
              goods_id: this.goods_id
            }
            return http('admin/searchgoodsinfo',data,'get').then(res=>{
                console.log(res)
                that.goodsInfo = res.data.data;
                that.banners = res.data.banners;
                that.goods.future_price = res.data.data.future_price;
                that.goods.evaluating = res.data.data.evaluating;
                that.goods.push_title = res.data.data.push_title
                if(res.data.data.push_img != null&&res.data.data.push_img!=''){
                that.fileindex.push({
                url:reqUrl+res.data.data.push_img,
                response: {
                  url: res.data.data.push_img
                }
              })
             }
            })
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
        cancel(){
            let addImgs = this.addImgs;
        if(addImgs.length>0){
          this.delImg(addImgs)
        }
       this.$router.go(-1);
        },
        keep(){
            let that = this, 
            fileindex = this.fileindex,
            pushimg = '',
            push = this.push,
            goods = this.goods;
            goods.status=1;
            goods.goods_id = this.goods_id;
            if(this.fileindex.length>0){
                pushimg=this.fileindex[0].response.url
              }
              if(push==undefined){
                  push = 0
              }
              goods.pushimg = pushimg;
              goods.push_status = push;
            return http('admin/evaluatgoods',goods,'post').then(res=>{
                console.log(res)
                console.log(res.data.code)
                if(res.data.code==1){
                    that.$router.go(-1);
                }
                  
            })
        }
    },
    created(){ 
        this.admin_id = this.$route.query.admin_id
        this.goods_id = this.$route.query.goods_id
        this.push = this.$route.query.push
        this.getGoods();

    }

}
</script>

<style scoped>
  /* .top {
    display: flex;
    height: 40px;
  }
  .top div {
    flex: 1;
  } */
 .right {
    text-align: right;
  }
  .right button {
    border: none;
    background-color: #0b8dd8;
    color: #Fff;
    display: inline-block;
    width: 100px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
    padding: 0 10px;
  }
  .right .addgoods {
    height: 30px;
    text-align: center;
    border-radius: 10px;
    padding: 0 10px;
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
  .banner {
    height: 300px;
    width: 500px;
    margin: 0 auto;
  }
  .other-info h3,
  .evaluate h3 {
      margin-bottom: 20px;
  }
  .info {
      display: flex;
      flex-wrap: wrap;
  }
  .info-item {
      width: 200px;
      
  }
   .evaluate {
       margin-top: 20px;
   }

</style>
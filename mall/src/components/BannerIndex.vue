<template>
  <div class="bannerindex">
        <el-carousel :height="imgheight+'px'" :interval="4000">
            <el-carousel-item  v-for="(item,index) in banners" :key="index">
                 <!-- <el-image ref="imgheight"
                    :src="reqUrl+item.poster"
                    fit="fit"
                    class="bannerurl"
                    @click="goToshops(item.shop_id)" @load="imgload">
                  </el-image> -->
                  <img v-if="item.poster" ref="imgheight" :src="reqUrl+item.poster" alt="" @click="goToshops(item.shop_id)"  @load="imgLoad" style="width: 100%;max-height:680px;">
            </el-carousel-item>
        </el-carousel>
  </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'bannerindex',
    data(){
      return{
        imgheight: 680
      }
    },
    props: {
        banners: {
            type: Array,
            default(){
                return []
            }
        },
        member_id:{
            type: String,
            default: '0'
        }
    },
    methods: {
        goToshops(shop_id){
            let query = {
                shop_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'shopdetail',query:query})  
        },
         imgLoad(){
                this.$nextTick(()=>{
                  if(this.banners.length>0){
                      this.imgheight=this.$refs.imgheight[0].height;
                  }

                     // document.getElementsByClassName拿到的是数组并非某一个对象
                    // var testH=document.getElementById("test-div");
                    // testH.style.height= this.imgheight+"px";
                })
            }
    },
     mounted(){
            this.imgLoad();
            window.onresize =() => {
                this.imgLoad();
            }
      },
      destroyed(){
        window.onresize = null;
      
      }

}
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 427px;
        margin: 0;
    }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__container {
    height: 680px;
  }

</style>
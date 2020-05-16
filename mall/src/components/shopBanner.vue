.<template>
  <div class="shopbanner">
      <el-carousel :interval="4000" type="card">
            <el-carousel-item  v-for="(item,index) in banners" :key="index" indicator-position="outside">
                 <el-image
                    style="width: 512px; height: 300px"
                    :src="reqUrl+item.url"
                    fit="fit"
                    class="bannerurl">
                </el-image>
            </el-carousel-item>
        </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'shopbanner',
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
          goToGoods(goods_id){
            let query = {
                goods_id,
                member_id :this.member_id
            }
             this.$router.push({name: 'goodsdetail',query:query})  
        },
    }
}

</script>

<style scoped>
    .shopbanner {
        margin-top: 20px;
    }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }


  .bannerurl {
      border: 1px solid #ccc;
  }
</style>
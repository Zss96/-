<template>
  <div class="searchres">
      <Top :member_id="member_id" class="top"/>
      <div class="other">
          <Goods :goods="goods" :member_id="member_id"/>
          <div class="shops">
              <div class="shop" v-for="(item ,index) in shops" :key="index">
                  <div class="shop-item-top">
                    <img :src="reqUrl+item.logo" alt="">
                </div>
                <div class="shop-item-info">
                    <p>{{item.shop_name}}</p>
                    <p class="star"><i class="el-icon-star-on"></i>{{item.star}}</p>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Goods from '../../components/Goods'
import Top from '../../components/Top'
export default {
    name: 'search',
    components: {
        Goods,
        Top,
    },
    data(){
        return{
            member_id: 0,
            searchval: '',
            goods: [],
            shops: [],   
        }
    },
    methods: {
        getsearch(){
            let data = {
              searchval : this.searchval 
            }
            return http('member/search',data,'get').then(res=>{
                console.log(res)
                this.goods = res.data.goods
                this.shops = res.data.shops
            })
        }
    },
    created(){
        this.member_id = this.$route.query.member_id
        this.searchval = this.$route.query.searchval
        this.getsearch()
    }

}
</script>

<style scoped>
    .goods {
        margin-top: 40px;
    }
    .shop {
        width: 150px;
        height: 150px;
        border: 1px solid #999;
        text-align: center;
        margin-left: 10px;
        margin-top: 40px;

    }
    .shop img {
        width: 130px;
        height: 100px;
    }
    .star {
       color: #999;
    }
</style>
<template>
     <div class="goods">
            <div class="goods-item" v-for="(item,index) in goods" :key="index" @click="goToGoods(item.goods_id)">
                <div class="goods-item-top">
                    <img :src="reqUrl+item.url" alt="">
                </div>
                <div class="goods-item-info">
                    <p>{{item.name}}</p>
                    <p class="price">{{item.current_price}}<span>{{item.origin_price}}</span></p>
                    <p class="star">
                        <i class="el-icon-star-on">{{item.star}} </i>
                        <i class="el-icon-shopping-bag-1">{{item.buyNum}}</i>
                    </p>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:'goods',
       props: {
          goods:{
            type: Array,
            default(){
              return []
            }
          },
            member_id:{
                type: String,
                default:0
            },
      },
      methods:{
        goToGoods(goods_id){
            // console.log(goods_id+'===='+this.member_id)
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
      .goods {
        display: flex;
        flex-wrap: wrap;
    }
    .goods-item {
        height: 270px;
        border: 1px solid #999;
        margin-left: 10px;
        box-shadow: 10px 10px 5px #888888;
    }
    .goods-item-top img{
        width: 200px;
        height: 180px;
    }
    .goods-item-info p{
        width: 200px;
        margin: 5px 0; 
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .price {
        color: red;
    }
    .price span {
        color: #999;
        text-decoration: line-through;
    }
    .star {
       color: #999;
    }
</style>
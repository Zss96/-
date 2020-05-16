<template>
  <div class="goodslist">
    <Top :member_id="member_id" @type="type"/>
    <div class="goodstype">
        <div :class="goodstype==1?'head':'ear'">
            <div class="title">
                <h1 v-if="goodstype==1">头戴式耳机</h1>
                <h1 v-else>入耳式耳机</h1>
            </div>
        </div>
    </div>
    <div class="other">
        <Goods :goods="goods" :member_id="member_id"/>
    </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Goods from '../../components/Goods'
export default {
    name: 'goodslist',
    components: {
        Top,
        Goods
    },
    data(){
        return{
            member_id: NaN,
            goodstype: 1,
            goods: []
        }
    },
    methods: {
        getgoods(){
            let data = {
                type: this.goodstype
            }
            return http('member/gettype/goods',data,'get').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    this.goods= res.data.goods
                }

            })
        },
        type(type){
            if(this.getgoods!==type){
                this.goodstype = type
                this.getgoods()
            }

        }
    },
    created(){
      this.member_id = this.$route.query.member_id 
      this.goodstype =  this.$route.query.goodstype
      this.getgoods()
    },
}
</script>

<style scoped>
    .goodstype>div{
        min-height: 405px;
        padding: 0;
    }
    .head {
        background: url('../../assets/head.jpg') no-repeat;
        background-size: 100% 100%;
    }
     .ear {
        background: url('../../assets/ear.jpg') no-repeat;
         background-size: 100% 100%;
    }
    .title {
        line-height: 372px;
        text-align: center;
    }
    h1 {
        color: #fff;
        font-size: 70px;
    }
    .other {
        padding: 20px 0;
    }
</style>
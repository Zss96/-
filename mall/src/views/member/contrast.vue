<template>
  <div class="contrast">
      <Top :member_id="member_id"/>
      <div class="other">
        <div class="left">
            <div class="other-top"> 
                <el-form :inline="true">
                    <el-input placeholder="请输入内容" style="width: 88%" v-model="searchval.left" @input="inputTip(true)">
                        <el-button slot="append" icon="el-icon-search" @click="getGoods(item.goods_id,index,true)"></el-button>
                    </el-input>
                    <el-button icon="el-icon-close" circle style="margin-left:10px" @click="closeSearch(true)"></el-button>
                </el-form>
                <ul v-if="isshowleft">
                        <li v-for="(item,index) in searchres" :key="index">
                            <div class="searchname" v-if="item.isgoods==1" @click="getGoods(item.goods_id,index,true)">{{item.name}}</div>
                        </li>
                </ul>
                
                        
                <!-- <div class="goods" v-if="left.goods_id">
                    <el-image v-if="left.url"
                    style="width: 88%; height: 300px"
                    :src="reqUrl+left.url"
                    fit="fill"></el-image>
                    <div>{{left.name}}</div>
                    <div>当前价格：{{left.current_price}}</div>
                    <div>专家价格：{{left.future_price}}</div>
                    <div>专业评测：{{left.evaluating}}</div>
               
                    <div class="goods-info">外观<el-rate v-model="left.appearancestar" disabled></el-rate></div>
                    <div class="goods-info">音质：<el-rate v-model="left.tunestar" disabled ></el-rate></div>
                    <div class="goods-info">价格：<el-rate v-model="left.pricestar" disabled ></el-rate></div>
                    <div class="goods-info">总体：<el-rate v-model="left.star" disabled ></el-rate></div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">外观评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badappearance/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midappearance/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodappearance/left.count*100" status="exception"></el-progress></div>
                        </div>
                        
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">价格评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badstar/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midstar/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodstar/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">音质评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badtune/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midtune/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodtune/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="goods-info ratio">
                        <div class="ratio-title">总体评价</div>
                        <div class="ratio-item">
                            <div>差评<el-progress :text-inside="true" :stroke-width="26" :percentage="left.badstar/left.count*100"></el-progress></div>
                            <div>中评<el-progress :text-inside="true" :stroke-width="22" :percentage="left.midstar/left.count*100" status="warning"></el-progress></div>
                            <div>好评<el-progress :text-inside="true" :stroke-width="20" :percentage="left.goodstar/left.count*100" status="exception"></el-progress></div>
                        </div>
                    </div>
                    <div class="btn">
                        <el-button type="primary" round @click="joinCart">加入购物车</el-button>
                        <el-button type="danger" round @click="buy">立即购买</el-button>
                    </div>
                </div> -->
                <Goodspk  :left="left" :member_id="member_id"/>
            </div>
        </div>
        <div class="right">
              <div class="other-top">
                  <el-form :inline="true">
                    <el-input placeholder="请输入内容" style="width: 88%" v-model="searchval.right" @input="inputTip(false)">
                        <el-button slot="append" icon="el-icon-search" @click="getGoods(item.goods_id,index,false)"></el-button>
                    </el-input>
                    <el-button icon="el-icon-close" circle style="margin-left:10px" @click="closeSearch(false)"></el-button>
                </el-form>
                <ul v-if="isshowright">
                        <li v-for="(item,index) in searchres" :key="index">
                            <div class="searchname" v-if="item.isgoods==1" @click="getGoods(item.goods_id,index,false)">{{item.name}}</div>
                        </li>
                </ul>
                 <Goodspk  :left="right" :member_id="member_id"/>
              </div>
        </div>
      </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Goodspk from '../../components/GoodsPk'
export default {
    name: 'contrast',
    components: {
        Top,
        Goodspk   
    },
    data(){
        return{
            member_id: 0,
            goods_id: 0,
            searchval: {
                left: '',
                right: ''
            },
            isshowleft: false,
            isshowright: false,
            searchres: [],
            left: {},
            right: {}, 
        }
    },
    methods: {
        closeSearch(isleft){
            if(isleft){
                this.left = {},
                this.searchval.left=' '
            }else {
                this.right = {}
                this.searchval.right =' '
            }
        },
        // closeList(isleft){
        //     if(isleft){
        //             this.isshowleft = false;
        //         }else {
        //             this.isshowright = false;
        //         }
        // },
        inputTip(isleft){
            console.log(111)
            let searchval= '';
            if(isleft){
                searchval=this.searchval.left
            }else {
                searchval=this.searchval.right 
            }
            let data={
                searchval
            }
            return http('/member/search',data,'get').then(res=>{
                 if(isleft){
                    this.isshowleft = true;
                }else {
                     this.isshowright = true;
                }
                this.searchres = res.data.result
            })
               console.log(this.searchval)
        },
        getGoods(goods_id,index,isleft){
            let searchres = this.searchres,
                searchval = this.searchval,
                data = {
                    goods_id
                };
           if(index!=-1){
                if(isleft){
                    searchval.left = searchres[index].name;
                }else {
                    searchval.right = searchres[index].name;
                }
           }
            this.searchval = searchval;
            this.isshowSearch = false;
            return http('member/getgoods/Detail',data,'get').then(res=>{
                let avgdata = res.data.avgdata
                if(isleft){
                    this.left = {...searchres[index],...avgdata}
                    this.isshowleft = false;
                }else {
                    this.right = {...searchres[index],...avgdata}
                    this.isshowright = false;
                }
                if(index==-1){
                        this.left = {...searchres,...avgdata}
                }
                console.log(this.left)
            })

        },
        getGoodsId(goods_id){
            let data = {
                goods_id
            }
            return http('admin/searchgoodsinfo',data,'get').then(res=>{
               this.searchres = res.data.data
               console.log(this.searchres)
                this.getGoods(goods_id,-1,true)
            })
        }
    },
    created(){
        this.member_id = this.$route.query.member_id
        this.goods_id = this.$route.query.goods_id
        console.log(this.goods_id)
        if(this.goods_id!=undefined){
           this.getGoodsId(this.goods_id)
        }
    }
}
</script>

<style scoped>
    .other {
        display: flex;
        margin-top: 20px;
        /* height: 800px; */
        border: 1px solid #ccc;
    }
    .other div {
        flex: 1;
    }
    .left {
        border-right: 1px solid #999;
    }
     .other-top {
        padding: 20px;
    }
     .other-top ul{
           width: 88%;
           padding: 0 16px;
           font-size: 16px;
           background-color: #242424;
           color: #fff;
       }
       .search  li{
           display: flex;
           line-height: 28px;
           border-bottom: 1px solid #999;
       }
       
</style>
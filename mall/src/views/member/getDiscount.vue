<template>
  <div class="getdiscount">
      <Top :member_id="member_id"/>
        <div class="other">
            <div class="subject">
        <h3>题目({{discountInfo.counter}})</h3>
       <div class="sub-item" v-for="(item,index) in subjects" :Key="index">
            <h4 class="sub-title">第{{index+1}}题、{{item.title}}</h4>
           <div class="sel">
                <div>A:{{item.A}}</div>
                <div>B:{{item.B}}</div>
                <div>C:{{item.B}}</div>
                <div>D:{{item.D}}</div>
                <el-input style="width:300px;margin:10px 0;" v-model="answer[index]" placeholder="请输入答案"> <template slot="prepend">答案</template></el-input>  
           </div>
       </div>
        <div class="buttom"> <el-button type="text" @click="subAnswer">提交</el-button></div>
    </div>
        </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
export default {
    name: 'getdiscount',
    data(){
        return{
            member_id: NaN,
            shop_id: NaN,
            discountInfo:{},
            subjects: [],
            answer: []
        }
    },
    components:{
        Top
    },
    methods: {
        getDisInfo(){
            let that = this,
                data = {
                    shop_id: this.shop_id
                };
            return http('admin/getdiscount',data,'get').then(res=>{
                that.discountInfo = res.data.data[0]
                console.log(res)
                that.getSub()
                // this.answer = new Array(res.data.data[0].counter)
            }) 
        },
        getSub(){
            let that= this,
                data = {
                    counter:this.discountInfo.counter,
                     shop_id: this.shop_id
                }
            return http('member/getsub',data,'get').then(res=>{
                console.log(res)
                that.subjects = res.data.data
            })
        },
        subAnswer(){
            console.log(this.answer)
            console.log(this.subjects)
            let that = this,
                answer = this.answer,
                subjects = this.subjects,
                counter = this.discountInfo.counter,
                right = 0;
                console.log(counter)
            for(let i=0;i<counter;i++){
                console.log(answer[i])
                if(answer[i]==undefined){
                    this.$message.error('请输入第'+(i+1)+'答案');
                    return;
                }
            }
            for(let i = 0; i<counter;i++){
                if(answer[i].toUpperCase()==subjects[i].answer){
                    right++
                }
            }
            let acc = (right/counter).toFixed(1),
                discount = 0;
            console.log(acc)
            if(acc==1){
                discount=this.discountInfo.onehandred
            }else if(acc>0.9){
                discount=this.discountInfo.excellent
            }else if(acc>0.8){ 
                discount=this.discountInfo.good
            }else if(acc>0.6){
                discount=this.discountInfo.pass
            }else{
                discount=this.discountInfo.fail
            }
            let data={
                discount,
                member_id: this.member_id,
                shop_id: this.shop_id
            }
            return http('member/discount',data,'post').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    that.$alert('获得'+discount+'折优惠价', '恭喜你', {
                    confirmButtonText: '确定',
                    callback: action => {
                        that.$router.go(-1);
                    }
                });
                }
            })
            
        }
    },
    created(){
        console.log(this.$route.query)
        this.member_id = this.$route.query.member_id;
        this.shop_id = this.$route.query.shop_id;
        console.log(this.shop_id)
        this.getDisInfo()
    }
}
</script>

<style scoped>
    .subject h3 {
        margin: 20px 0;
    }
    .subject h4 {
        margin: 10px 30px;
    }
    .sel {
        margin: 4px 50px;
    }
    .buttom {
        text-align: center;
        margin-top: 50px;
    }
</style>
<template>
  <div class="sharedetail">
      <Top :member_id="member_id"/>
      <div class="other">
           <Sharelist :share ="share" :member_id="member_id" @getshare="getshare" :detail="true" class="sharelist"></Sharelist>
           <div class="comment">
               <div class="comment-title" v-if="total!=0">
                    <h4><span>{{total}}个回答</span></h4>
                </div>
               <div class="comment-item" v-for="(item,index) in comments" :key="index">
                   <div class="user-name">{{item.user}}</div>
                   <div v-html="item.answer"></div>
                    <div class="bottom">
                        <el-button type="primary">
                            <i class="el-icon-caret-top" @click="agree(1,item.answer_id)"></i>
                            赞同&nbsp;{{item.agree}}
                            <i class="el-icon-caret-bottom" @click="agree(0,item.answer_id)"></i>
                         </el-button>
                        <el-button type="info" class="el-icon-chat-round" @click="showedit(index,item.answer_id)">评论</el-button>
                        <el-button :type="item.follow==0?'info':'warning'" icon="el-icon-star-off" circle @click="fllow(item.answer_id)" ></el-button>
                    </div>
                    <div class="reply" v-if="index==showindex">
                        <el-form :inline="true">
                            <el-input placeholder="请输入内容" style="width: 90%" v-model="replyval"></el-input>
                            <el-button  @click="sendReply(item.answer_id)">发布</el-button>
                        </el-form>
                        <div class="comment-title" v-if="total!=0">
                            <h4><span>{{retotal}}个回答</span></h4>
                        </div>
                        <div class="reply-item" v-for="(ritem,rindex) in replys" :key="rindex">
                            <div class="user-name">{{ritem.user}}</div>
                            <div>{{ritem.reply_comment}}</div>
                        </div>
                    </div>
               </div>
           </div>
           
      </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Sharelist from '../../components/shareList'
export default {
    name:'sharedetail',
    components: {
        Top,
        Sharelist
    },
    data(){
        return{
            member_id: '',
            share_id: 0,
            share: [],
            comments: [],
            total: 0,
            replyval: '',
            showindex: -1,
            replys: [],
            retotal: 0
        }
    },
    methods: {
        getshare(type){
            let data = {
              member_id: this.member_id,
              share_id: this.share_id
            };
            return http('member/getshare',data,'get').then(res=>{
                this.share = res.data.data
            })
        },
        getanswer(){
            let data = {
                share_id: this.share_id
            }
            return http('member/share/answer',data,'get').then(res=>{
                this.comments = res.data.data,
                this.total = res.data.total
            })
        },
        agree(status,answer_id){
            let data = {
                member_id : this.member_id,
                answer_id,
                status
            }
            return http('member/share/reply/agree',data,'post').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    // // this.share = res.data.data
                    // this.$emit('getshare')
                    this.getanswer()
                    
                }else if(res.data.code==2){
                       this.$message({
                        message: res.data.msg,
                         type: 'warning'
                });
                }
            })
        },
        fllow(answer_id){
            let data = {
                member_id : this.member_id,
                answer_id,
            } 
            return http('member/share/answer/follow',data,'post').then(res=>{
                this.getanswer()
            })

        },
        showedit(index,answer_id){
            if(this.showindex==index){
                this.showindex=-1
            }else{
                this.showindex=index;
                this.getreply(answer_id)
            }
        },
        sendReply(answer_id){
            let data = {
                member_id: this.member_id,
                answer_id,
                replyval: this.replyval
            }
            return http('member/send/reply',data,'post').then(res=>{
                if(res.data.code==1){
                    this.replyval = '';
                    this.showindex = -1;
                }
            })
        },
        getreply(answer_id){
            let data = {
                answer_id
            }
            return http('member/share/getreply',data,'get').then(res=>{
                if(res.data.code==1){
                    this.replys = res.data.data
                    this.retotal = res.data.total
                }
            })
        }
        
    },
    created(){
      this.member_id = this.$route.query.member_id;
      this.share_id = this.$route.query.share_id;
      this.getshare()
      this.getanswer()
    }
}
</script>

<style scoped>
    .sharedetail {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #f6f6f6;
    }
    .sharelist,
    .comment-title,
    .comment-item {
        background-color: #fff;
    }
    .comment {
        margin-top: 24px;
       
    }
    .comment-title {
        line-height: 50px;
        border-bottom: 1px solid #f6f6f6;
    }
    .comment-title span {
        font-weight: 600;
    }
    .comment-item {
         border: 1px solid #f6f6f6;
         margin: 20px 0;
         padding: 20px;
    }
    .user-name {
        font-size: 15px;
        font-weight: 600;
        font-synthesis: style;
        color: #444;
        margin-bottom: 20px;
    }
    .bottom {
    text-align: right;
  }
  .share-item {
    /* position: relative; */
    padding: 20px;
    border-bottom: 1px solid #f0f2f7;
  }
  .anwser {
    min-height: 156px;
  }
  .reply {
    margin-top: 20px;
    padding: 20px 50px;
    border: 2px solid rgba(211, 208, 208, 0.65);
  }
</style>
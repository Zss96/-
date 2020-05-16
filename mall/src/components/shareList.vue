<template>
  <div class="sharelist">
      <div class="share-item"  v-for="(item,index) in share" :key="index">
        <div class="title" @click="toDetail(item.share_id)">{{item.title}}</div>
        <div class="content">
            <div class="content-item">
                {{item.user}}:{{item.content}}
            </div>
            <span @click="showImg">显示全部</span>
            <div class="img" v-if="detail">
                <div class="imgs" v-if="isshowimg">
                  <el-image v-for="(url,urlindex) in item.imgurl" :key="urlindex" :src="reqUrl+url.url"></el-image>
                </div>
            </div>
        </div>


        <div :class="detail?'':'bottom'">
            <el-button type="primary">
                <i class="el-icon-caret-top" @click="agree(1,item.share_id)"></i>
                赞同&nbsp;{{item.agree}}
                <i class="el-icon-caret-bottom" @click="agree(0,item.share_id)"></i>
            </el-button>
            <el-button type="info" class="el-icon-chat-round" @click="showedit(index)">评论</el-button>
            <el-button :type="item.follow==0?'info':'warning'" icon="el-icon-star-off" circle @click="fllow(item.share_id)" ></el-button>
        </div>
        <div class="anwser" v-if="index==showindex">
            <div class="edit_container">
                <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
               <div>
                   <el-button v-on:click="saveHtml($event,item.share_id)">发布</el-button>
                   <el-button @click="showedit(index)">取消</el-button>
                </div>
            </div>  
            
        </div> 
         
      </div>
  
  </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'sharelist',
    data(){
        return{
             content: ``,
            editorOption: {},
            showindex: -1,
            isshowimg: false
        }
    },
    props: {
        share:{
            type: Array,
            default(){
                return []
            }
        },
        member_id: {
            type: String,
            default: '0'
        },
        detail: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    methods: {
    //     getshare(){
    //     return http('member/getshare',{},'get').then(res=>{
    //       this.share = res.data.data
    //     })
    //   },
        agree(status,share_id){
            let data = {
                member_id : this.member_id,
                share_id,
                status
            }
            return http('member/share/agree',data,'post').then(res=>{
                console.log(res)
                if(res.data.code==1){
                    // this.share = res.data.data
                    this.$emit('getshare')
                    
                }else if(res.data.code==2){
                       this.$message({
                        message: res.data.msg,
                         type: 'warning'
                });
                }
            })
        },
        fllow(share_id){
            let data = {
                member_id : this.member_id,
                share_id,
            } 
            return http('member/share/follow',data,'post').then(res=>{
                console.log(res)
                this.$emit('getshare')
            })

        },
         onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
        saveHtml:function(event,id){
            let data = {
                share_id: id,
                member_id: this.member_id,
                content: this.content
            }
            return http('member/share/comment',data,'post').then(res=>{
                if(res.data.code==1){
                    this.content = ``;

                }
            })
        

        },
        showedit(index){
            if(this.showindex==index){
                this.showindex=-1
            }else{
                this.showindex=index;
            }
        },
        toDetail(share_id){
            let query = {
                    member_id : this.member_id,
                    share_id
                };
            this.$router.push({name: 'sharedetail',query:query})  
        },
        showImg(){
            this.isshowimg = !this.isshowimg;
        }
    },
    created(){
       
    }
}
</script>

<style scoped>
    .title {
      font-size: 18px;
      font-weight: 600;
          margin-top: 12px;
    margin-bottom: 4px;
    font-size: 22px;
    font-weight: 600;
    font-synthesis: style;
    line-height: 32px;
    color: #1a1a1a;
  }
  .content {
    font-size: 15px;
    /* max-height: 100px; */
    margin-top: 9px;
    overflow: hidden;
    color: #646464;
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
   /* .answer {
         display: flex;
    } */
  .edit_container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 10px;
        display: flex;
    }
    .edit_container .quill-editor{
       flex:7;
    }
    .edit_container div {
        flex: 1;
    }
   .content-item {
        display: inline-block;
        width: 879px;
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
        vertical-align: middle;
   }
   .content span {
       vertical-align: middle;
       margin-left: 10px;
   }
</style>
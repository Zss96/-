<template>
  <div class="share">
       <Top :member_id="member_id"/>
         <div class="other">
           <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新话题" name="first"> 
                <Sharelist :share ="newtopic" :member_id="member_id" @getshare="getshare(0)"></Sharelist>
            </el-tab-pane>
            <el-tab-pane label="我的话题" name="second"> 
                 <Sharelist :share ="mytopic" :member_id="member_id" @getshare="getshare(1)"></Sharelist>
                
            </el-tab-pane>
            <el-tab-pane label="我关注话题" name="third">            
                 <Sharelist :share ="followtopic" :member_id="member_id" @getshare="getshareabout(2)"></Sharelist>
            </el-tab-pane>
            <el-tab-pane label="我回复话题" name="fourth">
                 <Sharelist :share ="commenttopic" :member_id="member_id" @getshare="getshareabout(3)"></Sharelist>
            </el-tab-pane>
            <el-tab-pane label="创建话题" name="six">
               <div class="topic">
                    <el-form ref='from' :model = "topic" label-width="100px">
                       <el-form-item label="标题">
                            <el-input v-model="topic.title" placeholder="请输入话题标题"></el-input>
                        </el-form-item>
                        <el-form-item label="内容">
                            <el-input type="textarea" v-model="topic.content" placeholder="请输入话题内容"></el-input>
                        </el-form-item>
                    </el-form> <el-form label-width="100px">
                    <el-form-item label="添加图片">
                      <el-upload  :action="uploadsImgurl"
                        ref="banners"
                        list-type="picture-card" :limit="5"
                        :on-preview="Preview"
                        :on-remove="Remove"
                        :on-success="success"
                        :on-change="Change"
                        :file-list="fileList"
                        :class ='{hide:hide}'>
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </el-form-item>
                </el-form> 
                <div>  
                   <el-button type="primary" @click="keep">发布</el-button>
                  <el-button type="danger" @click="cancel">取消</el-button>
                </div>

               </div>
            </el-tab-pane>
        </el-tabs>
         </div>
  </div>
</template>

<script>
import {http,reqUrl} from '../../network/http'
import Top from '../../components/Top'
import Sharelist from '../../components/shareList'
export default {
    name: 'share',
    components: {
        Top,
        Sharelist
    },
    data(){
        return{
            member_id: NaN,
            activeName: 'first',
            topic:{
                title: '',
                content: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            goodsbannersurl: '',
            hide: false,
            uploadsImgurl: '',
            addImgs:[],
            delImgs:[],
            
            newtopic: [],
            mytopic: [],
            followtopic:[],
            commenttopic: []

        }   
    },
    methods: {
      handleClick(tab, event) {
            this.tabindex = tab.index 
       console.log(tab.index)
        if(tab.index<2){
            this.getshare(tab.index) 
        }else if(tab.index<4){
          this.getshareabout(tab.index)
        }
         
      },
      getshare(type){
        let data = {
          type,
          member_id: this.member_id
        };
        return http('member/getshare',data,'get').then(res=>{
          if(type == 0){
            this.newtopic = res.data.data
          }else {
            this.mytopic = res.data.data
          }
        })
      },
      getshareabout(type){
        let data = {
          type,
          member_id: this.member_id
        };
        return http('member/getshare/about',data,'get').then(res=>{
         if(type == 2){
            this.followtopic = res.data.data
          }else {
            this.commenttopic = res.data.data
          }
          
        })
      },
      success(res,file,fileList){
         console.log(res)
         console.log(file)
         console.log(fileList)
         this.fileList = fileList
        this.addImgs.push(file.response.url)
      },
      Preview(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file)
      },
      Remove(file, fileList) {
        console.log(file, fileList);
        this.fileList = fileList
        this.hide= false;
        console.log(fileList)
        console.log(file)
        let  status = 1;
        this.delImgs.push(file.response.url)
        this.delImg(this.delImgs)
      },
      Change(file,fileList){
        console.log(file)
        if(fileList.length>=5){
            this.hide= true;
        }
      },
      delImg(addImgs) {
         let data={
          delImgs : addImgs||this.delImgs
        },
        that = this;
        return http('uploads/delImg',data,'get').then(res=>{
          console.log(res.data.code)
         
        })
      },
       keep(){
         let topic = this.topic,
              fileList = this.fileList,
              img = '';
              topic.member_id = this.member_id
              
              console.log(fileList)
              if(fileList.length>0){
                for(let i= 0;i<fileList.length; i++){
                  img += fileList[i].name+','+fileList[i].uid+','+fileList[i].response.url+';'
                }
              }
              topic.img = img;
         return http('member/sharetopic',topic,'post').then(res=>{
           if(res.data.code==1){
             this.$message({
                    message: '发布成功成功',
                });
                this.topic = {}
                this.fileList = []
           }
         })
       },
       cancel(){
          let addImgs = this.addImgs;
          this.delImg(addImgs)
          this.$router.go(-1);
      },


    },
    created(){
      this.member_id = this.$route.query.member_id
      this.uploadsImgurl = reqUrl+"/uploads/Img";
      // this.uploadsImgurl = "https://jsonplaceholder.typicode.com/posts/"
      this.getshare(0)
    }

}
</script>

<style scoped>
  
</style>
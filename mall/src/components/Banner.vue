<template>
   <div class="banner" v-if="banners.length>0">
        <el-carousel :interval="4000" arrow="always" >
            <el-carousel-item v-for="(item,index) in banners" :key="index">
                <img :src="reqUrl+item.url" alt=""  style="width: 500px; height: 300px;">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {http,reqUrl} from '../network/http'
export default {
    name: 'banner',
    props: {
        banners: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
      .banner {
        height: 300px;
        width: 500px;
        margin: 0 auto;
    }

</style>
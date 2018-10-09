<template lang="pug">
  #home
    //- banner
    el-carousel.banner(trigger="click" :height="height")
      el-carousel-item(v-for="item in banners" :key="item")
        img.banner-img(:src="item" ref="imgHeight")
    //- 滚动消息    
    el-row.scrollMsg(type="flex" justify="center")
      el-col(:span="12") 123123  
    //- 新闻资讯

    el-row(:gutter="0")
      el-col(:span="12")
        el-card.box-card(shadow="never")
          div.clearfix(slot="header")
            span {{$t("index.news-tab-1")}}
            el-button( style="float: right; padding: 3px 0" type="text") {{$t("index.news-tab-details")}}
          //- div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
      el-col(:span="12")
        el-card.box-card(shadow="never")
          div.clearfix(slot="header")
            span {{$t("index.news-tab-2")}}
            el-button( style="float: right; padding: 3px 0" type="text") {{$t("index.news-tab-details")}}
          //- div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}   
</template>


<script>
import axios from "~/plugins/axios";

export default {
  data() {
    return {
      height: "400px",
      banners: [
        require("~/assets/img/banner/01.jpg"),
        require("~/assets/img/banner/02.jpg"),
        require("~/assets/img/banner/03.jpg")
      ]
    };
  },
  mounted() {
    this.getHeight();
  },
  methods: {
    // 获取banner高度， 若初始化获取不到则间隔10毫秒再次获取
    getHeight() {
      setTimeout(() => {
        console.log(`${this.$refs.imgHeight[0].height}`);
        this.height = `${this.$refs.imgHeight[0].height}px`;
        if (this.$refs.imgHeight[0].height === 0) {
          this.getHeight();
        }
      }, 10);
    }
  }
};
</script>

<style lang="less">
#home {
  position: relative;
  top: -80px;
  min-height: 58vh;
  .el-carousel__indicators {
    bottom: 13%;
  }
  .banner {
    width: 100%;
    .banner-img {
      width: 100%;
      display: block;
    }
  }
  .scrollMsg {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.1);
    position: relative;
    bottom: 50px;
    z-index: 5;
  }
}
</style>



<template lang="pug">
  .footer
    .footer-bg-color.body-main        
        el-row(:gutter="10")
          el-col(:span="5")
            h4 {{$t("footer.list-1-title")}}
            //- nuxt-link(:to='{path:"/rate",name:"Rate"}' tag="p" style="cursor:pointer" ) {{$t("footer.list-1-1")}} 
            //- nuxt-link(:to='{name:"problem",params:{id:2}}' tag="p" style="cursor:pointer;") {{$t("footer.list-1-2")}}
            //- nuxt-link(:to='{path:"/userAgrement",name:"UserAgrement"}' tag="p" style="cursor:pointer;") {{$t("footer.list-1-3")}}
          el-col(:span="5")
            h4 {{$t("footer.list-2-title")}}
            p {{$t("footer.list-2-1")}}
            p {{$t("footer.list-2-2")}}
            p {{$t("footer.list-2-3")}}
          el-col(:span="5")
            h4 {{$t("footer.list-3-title")}}
            p(style="cursor:pointer")
              - let url = "http://cn.mikecrm.com/4W2CnwY";
              a(href=url target=url style="color:#d9d9da") {{$t("footer.list-3-1")}}
          el-col(:span="5")
            h4 {{$t("footer.list-4-title")}}
            p {{$t("footer.list-4-1")}}
              - let mail = "support@btcfoo.com"
              a(href=`mailto:${mail}` style="color:#d9d9da" ) !{mail}
            p {{$t("footer.list-4-2")}}
              - let mail2 = "suggestion@btcfoo.com"
              a(href=`mailto:${mail2}` style="color:#d9d9da" ) !{mail2}
          el-col(:span="4")
            img(src="~assets/img/footLogo.png" alt="")
        el-row.foot
          el-col(:span="24")
            p 2018 BtcFoo.com All Rights Reserved
</template>
<script>
export default {
  // data() {
  //   return {
  //     lan: "zh"
  //   };
  // }
  // methods: {
  //   goIndex() {
  //     var pathName = location.pathname;
  //     if (pathName == "/index") {
  //       delete sessionStorage.isReload;
  //       this.COM.jumpScroll();
  //       delete sessionStorage.isReload;
  //     } else {
  //       this.$router.push({
  //         name: "/index",
  //         params: {
  //           type: 1
  //         }
  //       });
  //     }
  //   }
  // },
  // created() {
  //   this.lan = localStorage.getItem("lan") || "zh";
  // }
};
</script>
<style lang="less">
.footer {
  width: 100%;
  height: 230px;
  background: #2b3034;
  padding-top: 40px;
  position: relative;
  color: #ffffff;

  .el-col {
    h4 {
      padding-bottom: 2px;
      border-bottom: 2px solid #00aedd;
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 0.08rem;
      display: inline-block;
    }
    p {
      font-size: 12px;
      line-height: 24px;
    }
  }
  .foot {
    margin-top: 20px;
    padding-top:20px;
    border-top: 1px solid #43494d;
  }
  .clearfix:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
}
</style>
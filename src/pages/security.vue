<template lang="pug">
    el-container.body-main(style="min-width:1200px")
        el-aside(width="220px")
            el-col(:span="23")
                el-card(shadow="never")
                    img.image(src="~assets/img/icon.png")
                    div.card-text
                        span(v-if="username" v-text="username")
                el-menu.el-menu-vertical-demo(
                    :default-active="defActive"
                    @open="handleOpen"
                    @close="handleClose"
                    router)
                    el-menu-item(index="config")
                            i.el-icon-menu
                            span(slot="title") {{$t("security.config.title ")}}
                    el-menu-item(index="authentication")
                            i.el-icon-document
                            span(slot="title") {{$t("security.authentication.title ")}}
                    el-menu-item(index="phone")
                            i.el-icon-mobile-phone
                            span(slot="title") {{$t("security.phone.title ")}}
                    el-menu-item(index="email")
                            i.el-icon-message
                            span(slot="title") {{$t("security.email.title ")}}
                    el-menu-item(index="login_password")
                            i.el-icon-setting
                            span(slot="title") {{$t("security.login_password.title ")}}
                    el-menu-item(index="trade_password")
                            i.el-icon-setting
                            span(slot="title") {{$t("security.trade_password.title ")}}
                    el-menu-item(index="verification")
                            i.icon.iconfont.icon-google
                            span(slot="title") {{$t("security.verification.title ")}}
                    el-menu-item(index="history")
                            i.el-icon-time
                            span(slot="title") {{$t("security.history.title ")}}
        el-main.right_box1( v-loading="!username")  
            nuxt-child
                
            
</template>
<style lang="less" scoped>
.body-main {
  margin: 20px auto 55px;
  .image {
    margin: 0 auto;
    display: block;
  }
  .card-text {
    padding: 14px;
    text-align: center;
  }
  .right_box1 {
    min-width: 965px;
    height: 100%;
    min-height: 670px;
    border: 1px solid #ebebeb;
    background: #ffffff;
  }
}
</style>

<script>
import baseConfig from "~/components/security/index.js";
import WebApi from "~/libs/webApi";

export default {
  data() {
    return {
      username: this.$store.state.userInfo.username || ""
    };
  },
  beforeMount() {
    console.log(this.$store.state.userinfo);
    this.getUserInfo();
  },
  computed: {
    defActive: function() {
      return this.$route.name.replace(/security-/g, "");
    }
  },
  methods: {
    async getUserInfo() {
      let params = {
        type: "all",
        isThis: this
      };
      let res = await WebApi._enroll.webApisecurityGetuserinfo(params);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      console.log(res);
      this.username = res.data.username;
      this.$store.commit("SET_USERINFO", res.data);
      this.$store.commit("SET_USER", res.data.username);
      console.log(this.$store.state.userInfo);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
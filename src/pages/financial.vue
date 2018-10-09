<template lang="pug">
    el-container.body-main(style="min-width:1200px")
        el-aside(width="220px")
            el-col(:span="22")
                el-card(shadow="never")
                    img.image(src="~assets/img/icon.png")
                    div.card-text
                        span(v-if="username" v-text="username")
                el-menu.el-menu-vertical-demo(
                    :default-active="defActive"
                    @open="handleOpen"
                    @close="handleClose"
                    router)
                    el-menu-item(index="account")
                            i.el-icon-menu
                            span(slot="title") {{$t("financial.account.title ")}}
                    el-menu-item(index="deposit")
                            i.el-icon-document
                            span(slot="title") {{$t("financial.deposit.title ")}}
                    el-menu-item(index="withdraw")
                            i.el-icon-mobile-phone
                            span(slot="title") {{$t("financial.withdraw.title ")}}
                    el-menu-item(index="funds")
                            i.el-icon-message
                            span(slot="title") {{$t("financial.funds.title ")}}
                    el-menu-item(index="record")
                            i.el-icon-setting
                            span(slot="title") {{$t("financial.record.title ")}}
                    el-menu-item(index="collection")
                            i.el-icon-setting
                            span(slot="title") {{$t("financial.collection.title ")}}
                    
        el-main.right_box1(v-if="this.$store.state.userInfo") 
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
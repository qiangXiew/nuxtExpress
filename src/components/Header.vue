<template lang="pug">
  #header
    .header
      .header-bg-color.body-main(v-if="showData.length")
        .prompting    
          ul
            li(v-for="item in showData" :key="item.id") {{item.goods}}/{{item.coin}}：
              span(style="color:#16c277;" v-if="Number(item.daydie)>=0 && Number(item.jtrade)") {{item.price.delFixed(item.jtrade)}}
                //- icon(type="arrow-up-c" style="color:#16c277;")
              span(style="color:#16c277;" v-if="Number(item.daydie)>=0 && !Number(item.jtrade)") {{parseInt(item.price)}}
                //- icon(type="arrow-up-c" style="color:#16c277;")
              span(style="color:#ff0000;" v-if="Number(item.daydie)<0 && Number(item.jtrade)") {{item.price.delFixed(item.jtrade)}}
                //- icon(type="arrow-down-c" style="color:#ff0000;")
              span(style="color:#16c277;" v-if="Number(item.daydie)<0 && !Number(item.jtrade)") {{parseInt(item.price)}}
                //- icon(type="arrow-up-c" style="color:#16c277;")
        .lan(style="cursor:pointer" )
          el-select(v-model="value" size="mini" :placeholder='zh ? "简体中文" : "English"')
            el-option(
              v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value")        

      div(v-else style="height:42px;background-color:rgb(20,20,28)")
    .nav(:class='{layout_conent:isStyle}')
      .header-bg-color.body-main
        el-menu.el-menu-demo(
          :default-active="defActive"
          background-color="initial"
          style='border-bottom:none'
          :text-color="isTxtColor"
          
          mode="horizontal"
          router
        )
          el-menu-item(index="/") {{$t("nva.list-1")}}
          el-menu-item(index="/trading/cnha") {{$t("nva.list-2")}}
          el-menu-item(index="/twoCen") {{$t("nva.list-3")}}
          el-menu-item(index="/security/config") {{$t("nva.list-4")}}
          el-menu-item(index="/financial/account") {{$t("nva.list-5")}}
        .layout-logo
          img(src="~assets/img/footLogo.png" alt="")
        ul.nvaRight

          nuxt-link(v-if="!isUser" :to='{path:"/login", name:"login"}' tag="li")  {{$t("nva.list-6")}}
          nuxt-link(v-if="!isUser" :to='{path:"/register", name:"register"}' tag="li")  {{$t("nva.list-7")}}
          //- li(v-if="isUser")  {{isUser}}
          el-dropdown(v-if="isUser")
            span.el-dropdown-link {{isUser}}
               i.el-icon-arrow-down.el-icon--right 
            el-dropdown-menu(slot="dropdown")
              el-dropdown-item 充币
              el-dropdown-item 提币
            
            
          li(v-if="isUser" @click='loginout')  {{$t("nva.list-8")}}
          //- li( @click='loginout')  {{$t("nva.list-8")}}
      
</template>

 <script>
import WebApi from "../libs/webApi";

export default {
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "简体中文"
        },
        {
          value: "en",
          label: "English"
        }
      ],
      valuet: "",
      showData: [],
      user: "",
      zh: this.$i18n.locale === "zh" ? 1 : 0,
      type: 0,
      isIndexReturn: false
    };
  },
  computed: {
    // ...mapGetters(['gdus']),
    isStyle: function() {
      return this.$route.name !== "index";
    },
    isTxtColor: function() {
      return this.$route.name !== "index" ? "#000" : "#fff";
    },
    defActive: function() {
      // return this.$route.name.replace(/-.*$/g, "");
    },
    isUser: function() {
      let users = this.$store.state.authUser;
      return users;
    },
    value: {
      get: function() {
        return this.valuet;
      },
      set: function(res) {
        this.valuet = this.$i18n.locale = localStorage.locale = res;
        this.$store.commit("SET_LANG", res);
      }
    }
  },
  beforeCreate() {
    String.prototype.delFixed = function(s) {
      let str = this,
        index = str.indexOf("."),
        fornt,
        end;
      typeof s == Number ? "" : (s = Number(s));
      if (index > -1) {
        fornt = str.substring(0, index);
        end = str.substring(index, index + s + 1);
        if (end.length < s + 1) {
          //位数不够补领
          let l = Math.abs(s + 1 - end.length);
          for (let i = 0; i < l; i++) {
            end += "0";
          }
        }
      } else {
        //整数加0
        fornt = str;
        end = ".";
        for (let i = 0; i < s; i++) {
          end += "0";
        }
      }
      str = fornt + end;
      return str;
    };
  },
  created() {
    this.getIslogin();
    this.getAip();
  },
  mounted() {},
  methods: {
    // 获取用户登录状态
    async getIslogin() {
      let res = await WebApi._enroll.webApiloginIslogin();
      // TODO 可以加未登录判断
      // if (res.status) {
      //   this.$message.error(res.msg);
      //   return;
      // }

      // this.$store.commit("SET_USER", 1);
    },
    // 退出登录
    async loginout() {
      let res = await WebApi._enroll.webApiloginLoginout();
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.$store.commit("SET_USER", null);
      console.log(this.$store.state.authUser, "authUser");
      this.$router.push("/");
    },
    // 每分钟获取实时行情
    async getAip() {
      let res = await WebApi._enroll.indexIndexs();
      if (!res) return;
      this.showData = res.data.CNHA.slice(0, 3)
        .concat(res.data.ETF)
        .concat(res.data.ETH[0]);
      setTimeout(() => {
        this.getAip();
      }, 60000);
    }
  }
};
</script>

<style lang="less">
#header {
  position: relative;
  z-index: 5;
}
.header-bg-color {
  background: #14141c;
}

.header {
  width: 100%;
  height: 42px;
  background: #14141c;
  .prompting {
    line-height: 42px;
    color: #ffffff;
    font-size: 12px;
    float: left;
    width: 85%; // height: 40px;
    ul {
      float: left;
      li {
        float: left;
        margin-right: 20px;
        img {
          display: inline-block;
          width: 20px;
          height: 20px; // margin-right: 2px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
  }
  .lan {
    margin-left: 92%;
    padding-top: 5px;
    .el-input__inner {
      background-color: initial;
      color: #e3e3e3;
    }
  }
}
.nav {
  background-color: rgba(0, 0, 0, 0.1);

  &.layout_conent {
    background-color: white;
    color: black;
    .nvaRight li {
      color: #000;
    }
    .el-dropdown {
      color: #606266;
    }
  }
  &:after {
    content: "";
    display: block;
    line-height: 0;
    clear: both;
  }
  .el-menu-demo,
  .layout-logo,
  .nvaRight {
    float: left;
    .el-dropdown-link {
      cursor: pointer;
    }
  }
  .nvaRight,
  .layout-logo {
    position: relative;
    z-index: 10;
  }
  .el-dropdown {
    color: #fff;
  }
  .el-menu-demo {
    width: 100%;
    box-sizing: border-box;
    padding-left: 150px;
    padding-right: 350px;
    .el-menu-item {
      height: 80px;
      line-height: 80px;
      font-size: 16px;
      color: #409eff;
    }
  }
  .layout-logo {
    margin-left: -100%;
    cursor: pointer;
    img {
      padding: 20px 0 0 20px;
    }
  }
  .nvaRight {
    margin-left: -350px;
    height: 80px;
    line-height: 80px;
    li {
      cursor: pointer;
      display: inline-block;
      color: #fff;
      opacity: 0.7;
      margin-left: 15px;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

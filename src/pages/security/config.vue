<template lang="pug">
    #c_conent
        head-title(:title='$t("security.config.title")')
        //- h1 {{showdata.all}}
        //- h2 {{showdata.state}}
        .intru
            p {{$t("security.config.content.intru-1")}}
                span {{showdata.all.username}}
            p.leave(v-if="showdata.all.level==0") {{$t("security.config.content.intru-2-0")}}
                span(@click="goauthe") {{$t("security.config.content.intru-3")}}
                span(@click="gorate") {{$t("security.config.content.intru-4")}}
            p.leave(v-if="Number(showdata.all.level==1)") {{$t("security.config.content.intru-2-1")}}
                span(@click="goauthe") {{$t("security.config.content.intru-3")}}
                span(@click="gorate") {{$t("security.config.content.intru-4")}}
            p.leave(v-if="Number(showdata.all.level==2)") {{$t("security.config.content.intru-2-2")}}
                span(@click="goauthe") {{$t("security.config.content.intru-3")}}
                span(@click="gorate") {{$t("security.config.content.intru-4")}}
            p.leave(v-if="Number(showdata.all.level==3)") {{$t("security.config.content.intru-2-3")}}
                span(@click="goauthe") {{$t("security.config.content.intru-3")}}
                span(@click="gorate") {{$t("security.config.content.intru-4")}}
            p.leave(v-if="Number(showdata.all.level==4)") {{$t("security.config.content.intru-2-4")}} 
                span(@click="goauthe") {{$t("security.config.content.intru-3")}}
                span(@click="gorate") {{$t("security.config.content.intru-4")}}
        .c_main
            .one(v-for="(item,index) in showdata.state")
                dl
                    dt
                        i(:class='item.iconName')
                    dd.main-dd
                        p.real-name
                            strong {{item.name}}:
                            span(style="color:#16c277" v-if="Number(item.status) == 1") {{$t("security.config.content.showdata-1")}}
                            span(style="color:#ff0000" v-if="Number(item.status) == 0") {{$t("security.config.content.showdata-2")}}
                        p.and {{item.content}}
                        //- p.and(v-if="index!=0 && item.status == 1") 您还没有实名认证
                        //- p.and(v-if="index!=0 && item.status == 0") 您已实名认证
                router-link.one_right(v-if="item.status==0" :to="item.router" tag="div") {{$t("security.config.content.showdata-3")}}
                
                router-link.one_right(v-if="item.status==1 && item.name!='titles.name4' &&  item.name!='titles.name2'" :to="item.router" tag="div") {{$t("security.config.content.showdata-4")}}
                
                router-link.one_right(v-if="item.status==1 && item.name=='titles.name2' && showdata.all.level!=3" :to="item.router" tag="div") {{$t("security.config.content.showdata-3")}}
</template>
<script>
export default {
  data() {
    return {
      checkReal: "",
      chkMoble: "",
      chkEmail: "",
      chkPw: "",
      chkTransPw: "",
      chkAuth: "",
      moble: ""
    };
  },
  computed: {
    showdata: function() {
      let userInfo = this.$store.state.userInfo,
        ga = null;
      if (userInfo.ga) {
        ga = userInfo.ga.bind;
      }

      return {
        state: [
          {
            name: this.$t("security.config.title"),
            iconName: "el-icon-document",
            content: {
              0: "您还没有实名认证",
              1: "您已完成C1实名认证",
              2: "您已完成C2实名认证",
              3: "您已完成C3实名认证",
              4: "您已完成C4实名认证"
            }[userInfo.level],
            status: userInfo.level,
            router: "/security/authentication"
          },
          {
            name: this.$t("security.phone.title "),
            iconName: "el-icon-mobile-phone",
            content: { 1: "您已绑定手机号", 0: "您还没有绑定手机号" }[
              userInfo.mobile
            ],
            status: userInfo.mobile,
            router: "/security/phone"
          },
          {
            name: this.$t("security.email.title "),
            iconName: "el-icon-message",
            content: { 1: "您已绑定邮箱", 0: "您还未设置邮箱" }[userInfo.email],
            status: userInfo.email,
            router: "/security/email"
          },
          {
            name: this.$t("security.login_password.title"),
            iconName: "el-icon-setting",
            content: {
              1: "您已设置登录密码",
              0: "登录交易所时，需先输入登录密码"
            }[userInfo.password],
            status: userInfo.password,
            router: "/security/loginPassword"
          },
          {
            name: this.$t("security.trade_password.title "),
            iconName: "el-icon-setting",
            content: {
              1: "您已设置资金密码",
              0: "交易资金变动时，需先验证资金密码"
            }[userInfo.assettoken],
            status: userInfo.assettoken,
            router: "/security/tradePassword"
          },
          {
            name: this.$t("security.verification.title "),
            iconName: "icon iconfont icon-google",
            content: {
              0: "您已设置谷歌验证码",
              1: "为了您的资产安全，建议绑定谷歌验证码"
            }[ga],
            status: !ga,
            router: "/security/verification"
          }
        ],
        all: userInfo
      };
    }
  },
  methods: {
    gorate() {
      this.$router.push({
        path: "/rate",
        name: "Rate",
        query: {
          currIndex: 1
        }
      });
    },
    goauthe() {
      //跳转到实名认证
      localStorage.setItem("step", 2);
      this.$router.push({
        path: "./authentication",
        query: {
          data: "1",
          step: this.showdata.all.level
        }
      });
    }
  }
};
</script>
<style lang="less">
#c_conent {
  width: 100%;
  height: 100%;
  .intru {
    width: 100%;
    height: 80px;
    p {
      font-size: 14px;
      margin-left: 48px;
      line-height: 40px;
      span {
        margin-left: 15px;
        color: #00aedd;
      }
      &.leave span {
        cursor: pointer;
      }
    }
  }
  .c_main {
    width: 95%;
    margin: 0 auto;
    height: 100%;
    margin-top: 33px;
    .one {
      border: 1px solid #ebebeb;
      width: 100%;
      overflow: hidden;
      margin-bottom: 25px;
      padding: 15px;
      dl {
        width: 90%;
        height: 50px;
        float: left;
        dt {
          float: left;
          padding-right: 20px;
          i {
            width: 50px;
            height: 50px;
            font-size: 35px;
            text-align: center;
            line-height: 50px;
            display: block;
            border: 1px solid;
            border-radius: 50px;
          }
        }
        dd.main-dd {
          font-size: 14px;
          .real-name {
            color: #555555;
            font-size: 14px;
            span {
              margin-left: 0.05rem;
            }
          }
          .and {
            font-size: 14px;
            margin-top: 0.05rem;
            color: #999999;
          }
        }
      }
    }
    .one_right {
      float: right;
      color: #00aedd;
      margin-top: 3px;
      cursor: pointer;
      line-height: 50px;
      // span {
      //   letter-spacing: 1px;
      //   text-align: center;
      //   display: block;
      //   line-height: 41px;
      //   font-size: 14px;
      // }
    }
  }
}
</style>



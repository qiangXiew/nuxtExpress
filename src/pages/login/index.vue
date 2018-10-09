<template lang="pug">
    #login
        el-tabs.tabs(value="phone" )
            h3.top 账号登录
            el-form.demo-ruleForm(:model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="0px" @keyup.enter.native="submitForm('ruleForm1')")
              el-form-item(prop="userName") 
                  el-input(prefix-icon="el-icon-mobile-phone" type="text" v-model="ruleForm1.userName" auto-complete="off" placeholder="请输入用户名")
              el-form-item(prop="password")
                  el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm1.password" auto-complete="off" placeholder="请输入登录密码")
              el-form-item
                  el-button(size="medium" type="primary"  @click="submitForm('ruleForm1')") 登录    
            ul.foot
              nuxt-link(:to='{patch:"/register",name:"register"}' tag="li" style="cursor: pointer;") 注册新账号
              li(style="padding:0 5px") | 
              nuxt-link(:to='{patch:"/retrieveAccount",name:"retrieveAccount"}' tag="li" style="cursor: pointer;padding-bottom:10px") 忘记密码
        vue-particles.effects(color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
            :clickEffect="true" clickMode="push")            
</template>
<script>
import WebApi from "~/libs/webApi";
// import { isCode } from "~/libs/utils";

export default {
  data() {
    /**
     * 校验方法-
     * 1.非空处理
     * 2.用户名（手机号、邮箱）辨识
     *  */
    const checkAge = (rule, value, callback) => {
      console.log(rule, "<:", value, ":>", callback, "rule, value, callback");
      if (!value) {
        let cueWords = {
          userName: "用户名",
          password: "密码"
        }[rule.field];
        return callback(new Error(`${cueWords}不能为空`));
      }
      if (rule.field === "userName") {
        if (
          !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) &&
          !/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
            value
          )
        ) {
          return callback(new Error(`请输入正确的用户名`));
        }
        this.userType = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
          value
        )
          ? "mobile"
          : "email";
      }
      callback();
    };
    return {
      userType: "", // 登录类型（mobile、email）
      ruleForm1: {
        // 登录from
        userName: "",
        password: ""
      },
      rules: {
        //登录校验
        userName: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 用户登录
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = {
            password: this[formName].password
          };
          params[this.userType] = this[formName].userName;
          let res = await WebApi._enroll.webApiloginLogin(params);
          if (!res) return;
          console.log(res);
          if (res.status) {
            this.$message.error(res.msg);
            return;
          }
          this.$message.success(res.msg);
          this.$store.commit("SET_USER", this.ruleForm1.userName);
          console.log(this.$store.state.authUser, "authUser");
          this.$store.state.pathCache
            ? this.$router.push(this.$store.state.pathCache)
            : this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
#login {
  width: 100vw;
  height: 660px;
  background-color: #f3f3f3;
  position: relative;
  h3.top {
    font-weight: 400;
    text-align: center;
    margin-bottom: 20px;
  }
  .tabs {
    width: 400px;
    height: max-content;
    background-color: white;
    box-sizing: border-box;
    margin: auto;
    padding: 10px 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ul.foot {
      li {
        float: right;
      }
    }
  }
  .el-form-item__content {
    .el-button--medium {
      width: 308px;
      margin-left: 15px;
    }
  }
}
</style>


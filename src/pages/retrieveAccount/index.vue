<template lang="pug">
    #retrieveAccount
        el-tabs.tabs(value="phone" )
              h3.top 找回密码
              el-form.demo-ruleForm(:model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="0px")
                  el-form-item(prop="userName") 
                      el-input(prefix-icon="el-icon-mobile-phone" type="text" v-model="ruleForm1.userName" auto-complete="off" placeholder="请输入用户名")
                  el-form-item(prop="mcode")
                      el-input(prefix-icon="el-icon-picture-outline" name='xxx' v-model="ruleForm1.mcode" placeholder="请输入验证码") 
                      el-button.mcodeBtn(size="small" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}    
                  el-form-item(prop="password")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm1.password" auto-complete="off" placeholder="请输入登录密码")
                  el-form-item(prop="repassword")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm1.repassword" auto-complete="off" placeholder="请再次输入密码")
                  el-form-item
                      el-button(size="medium" type="primary" @click="submitForm('ruleForm1')") 提交    
              p(style="margin-top: 0.1rem;text-align:center")
                span(style="cursor: pointer; font-size: 14px;") 
                  nuxt-link(:to = '{patch : "/login",name:"login"}') 返回登录
        vue-particles.effects(color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
            :clickEffect="true" clickMode="push")            
</template>
<script>
import WebApi from "~/libs/webApi";

export default {
  data() {
    /**
     * 校验方法-
     * 1.非空处理
     * 2.用户名（手机号、邮箱）辨识
     *  */
    let checkAge = (rule, value, callback) => {
      console.log(rule, "<:", value, ":>", callback, "rule, value, callback");
      if (!value) {
        let cueWords = {
          userName: "手机号码",
          mcode: "验证码"
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
        this.codeType = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
          value
        )
          ? "email"
          : "mobile";
      }
      console.log(this.codeType);
      callback();
    };
    /**
     * 校验方法-
     * 1.非空处理
     * 2.记录密码password
     *  */
    let validatePass = (rule, value, callback) => {
      console.log(rule, value, callback);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm1.repassword !== "") {
          this.$refs.ruleForm1.validateField("repassword");
        }
        callback();
      }
    };
    /**
     * 校验方法-
     * 1.非空处理
     * 2.密码二次确认
     *  */
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      codeType: "",
      countdown: 0, //验证码发送间隔时间
      countdownTs: "点击获取", // 证码倒提示文案
      ruleForm1: {
        // 提交找回form
        userName: "",
        password: "",
        repassword: "",
        mcode: ""
      },
      rules: {
        // 表单验证
        userName: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
        mcode: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 找回密码
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this[formName];
          params[this.codeType] = this.ruleForm1.userName;
          delete params["userName"];
          if (this.codeType === "email") {
            params["ecode"] = this.ruleForm1.mobile;
            delete params["mcode"];
          }

          let res = await WebApi._enroll.webApiloginFindpw(params);
          if (!res) return;
          console.log(res);
          if (res.status != 0) {
            this.$message.error(res.msg);
            return;
          }
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取短信验证码
    getMobileCode() {
      let ams = this.codeType;
      let params = {
        type: "findpw"
      };
      params[this.codeType] = this.ruleForm1.userName;
      console.log(params);
      // 发短信前校验一下手机号
      this.$refs["ruleForm1"].validateField("userName", async valid => {
        if (valid) {
          this.$message.error(valid);
          return;
        }
        if (this.codeType === "email") {
          this.getMailCode(params);
          return;
        }
        let res = await WebApi._enroll.webApiloginSendsmscode(params);
        if (!res) return;
        if (res.status) {
          this.$message.error(res.msg);
          return;
        }
        this.countdown = 60; // 设置60秒请求时间
        let djs = setInterval(() => {
          this.countdownTs = `${(this.countdown -= 1)}秒后重新获取`;
          console.log(this.countdown);
          if (this.countdown === 0) {
            this.countdownTs = `重新获取`;
            clearInterval(djs);
          }
        }, 1000);
        this.$message({
          message: '"验证码发送成功,请注意查收"',
          type: "success"
        });
      });
    },
    // 如果是邮件格式，则发邮件验证码
    async getMailCode(params) {
      let res = await WebApi._enroll.webApiloginSendmailcode(params);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return
      }
      this.countdown = 60; // 设置60秒请求时间
      let djs = setInterval(() => {
        this.countdownTs = `${(this.countdown -= 1)}秒后重新获取`;
        if (this.countdown === 0) {
          this.countdownTs = `重新获取`;
          clearInterval(djs);
        }
      }, 1000);
      this.$message({
        message: '"验证码发送成功,请注意查收"',
        type: "success"
      });
    }
  }
};
</script>
<style lang="less">
#retrieveAccount {
  width: 100vw;
  height: 660px;
  background-color: #f3f3f3;
  position: relative;
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
    .demo-ruleForm {
      .mcodeBtn {
        position: absolute;
        top: 10%;
        right: 30px;
        min-width: 107px;
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


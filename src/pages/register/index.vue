<template lang="pug">
    #register
        el-tabs.tabs(value="phone" )
          el-tab-pane(name="phone" label="手机注册")
              el-form.demo-ruleForm(:model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="0px")
                  el-form-item(prop="mobile") 
                      el-input(prefix-icon="el-icon-mobile-phone" type="text" v-model="ruleForm1.mobile" auto-complete="off" placeholder="请输入手机号")
                  el-form-item(prop="password")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm1.password" auto-complete="off" placeholder="请输入登录密码")
                  el-form-item(prop="repassword")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm1.repassword" auto-complete="off" placeholder="请再次输入密码")
                  el-form-item(prop="code")
                      el-input(prefix-icon="el-icon-picture-outline" v-model="ruleForm1.code" placeholder="请输入图形验证码")
                        el-button.get-img-btn(slot="append" :loading="!codeImg" @click="getImgCode" :style='`background:url(${codeImg}) no-repeat;background-size:100% auto; min-width:112px `') &nbsp;
                  el-form-item(prop="mcode")
                      el-input(v-model="ruleForm1.mcode" placeholder="请输入短信验证码") 
                        //- el-button(slot="append" icon="el-icon-search") 点击获取  
                        el-button.mcodeBtn(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}
                      //- el-input(v-model="input.code" placeholder="请输入验证码")
                        el-button(slot="append" icon="el-icon-search") 点击获取  
                  el-form-item
                      el-checkbox(v-model="haveRead") 我已阅读并同意
                        nuxt-link(target="_blank" :to ={ path: 'agrement/user'}) 《用户服务协议》
                  el-form-item
                      el-button(size="medium" type="primary" :disabled="!haveRead" @click="submitForm('ruleForm1')") 提交    
          el-tab-pane(name="mail" label="邮箱注册")
              el-form.demo-ruleForm(:model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px")
                  el-form-item(prop="email") 
                      el-input(prefix-icon="el-icon-message" type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="请输入电子邮箱")
                  el-form-item(prop="password")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入登录密码")
                  el-form-item(prop="repassword")
                      el-input(prefix-icon="el-icon-tickets" type="password" v-model="ruleForm2.repassword" auto-complete="off" placeholder="请再次输入密码")
                  el-form-item(prop="code")
                      el-input(prefix-icon="el-icon-picture-outline" v-model="ruleForm2.code" placeholder="请输入图形验证码")
                        el-button.get-img-btn(slot="append" :loading="!codeImg" @click="getImgCode" :style='`background:url(${codeImg}) no-repeat;background-size:100% auto; min-width:112px `') &nbsp;
                        //- TODO 因为换了button 所以注释了旧的方法
                      //- el-card.codeImg(shadow="hover" v-if='codeImg')
                          //- img(:src="codeImg" @click="getImgCode")
                      //- el-button.mcodeBtn(size="small" :loading="true" v-else) 加载中        
                  el-form-item
                      el-checkbox(v-model="haveRead") 我已阅读并同意 
                        nuxt-link(target="_blank" :to ={ path: 'agrement/user'}) 《用户服务协议》
                  el-form-item
                      el-button(size="medium" type="primary" :disabled="!haveRead" @click="submitForm('ruleForm2')") 提交    
          p(style="margin-top: 0.1rem;text-align:center")
            span(style="cursor: pointer; font-size: 14px;") 
              nuxt-link(:to = '{patch : "/login",name:"login"}') 已有账号立即登录
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
      if (!value) {
        let cueWords = {
          mobile: "手机号码",
          code: "图片验证码",
          mcode: "短信验证码",
          email: "电子邮件"
        }[rule.field];
        return callback(new Error(`${cueWords}不能为空`));
      }
      if (rule.field === "mobile") {
        return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
          value
        )
          ? callback()
          : callback(new Error(`请输入正确的手机号`));
      }
      if (rule.field == "email") {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
          ? callback()
          : callback(new Error(`请输入正确的电子邮箱`));
      }
      callback();
    };
    /**
     * 校验方法-
     * 1.非空处理
     * 2.存储password
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
     * 2.手机密码二次确认
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
    /**
     * 校验方法-
     * 1.非空处理
     * 2.邮件密码二次确认
     *  */
    let validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      codeImg: "", // 图片验证码Url
      countdown: 0, // 短信验证码倒计时
      countdownTs: "获取验证码", // 设置验证码倒计时
      haveRead: true, // 是否同意协议， 默认同意
      ruleForm1: {
        // 手机注册form
        mobile: "",
        password: "",
        repassword: "",
        code: "",
        mcode: ""
      },
      ruleForm2: {
        // 邮箱注册form
        email: "",
        password: "",
        repassword: "",
        code: ""
      },
      rules: {
        // 手机注册格式校验
        mobile: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }],
        mcode: [{ validator: checkAge, trigger: "blur" }]
      },
      rules2: {
        // 邮箱注册格式校验
        email: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass3, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  mounted() {
    // 初始化获取图片验证码
    this.getImgCode();
  },
  methods: {
    // 注册提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let params = this[formName];
          let res = await WebApi._enroll.webApiloginRegister(params);
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
        this.getImgCode(); // 提交成功后无论如何， 重新获取图片验证码
      });
    },
    //获取图片验证码
    getImgCode() {
      this.codeImg = "";
      setTimeout(() => {
        this.codeImg = "http://18.179.32.204:8080/web/login/imgcode"; //img.src;
      }, 10);
    },
    // 获取短信验证码
    getMobileCode() {
      let params = {
        type: "register",
        mobile: this.ruleForm1.mobile
      };
      console.log(params);
      // 发短信前校验一下手机号
      this.$refs["ruleForm1"].validateField("mobile", async valid => {
        if (valid) {
          this.$message.error(valid);
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
    }
  }
};
</script>
<style lang="less">
#register {
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
      .codeImg {
        width: 107px;
        height: 30px;
        & > div {
          padding: initial;
          line-height: initial;
          display: inline-flex;
          img {
            width: 100%;
            height: 100%;
          }
        }
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


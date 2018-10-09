<template lang="pug">
  #login-password
    head-title(title="修改登录密码")
    el-alert.alert(
      title="为了确保您的账号安全，请牢记您的登录密码不要轻易泄露给他人。"
      type="warning"
      show-icon
      :closable="false")
    el-form(label-width="100px" style="width:50%;margin:60px auto" )  
      el-form-item(label="登录密码")
        el-input(v-model='input.oldpw' )
      el-form-item(label="新登录密码")
        el-input(type="password" v-model='input.newpw' )
      el-form-item(label="确认登录密码")
        el-input(type="password" v-model='input.renewpw' )
      //- 手机验证码
      el-form-item( v-if="true" label="手机验证码")
        el-input(v-model="input.code" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}
      //- 邮箱验证码
      el-form-item( v-if="false" label="邮箱验证码")
        el-input(v-model="input.code" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}    
      el-form-item
        el-button.btn(style="margin:0 auto" type="primary" @click="submitInfo") 提交
        
        
  

</template>
<script>
import WebApi from "~/libs/webApi";
export default {
  data() {
    return {
      codeType: "phone",
      countdown: 0,
      countdownTs: "点击获取",
      input: {
        oldpw: null,
        newpw: null,
        renewpw: null,
        code: null
      }
    };
  },
  methods: {
    // 获取短信验证码
    async getMobileCode() {
      let params = {
        type: "findpw"
      };
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
        if (this.countdown === 0) {
          this.countdownTs = `重新获取`;
          clearInterval(djs);
        }
      }, 1000);
      this.$message({
        message: '"验证码发送成功,请注意查收"',
        type: "success"
      });
      // });
    },
    // 如果是邮件格式，则发邮件验证码
    async getMailCode(params) {
      let res = await WebApi._enroll.webApiloginSendmailcode(params);
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
    },
    async submitInfo() {
      let res = await WebApi._enroll.webApisecurityEditpw(this.input);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
    }
  }
};
</script>




<template lang="pug">
    #trade-password
      head-title(title="设置资金密码")
      el-alert.alert(
        :title=" !steps ? '资金密码是在资产变动时需要输入的密码，不同于登录密码。' :  '资金密码是在资产变动时需要输入的密码，不同于登录密码。'"
        type="warning"
        show-icon
        :closable="false")
        el-button(v-if="!steps" type="primary" size="mini"  plain @click="steps = true") 重置
      el-form(v-if="steps" style="width:50%;margin:60px auto" label-width="130px") 
        el-form-item(label="设置资金密码:" prop="oldgcode")
          el-input(v-model="input.assettoken")    

        //- el-form-item( v-if="steps === 'modify'" label="确认资金密码" prop="oldgcode")
          el-input(v-model="input.oldgcode")    
          //- 手机验证码
        el-form-item( v-if="steps !== 'enableCertified'" label="手机验证码:")
          el-input(v-model="input.mcode" placeholder="请输入验证码")
            el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}
        //- 邮箱验证码
        el-form-item( v-if="false" label="邮箱验证码:")
          el-input(v-model="input.ecode" placeholder="请输入验证码")
            el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}        

        el-form-item
         el-button.btn(style="margin:0 auto" type="primary" @click="submitInfo") 保存    
      
</template>
<script>
import WebApi from "../../libs/webApi";
export default {
  data() {
    return {
      countdown: 0,
      codeType: "email",
      countdownTs: "点击获取",
      steps: false,
      input: {
        assettoken: null,
        // ecode: null,
        mcode: null
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
    },
    async submitInfo() {
      // webApi._enroll.webApisecurityEditassettoken
      let params = this.input;
      let res = await WebApi._enroll.webApisecuritySetassettoken(params);
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


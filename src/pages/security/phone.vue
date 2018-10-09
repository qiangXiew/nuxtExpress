<template lang="pug">
    #security-phone
      head-title(title="手机认证")
      el-alert.alert(
        v-if="!userInfo.mobile"
        title="正在绑定手机账号"
        type="warning"
        show-icon
        :closable="false")
      el-alert.alert(
        v-else
        :title="`您已通过手机认证,账号：${userInfo.username}`"
        type="success"
        show-icon
        :closable="false")  
      el-form( v-if="!userInfo.mobile" :model="input" ref="mobileForm" :rules="rules" label-width="100px" style="width:50%;margin:60px auto" )  
        el-form-item(label="手机号码" prop="mobile")
          el-input(v-model='input.mobile' )
        //- 手机验证码
        el-form-item( label="手机验证码" prop="mcode")
          el-input(v-model="input.mcode" placeholder="请输入验证码")
            el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}
        //- 邮箱验证码
        el-form-item( label="邮箱验证码" prop="ecode")
          el-input(v-model="input.ecode" placeholder="请输入验证码")
            el-button(slot="append" :loading="!!countdown2" @click="getEmailCode") {{countdownTs2}}    
        //- el-form-item(label="资金密码")
          el-input(v-model='input.email' )    
        el-form-item
          el-button.btn(style="margin:0 auto" type="primary" @click="submitInfo") 提交
</template>
<script>
import WebApi from "~/libs/webApi";
import Utils from "~/libs/utils";
export default {
  data() {
    return {
      countdown: 0,
      countdown2: 0,
      countdownTs: "点击获取",
      countdownTs2: "点击获取",
      input: {
        mobile: null,
        mcode: null,
        ecode: null
      },
      rules: {
        mobile: Utils.isMobile("手机号码填写有误"),
        mcode: Utils.isCode("请填写手机验证码"),
        ecode: Utils.isCode("请填写邮箱验证码")
      }
    };
  },
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    // 获取短信验证码
    async getMobileCode() {
      let params = {
        type: "findpw",
        mobile: this.input.mobile
      };
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
    async getEmailCode() {
      let params = {
        type: "findpw"
      };
      let res = await WebApi._enroll.webApiloginSendmailcode(params);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.countdown2 = 60; // 设置60秒请求时间
      let djs = setInterval(() => {
        this.countdownTs2 = `${(this.countdown2 -= 1)}秒后重新获取`;
        if (this.countdown2 === 0) {
          this.countdownTs2 = `重新获取`;
          clearInterval(djs);
        }
      }, 1000);
      this.$message({
        message: '"验证码发送成功,请注意查收"',
        type: "success"
      });
    },
    async submitInfo() {
      if (!Utils.getV(this.$refs.mobileForm)) return;

      let params = this.input;
      let res = await WebApi._enroll.webApisecurityBindmobile(params);
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



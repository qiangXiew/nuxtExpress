<template lang="pug">
  #emailAuthen
    head-title(title="邮箱认证")
    el-alert.alert(
      :title="`您正在绑定邮箱,账号：${userName} `"
      type="warning"
      show-icon
      :closable="false")
    el-form(label-width="100px" style="width:50%;margin:60px auto" :model="input" :rules="rules" ref="emailForm")  
      el-form-item(label="电子邮箱" prop="email")
        el-input(v-model='input.email' )
      //- 邮箱验证码
      el-form-item( label="邮箱验证码" prop="ecode" ref="email")
        el-input(v-model="input.ecode" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown2" @click="getEmailCode") {{countdownTs2}}    
      //- 手机验证码
      el-form-item( label="手机验证码" prop="mcode")
        el-input(v-model="input.mcode" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}    
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
        email: null,
        mcode: null,
        ecode: null
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的电子邮箱",
            trigger: "blur"
          }
        ],
        mcode: Utils.isCode("手机验证证码不能为空"),
        ecode: Utils.isCode("邮箱验证码不能为空")
      }
    };
  },
  mounted() {
    let b = Utils.isCode("邮箱验证码不能为空");
    b.push({ a: 1 });
    console.log(b);
  },
  computed: {
    userName: function() {
      return this.$store.state.userInfo.username || "";
    }
  },
  methods: {
    // 获取短信验证码
    async getMobileCode() {
      let params = {
        type: "findpw"
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
    },
    // 如果是邮件格式，则发邮件验证码
    async getEmailCode() {
      let type = false;
      this.$refs.emailForm.validate((a, b) => {
        if (!b.email) return (type = true);
        this.$message.error(b.email[0].message);
      });
      if (!type) return;

      let params = {
        type: "findpw",
        email: this.input.email
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
    // 提交数据
    async submitInfo() {
      if (!Utils.getV(this.$refs.emailForm)) return;
      let params = this.input;
      let res = await WebApi._enroll.webApisecurityBindemail(params);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
    }
  }
};
</script>



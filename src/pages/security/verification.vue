
<template lang="pug">
  #verification
    head-title(title="Google 认证设置")
    //- 二维码展示框 涉及绑定及修改验证码用
    el-alert(v-if="steps === 'noCertified' || steps === 'modify'" title="" type="warning" :closable="false")
      div.vinfo()
        el-row(type="flex" align="middle")
          el-col(:span="6")
            img(:src="qrImages")  
          el-col(:span="18" style="font-size:13px")
            p 1. 在手机上下载安装“Google Authenticator (身份验证器)”；
            p 2. 在“验证器”应用程序中，点击“添加新账户 (iOS 下是 + 号)”，然后选择“扫描条形码”；
            p 3. 扫描左侧条形码，输入Google验证码，完成认证。
            p 如果您无法扫描成功上图的条形码，您还可以手动添加账户，并输入如下密钥：
                span(style="color:rgb(239, 33, 33)") {{input.secret}}
                span(style="margin-left:5px;color:#00aedd;cursor:pointer" v-clipboard:copy="input.secret" v-clipboard:success="onCopy" v-clipboard:error="onError") 复制
            p(style="color:rgb(239, 33, 33)") 密钥和二维码用于找回谷歌验证器，请妥善保存。
    //- 逻辑比较多，加以注释
        1. 表单所有参数都在this.input里
        2. 如果不是认证成功、已关闭认证状态，都要用到表单提交数据
        3. 未认证状态： 密钥、谷歌code、邮箱Or手机验证码
        4. 修改认证： 原谷歌code、密钥、新谷歌code、邮箱Or手机验证码
        5. 关闭认证： 谷歌code、 邮箱Or手机验证码
        6. 启用认证： 谷歌code
    el-alert( v-if="steps === 'turnOffCertified'" title="" type="warning" :closable="false") 关闭谷歌认证   
    el-alert( v-if="steps === 'enableCertified' && !enable" title="" type="error" :closable="false") 您已关闭Google认证。
      el-button(  type="primary" size="mini"  plain @click="enable ='true'") 开启
    el-alert( v-if="steps === 'enableCertified' && enable" title="" type="warning" :closable="false") 开启Google认证。

    el-form(v-if="steps !== 'complete'" style="width:50%;margin:60px auto" label-width="100px")
      //- 原谷歌验证码
      el-form-item( v-if="steps === 'modify'" label="原谷歌验证码" prop="oldgcode")
        el-input(v-model="input.oldgcode")    
      //- 密钥
      el-form-item( v-if="steps !== 'turnOffCertified' && steps !== 'enableCertified'" label="密钥" prop="secret")
        el-input(v-model="input.secret" disabled)    
      //- 谷歌验证码 & 新验证码
      el-form-item( v-if="steps === 'enableCertified' && enable || steps !== 'enableCertified' && !enable" :label="steps !== 'modify' ? '谷歌验证码' : '新谷歌验证码'")
        el-input(v-model="input.gcode" placeholder="请输入验证码")
      //- 手机验证码
      el-form-item( v-if="steps !== 'enableCertified'" label="手机验证码")
        el-input(v-model="input.mcode" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}
      //- 邮箱验证码
      el-form-item( v-if="false" label="邮箱验证码")
        el-input(v-model="input.ecode" placeholder="请输入验证码")
          el-button(slot="append" :loading="!!countdown" @click="getMobileCode") {{countdownTs}}    

      el-form-item()
         h3(v-if="steps") {{ steps.bind }}
         el-button.btn(style="margin:0 auto" type="primary" @click="pushVal") 验证

    el-alert(v-if="steps === 'complete'" title="" type="success" :closable="false")
      span(style="margin-right:20px;") 您已开启Google认证
      el-button(  type="primary" size="mini"  plain @click="steps ='modify'") 修改
      el-button( type="primary" size="mini" plain @click="steps ='turnOffCertified'") 关闭
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode";
import VueClipboard from "vue-clipboard2";
import WebApi from "~/libs/webApi";
Vue.use(VueClipboard);

export default {
  data() {
    return {
      qrImages: "", //二维码图片
      codeType: "phone", // 发送验证码类型 默认手机
      countdown: 0, // 倒计时时间
      enable: false, // 开启状态，默认关闭
      countdownTs: "点击获取",

      input: {
        oldgcode: null, // 旧谷歌验证码
        secret: null, // 密钥
        gcode: null, //谷歌code
        mcode: null, //验证码手机
        ecode: null //验证码邮箱
      },
      vals: null
    };
  },
  computed: {
    /**
     * noCertified      未认证
     * complete         认证成功
     * modify           修改认证
     * turnOffCertified 关闭认证
     * enableCertified  启用认证
     */
    steps: {
      get: function() {
        if (this.vals) {
          return this.vals;
        }
        let gaInfo = this.$store.state.userInfo.ga,
          b,
          cr = JSON.stringify(gaInfo);
        if (!cr) return;
        b = JSON.parse(cr);
        return (
          (b.bind == 1 && "noCertified") ||
          (b.open == 0 && "enableCertified") ||
          "complete"
        );
      },
      set: function(val) {
        console.log(val);
        this.vals = val;
        // return (this.steps = val);
      }
    }
  },
  mounted() {
    this.getCreatega();
  },
  methods: {
    onCopy(e) {
      this.$message.success("复制成功");
    },
    onError(e) {
      this.$message.error("复制失败");
    },
    //获取谷歌密钥
    async getCreatega() {
      let res = await WebApi._enroll.webApisecurityCreatega("");
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.input.secret = res.data.secret;
      this.generQRImg(res.data.qrCodeUrl);
    },
    //生成二维码
    generQRImg(val) {
      QRCode.toDataURL(val)
        .then(url => {
          this.qrImages = url;
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 获取短信验证码
    async getMobileCode() {
      // let ams = this.codeType;
      let params = {
        type: "findpw"
      };
      // params[this.codeType] = this.ruleForm1.userName;
      // console.log(params);
      // 发短信前校验一下手机号
      // this.$refs["ruleForm1"].validateField("userName", async valid => {
      // if (valid) {
      //   this.$message.error(valid);
      //   return;
      // }
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
    // 提交验证信息
    async pushVal() {
      console.log(this.steps);
      let params = this.input;
      let res = {
        modify: WebApi._enroll.webApisecurityEditga,
        noCertified: WebApi._enroll.webApisecurityBindga,
        turnOffCertified: WebApi._enroll.webApisecurityClosega,
        enableCertified: WebApi._enroll.webApisecurityOpenga
      }[this.steps];
      res = await res(params);

      if (!res) return;
      console.log(res);
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);

      this.steps = {
        modify: "complete", // 修改认证-成功 > 认证成功
        noCertified: "complete", // 未认证-成功 > 认证成功
        turnOffCertified: "enableCertified", // 关闭认证-成功 > 启用认证
        enableCertified: "complete" // 启用认证-成功 认证成功
      }[this.steps];
    }
  }
};
</script>
<style lang="less" scoped>
#verification {
  p {
    margin: 5px 0;
  }
}
</style>




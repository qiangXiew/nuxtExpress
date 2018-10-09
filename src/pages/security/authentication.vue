<template lang="pug">
    #authentication
      head-title(title="实名认证")
      el-steps(:active="active" finish-status="success" align-center)
        el-step(title="初级认证")
        el-step(title="高级认证")
        el-step(title="视频认证")
        el-step(title="认证完成")
      div(v-if="active == 0")  
        el-alert.alert(title="请您填写真实信息，实名认证一旦成功，不可解除与修改。" type="warning" show-icon :closable="false")
        el-row( type="flex" justify="center")
            el-col(:span="10")
              el-form(:model="ruleForm1" status-icon ref="ruleForm1" label-width="100px")
                el-form-item(label="真实姓名:" prop="realname")
                  el-input(type="text" v-model="ruleForm1.realname")
                
                el-form-item(label="证件所在地:" prop="country")
                  el-select(v-model="ruleForm1.country" filterable style='min-width:290px;' placeholder="请选择")
                    el-option(
                      v-for="item in country"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value")
                
                el-form-item(label="证件类型:" prop="idtype")
                  el-select(v-model="ruleForm1.idtype" filterable style='min-width:290px;' placeholder="请选择")
                    el-option(
                      v-for="item in numType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value")
                el-form-item(label="证件号:" prop="idnumber")
                  el-input(type="text" v-model="ruleForm1.idnumber")

                el-form-item
                  el-button(type="primary" style="margin-top: 12px;" @click="submitInfo") 下一步
                  //- el-button(type="primary" @click="submitForm('ruleForm1')") 提交
                  el-button(@click="resetForm('ruleForm1')") 重置
      div.pushImg(v-if="active == 1" )
        el-alert.alert(title="您提交的C2高级认证正在审核中，请等待。" type="warning" show-icon :closable="false")
        el-form(style="width:50%;margin:60px auto")
          el-upload(
            action=""
            list-type="picture"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            accept="image/*"
            :on-change="beforeAvatarUpload"
            :limit=1)
            //- i.el-icon-plus
            el-button.ibt(plain type="primary" size="mini") 上传证件正面
          el-upload(
            action=""
            list-type="picture"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            accept="image/*"
            :on-change="beforeAvatarUpload"
            :limit=1)
            //- i.el-icon-plus
            el-button.ibt(size="mini" type="primary" plain) 上传证件返面
          el-upload(
            action=""
            list-type="picture"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            accept="image/*"
            :on-change="beforeAvatarUpload"
            :limit=1)
            //- i.el-icon-plus
            el-button.ibt(size="mini" type="primary" plain) 上传手持证件照
          //- el-dialog(:visible.sync="dialogVisible")
            img(width="100%" :src="dialogImageUrl" alt="")  
          el-button(type="primary" style="margin-top: 12px;" @click="uploadimg") 下一步

      
</template>
<script>
import WebApi from "~/libs/webApi";
export default {
  data() {
    return {
      actives: "",
      country: [
        {
          value: "中国大陆",
          label: "中国大陆"
        },
        {
          value: "选项2",
          label: "中国香港"
        },
        {
          value: "选项3",
          label: "中国澳门"
        },
        {
          value: "选项4",
          label: "中国台湾"
        },
        {
          value: "安哥拉",
          label: "安哥拉"
        },
        {
          value: "选项6",
          label: "阿富汗"
        },
        {
          value: "选项7",
          label: "阿尔巴尼亚"
        },
        {
          value: "选项8",
          label: "阿尔及利亚"
        },
        {
          value: "选项9",
          label: "安道尔共和国"
        },
        {
          value: "选项10",
          label: "安圭拉岛"
        },
        {
          value: "选项11",
          label: "安提瓜和巴布达"
        },
        {
          value: "选项12",
          label: "阿根廷"
        },
        {
          value: "选项13",
          label: "亚美尼亚"
        },
        {
          value: "选项14",
          label: "澳大利亚"
        },
        {
          value: "选项15",
          label: "奥地利"
        },
        {
          value: "选项16",
          label: "阿塞拜疆"
        }
      ],
      numType: [
        {
          value: "1",
          label: "身份证"
        },
        {
          value: "2",
          label: "护照"
        }
      ],
      value8: "",
      ruleForm1: {
        realname: null,
        country: null,
        idtype: null,
        idnumber: null
      },
      dialogImageUrl: "", // 图片预览url
      dialogVisible: false, // 图片预览器状态
      imgList: [] // 上传图list
    };
  },
  computed: {
    active: {
      get: function() {
        if (this.actives) {
          return this.actives;
        }
        return this.$store.state.userInfo.level;
      },
      set: function(val) {
        this.actives = val;
      }
    }
  },
  mounted() {
    // console.log();
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file, fileList) {
      this.imgList.push(fileList.map(res => res.raw));
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        fileList.pop();
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt1M;
    },
    async uploadimg() {
      let formt = new FormData();
      this.imgList.map(res =>
        res.map(resa => {
          console.log(this.imgList, resa.name);
          formt.append("img[]", resa, resa.name);
        })
      );

      let res = await WebApi._enroll.webApisecurityAuthadvance(formt);
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.active++;
    },

    next() {
      if (this.active++ > 2) this.active = 0;
    },
    async submitInfo() {
      let res = await WebApi._enroll.webApisecurityAuthprimary(this.ruleForm1);
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      this.$message.success(res.msg);
      this.active++;
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.alert {
  margin: 30px 0;
}
#authentication {
  .pushImg {
    .ibt {
      padding: 25px 10px;
      margin: 20px 0;
    }
  }
}
</style>




<template lang="pug">
  #history
    head-title(title="登录历史")
    el-table(
       v-loading="login"
      :data="tableData"
      stripe)
      el-table-column(
        prop="logintime"
        label="登录时间"
        width="460")
      
      el-table-column(
        prop="loginip"
        label="IP地址"
        width="460")  
    div(align="center")
      el-pagination(
        style="padding:25px 0 0"
        background
        @size-change="sizeChangeHandler"
        @current-change="currentChangeHandler"
        layout="prev, pager, next"
        :page-size="fy.pageSize"
        :total="Number(fy.totalItems)")     
</template>
<script>
import WebApi from "~/libs/webApi";
export default {
  data() {
    return {
      tableData: [],
      fy: "",
      login: false
    };
  },
  mounted() {
    this.getHistory();
  },
  methods: {
    sizeChangeHandler(size) {
      console.log(size, "size");
    },
    currentChangeHandler(index) {
      console.log(index, "index");
      this.getHistory(index);
    },
    async getHistory(page = 1) {
      this.login = true;
      const patch = {
        cur: page
      };
      let res = await WebApi._enroll.webApisecurityLoginlog(patch);
      if (!res) return;

      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      res.data.item.map((arr, index) => {
        const date = new Date(arr.logintime * 1000);
        let timeCompletion = val => (val >= 1 && val <= 9 ? `0${val}` : val);
        let Y = date.getFullYear();
        let M = timeCompletion(date.getMonth() + 1);
        let S = timeCompletion(date.getDate());
        let H = timeCompletion(date.getHours());
        let m = timeCompletion(date.getMinutes());
        let s = timeCompletion(date.getSeconds());

        arr.logintime = `${Y}-${M}-${S} ${H}:${m}:${s}`;
      });
      this.fy = res.data;
      this.tableData = res.data.item;
      this.login = false;
    }
  }
};
</script>


<template lang="pug">
    #account
        head-title(title="账户资产")
        el-table(:data="tableData"
            stripe
            style="width: 100%")
            el-table-column(
                prop="coin"
                label="币种"
                width="130")
            
            el-table-column(
                prop="balance"
                label="可用"
                width="200")
            
            el-table-column(
                prop="lock"
                label="冻结")

            el-table-column(
                prop="balance"
                label="总计"
                width="200")
            
            el-table-column(
                propt="rate"
                label="操作"
                width="180")
                
                
</template>
<script>
import WebApi from "~/libs/webApi";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getCountList();
  },
  methods: {
    async getCountList() {
      let res = await WebApi._enroll.webApiaccountList();
      if (!res) return;
      if (res.status) {
        this.$message.error(res.msg);
        return;
      }
      let ttt = Object.keys(res.data).map(rest => {
        
        return res.data[rest];
      });
      this.tableData = ttt;
      console.log(ttt);
      //   console.log(res.data.join());
      //   this.tableData = res.data;
    }
  }
};
</script>


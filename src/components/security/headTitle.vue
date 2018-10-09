<template lang="pug">
    .c_header
        h2 {{title}}
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
.c_header {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 30px;
  font-size: 12px;
  h2 {
    display: block;
    line-height: 25px;
    padding-left: 16px;
    margin-left: 30px;
    border-left: 4px solid #00aedd;
    height: 25px;
  }
}
</style>



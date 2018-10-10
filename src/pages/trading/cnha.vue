<template lang="pug">
    div#trading.body-main
        #kline_container
</template>
<script>
// import Kline from "kline";
// import Kline from 'kline';
import KJson from "~/assets/json/kline.json";

export default {
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"
      }
    ]
  },
  computed: {
    Kline_obj: function() {
      return new Kline({
        element: "#kline_container",
        symbol: 2,
        symbolName: "BTC实时交易",
        type: "poll", // poll/stomp
        url: "https://node.btcfoo.com/users/kline",
        // showTrade: false,
        debug: false,
        disableFirebase: true,
        // width: 968,
        height: 500,
        theme: "light",
        intervalTime: 60000
      });
    }
  },
  mounted() {
    console.log(Kline);
    // console.log(require("~/plugins/kline.min.js"));
    this.Kline_obj.draw();

    // console.log(kline);
  }
};
</script>
<style lang="less">
#trading {
  #kline_container {
    padding: 15px 0;
  }
}
</style>


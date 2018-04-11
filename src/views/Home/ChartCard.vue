<template lang="pug">
  el-card
    chart(:options='options' ref='chart' class="chart-card")
</template>

<script>
  export default {
    props: {
      options: {
        type: Object
      },
    },
    methods: {
      resize() {
        this.$refs.chart.resize()
      }
    }
  }
</script>

<style lang='scss'>
  .chart-card {
    width: auto!important;
    height: 280px!important;
  }
</style>

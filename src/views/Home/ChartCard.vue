<template lang="pug">
  el-card
    chart(:options='options', theme='macarons' ref='chart' class="chart-card")
</template>

<script>
  import chart from 'vue-echarts/components/ECharts.vue'
  import 'macarons'
  export default {
    props: {
      options: {
        type: Object
      },
    },
    components: {
      chart
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

<style lang='scss'>
</style>
<template lang='pug'>
  .page(style="overflow: hidden;")
    .home.page(style="overflow: scroll;")
      el-row(:gutter="40" class="number-card-group")
        el-col(:span="6", v-for="(o, index) in 4", :key="o" style="margin-bottom: 24px")
          number-card(title="待指派维修", :number="1024 + index")
      el-card(class="section-bar")
        h4.section-bar-title 每月新签
        el-row(style="overflow: hidden; margin-top: 35px;")
          div(class="progress-group")
            my-progress-item(title="管理租赁房源", :current="133", :total="200")
            my-progress-item(title="管理租赁房源", :current="33", :total="80")
            my-progress-item(title="管理租赁房源", :current="55", :total="200")
          div(class="chart-wrapper")
            chart(
              :options='barOptions'
              theme='macarons' ref='bar'
              class="bar-chart")
      el-row(:gutter="40")
        el-col(:span="12")
          chart-card(:options="complaintOptions" ref='complaintCard')
        el-col(:span="12")
          chart-card(:options="pieOptions" ref='repairCard')

</template>

<script>
  import Chart from 'vue-echarts/components/ECharts.vue'
  import 'macarons'
  import debounce from 'throttle-debounce/debounce'
  import NumberCard from './NumberCard'
  import ChartCard from './ChartCard'
  import getBarOption from './options/bar'
  import getLineOption from './options/line'
  import getPieOption from './options/pie'
  import MyProgressItem from './ProgressItem'

  let xAxisData = []
  let seriesData = []
  for (let i = 0; i < 12; i += 1) {
    xAxisData.push(`${i + 1}月`)
    seriesData.push(Math.floor(Math.random() * 1000) + 200)
  }

  const barOptions = getBarOption(null, seriesData, xAxisData)
  const complaintOptions = getLineOption('每月投诉量', seriesData, xAxisData)

  const seriesData2 = [
                {value: '10', name:'直接访问'},
                {value: '30', name:'邮件营销'},
                {value: '60', name:'联盟广告'}
            ]
  const legendData = ['直接访问','邮件营销','联盟广告'];
  const pieOptions = getPieOption('维修类型占比', seriesData2, legendData)

  export default {
    components: {
      NumberCard,
      ChartCard,
      MyProgressItem,
      Chart
    },

    data() {
      return {
        debounceResize: null,
        barOptions,
        complaintOptions,
        pieOptions
      }
    },

    mounted() {
      let self = this
      this.debounceResize = debounce(300, _ => {
        self.$refs.bar.resize()
        self.$refs.complaintCard.resize()
        self.$refs.repairCard.resize()
      })
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        window.addEventListener('resize', vm.debounceResize)
      })
    },

    beforeRouteLeave(to, from, next) {
      window.removeEventListener('resize', this.debounceResize)
      next()
    }
  }
</script>

<style lang="scss">
  .section-bar {
    margin-bottom: 20px;
    height: 360px;
    position: relative;
    .el-card__body {
      padding-top: 50px;
    }
  }
  .section-bar-title {
    line-height: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding-left: 26px;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
  }
  .bar-chart {
    width: auto!important;
    height: 255px!important;
  }
  .chart-wrapper {
    overflow: hidden;
  }
  .progress-group {
    float: right;
    width: 300px;
    padding-top: 16px;
    margin-left: 63px;
  }
</style>

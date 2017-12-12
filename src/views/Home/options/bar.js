export default (title, seriesData, xAxisData, yAxisData) => {
  return {
    title: {
      show: !!title,
      text: title,
      textStyle: {
        color: '#333',
        fontWeight: 500
      }
    },
    tooltip : {
      trigger: 'item',
      axisPointer : {
        type : 'shadow'
      },
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '6%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      data: xAxisData,
      silent: false,
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: '#666'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dotted'
        }
      },
      splitArea: {
        areaStyle: {
          color: ['white', 'white']
        }
      }
    },
    series: [{
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#409eff'
        }
      },
      data: seriesData,
      barWidth: 40,
      animationDelay(idx) {
        return idx * 10
      }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate(idx) {
      return idx * 5
    }
  }
}

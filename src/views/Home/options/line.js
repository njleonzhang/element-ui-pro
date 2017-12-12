export default (title, seriesData, xAxisData, yAxisData) => {
  return {
    title: {
      text: title,
      textStyle: {
        color: '#333',
        fontWeight: 500
      }
    },
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'white'
        }
      }
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '6%',
      containLabel: true
    },
    xAxis: {
      data: xAxisData,
      silent: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#666'
        }
      },
      axisTick: {
        show: false,
      },
      boundaryGap: false,
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
        show: false
      },
      splitArea: {
        areaStyle: {
          color: ['white', 'white']
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: '#ff3c17'
        }
      },
      stack: 'a',
      areaStyle: {
        normal: {
          color: '#f7bb7b'
        }
      },
      data: seriesData,
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

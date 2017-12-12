export default (title, seriesData, legendData) => {
  return {
    title: {
      text: title,
      textStyle: {
        color: '#333',
        fontWeight: 500
      }
    },
    color: ['#3aa1ff', '#f2637b', '#fbd437', '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    legend: {
      orient: 'vertical',
      top: '45%',
      left: '60%',
      itemGap: 20,
      data: legendData,
      itemGap: 40,
      textStyle: {
        color: '#333',
      }
    },
    // graphic:{
    //   type:'text',
    //   left:'20%',
    //   top:'60%',
    //   style:{
    //     text:'维修总量\n 2309',
    //     textAlign: 'center',
    //     fill:'#000',
    //     width:30,
    //     height:30,
    //     fontSize: 20,
    //   }
    // },
    tooltip : {
      trigger: 'item',
      axisPointer : {
        type : 'shadow'
      },
    },
    series: [{
      type: 'pie',
      radius : [90, 110],
      center : ['24%', '60%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
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

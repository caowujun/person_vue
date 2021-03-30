var ismobile = function () {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  // localStorage.setItem('ismobile', flag ? 1 : 0);
  return flag ? 1 : 0
}

var base64ToBlob = function (base64Data) {
  let byteString
  // atob() 方法用于解码使用 base-64 编码的字符串。base-64 编码使用方法是 btoa() 。
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = atob(base64Data)
  }

  const mimeString = 'image/jpeg' // base64Data.split(',')[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ia], {
    type: mimeString
  })
  return blob
}

var showChart = function (myChart, title, legend, charttype, x, y) {
  // var defaults = {type: 'value'};
  var option = {
    title: {
      text: title
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: legend
    },
    xAxis: [{
      type: 'category',
      data: x
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      type: charttype,
      data: y,
      barWidth: 30,
      markPoint: {
        data: [{
          type: 'max',
          name: '最大值'
        },
        {
          type: 'min',
          name: '最小值'
        }
        ]
      }
    }]
  }
  // 为echarts对象加载数据
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

export default {
  ismobile,
  base64ToBlob,
  showChart
}

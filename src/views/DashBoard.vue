<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-divider content-position="left">面积对比</el-divider>
        <el-card class="box-card1" id="chart1" ref="chart1">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-divider content-position="left">图表2</el-divider>
        <el-card class="box-card1" id="chart2" ref="chart2">

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-divider content-position="left">面积对比</el-divider>
        <el-card class="box-card1" id="chart3" ref="chart3">

        </el-card>
      </el-col>
      <el-col :span="12">
        <el-divider content-position="left">图表2</el-divider>
        <el-card class="box-card1" id="chart4" ref="chart4">

        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  data () {
    return {
      today: {}
    }
  },
  mounted () {
    // this.loadToday();
    // this.getEchartData()
  },
  methods: {
    getEchartData () {
      const chart1 = this.$refs.chart1
      if (chart1) {
        const myChart = this.$echarts.init(document.getElementById('chart1'))
        this.$http.get(this.$apiList.chart1, {
          params: {}
        })
          .then((successResponse) => {
            if (successResponse.data.code === '0') {
              const x = successResponse.data.data.map(f => f.x)
              const y = successResponse.data.data.map(f => f.y)
              this.$local.showChart(myChart, '', ['对比'], 'bar', x, y)
            }
          })
          .catch((error) => {
            console.log(error) // 异常
          })
      }
      this.$on('hook:destroyed', () => {
        window.removeEventListener('resize', function () {
          // myChart.resize()
        })
      })
    },
    loadToday () {
      this.$http.get(this.$apiList.todayshow, {
        params: {}
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === '0') {
            this.today = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    }
  }
}
</script>

<style scoped>
  .box-card {
    border-radius: 10px;
    height: 200px;
  }

  .box-card1 {
    border-radius: 10px;
    height: 250px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>

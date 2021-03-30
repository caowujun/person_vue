<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50; 
  }

  body {
    margin: 0
  }

 
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card__header1 {
    text-align: left;
    /* border-bottom: 0px; */
    padding: 5px 10px;
  }

  /* .el-card__body{
  float:left;
} */
  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .orange {
    color: orange
  }

  .el-page-header__content {
    font-size: 14px;
    font-weight: 500;
  }

  .el-form-item {
    text-align: left;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .input380 {
    width: 380px;
  }

  .input280 {
    width: 280px;
  }

  .input150 {
    width: 150px;
  }

  .input580 {
    width: 580px;
  }

  /* 可展开table,在页面内部不起作用 */
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
    float: right;
  }

  .el-form--label-left .el-form-item__label {
    text-align: right;
  }
  /* 可展开table,在页面内部不起作用 */
</style>

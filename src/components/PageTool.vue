<template>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
  :current-page="current" :total="total"  :page-size="pagesize"
    :page-sizes="pageArray"
   background layout="total, sizes, prev, pager, next, jumper"
   style="text-align: right;margin-top: 20px;">
  </el-pagination>
</template>

<script>
export default {
  data () {
    return {
      pageArray: this.$customconfig.pageArray,
      loading: true
    }
  },
  props: {
    total: Number,
    current: Number,
    pagesize: Number
  },
  method: {
    handleSizeChange (val) {
      // this.props.pagesize = val
      this.$emit('sizechange', val)
    },
    handleCurrentChange (val) {
      // this.props.current = val
      this.$emit('@pagechange', val)
    }
  }
}
</script>

<style>
</style>

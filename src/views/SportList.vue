<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        运动列表</span>
    </div>
    <el-form :inline="true" class="demo-form-inline" style="text-align: left;" ref="form" size="small">
      <el-form-item>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">

      <el-table-column label="体重" prop="weight">
      </el-table-column>
      <el-table-column label="运动" prop="sex">
      </el-table-column>
      <el-table-column label="备注" prop="note">
      </el-table-column>

      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
      :page-sizes="[10, 25, 50, 100]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="text-align: right;margin-top: 20px;">
    </el-pagination>
  </el-card>
</template>

<script>
// import api from "@/assets/js/api.js"

export default {
  data () {
    return {
      tableData: [],
      current: 1,
      pagesize: 10,
      total: 25,
      loading: true
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.replace({
        name: 'SportEdit',
        query: {
          id: row.id
        }
      })
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('数据将被删除, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apiList.deletesport, {
          params: {
            id: row.id
          }
        })
          .then(successResponse => {
            console.log(successResponse)
            if (successResponse.data.code === '0') {
              this.loadList()
              this.$notify.success()
            } else {
              this.$notify.warning()
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$notify.error()
          })
      }).catch(() => {})
    },
    handleSizeChange (val) {
      this.$data.pagesize = val
      this.loadList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadList()
      console.log(`当前页: ${val}`)
    },
    loadList () {
      this.$http.get(this.$apiList.sportlist, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === '0') {
            this.tableData = successResponse.data.data.records
            this.total = successResponse.data.data.total
          }
          this.loading = false
          console.log(successResponse.data) // 请求的返回体
        })
        .catch((error) => {
          this.loading = false
          console.log(error) // 异常
        })
    },

    // onSubmit() {
    //   this.loadUserList();
    // },
    // onReset() {
    //   this.$refs.form.resetFields();
    //   this.loadUserList();
    // },
    onAdd () {
      this.$router.replace({
        name: 'SportEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

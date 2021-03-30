<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        用户列表</span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form" size="small">
      <el-form-item prop="cnname">
        <el-input v-model="formInline.cnname" placeholder="姓名"  class="input150"></el-input>
      </el-form-item>

<!--      <el-form-item prop="idcard">
        <el-input v-model="formInline.idcard" placeholder="身份证号" class="input150"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="warning" plain @click="onReset" size="small" icon="el-icon-refresh">重置</el-button>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">

      <el-table-column label="姓名" prop="cnname">
      </el-table-column>
<!--      <el-table-column label="身份证号" prop="idcard">
      </el-table-column> -->
      <el-table-column label="手机号" prop="phonenum">
      </el-table-column>
      <el-table-column label="登录名" prop="username">
      </el-table-column>
      <el-table-column label="账号状态" prop="isenable">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" class="red">禁用</span>
          <span v-if="scope.row.status === 1" class="green">启用</span>
          <!-- <span :class="scope.row.isenable === 0 ? 'red':'green'">{{scope.row.isenable==0?"禁用":"启用"}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-button size="mini" type="danger" plain v-if="scope.row.status==1" @click="changeStatus(scope.$index, scope.row)"
            icon="el-icon-lock">禁用</el-button>
          <el-button size="mini" type="primary" plain v-else @click="changeStatus(scope.$index, scope.row)" icon="el-icon-unlock">启用</el-button>
          <el-button size="mini" @click="assign(scope.$index, scope.row)" icon="el-icon-edit">分配</el-button>
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
      formInline: {
        cnname: ''
        // idcard: ''
      },
      current: 1,
      pagesize: 10,
      total: 25,
      loading: true
    }
  },
  mounted () {
    this.loadUserList()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.replace({
        name: 'UserEdit',
        query: {
          id: row.id
        }
      })
      console.log(index, row)
    },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },
    handleSizeChange (val) {
      this.$data.pagesize = val
      this.loadUserList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadUserList()
      console.log(`当前页: ${val}`)
    },
    assign (index, row) {
      this.$router.replace({
        name: 'UserAssign',
        query: {
          id: row.id
        }
      })
      console.log(index, row)
    },
    loadUserList () {
      this.$http.get(this.$apiList.userpage, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize,
          cnname: this.$data.formInline.cnname
          // ,
          // idcard: this.$data.formInline.idcard
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
    changeStatus (index, row) {
      this.$http.post(this.$apiList.updateuserstatus, {
        id: row.id,
        status: row.status === 0 ? 1 : 0
      })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === '0') {
            row.status = row.status === 0 ? 1 : 0
            this.$notify.success()
          } else {
            this.$notify.warning()
          }
        })
        .catch(failResponse => {
          console.log(failResponse)
          this.$notify.error()
        })
    },
    onSubmit () {
      this.loadUserList()
    },
    onReset () {
      this.$refs.form.resetFields()
      this.loadUserList()
    },
    onAdd () {
      this.$router.replace({
        name: 'UserEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

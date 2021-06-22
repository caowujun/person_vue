<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
          {{$t('sidemenu.userlist')}}</span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form" size="small">
      <el-form-item prop="cnname">
        <el-input v-model="formInline.cnname" :placeholder="$t('user.cnname')"  class="input150"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit" size="small" icon="el-icon-search"> {{$t('form.search')}}
        </el-button>
        <el-button type="warning" plain @click="onReset" size="small" icon="el-icon-refresh"> {{$t('form.refresh')}}
        </el-button>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">
          {{$t('form.add')}} </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading"  :element-loading-text="$t('common.loading')"
      element-loading-spinner="el-icon-loading">

      <el-table-column :label="$t('user.cnname')" prop="cnname">
      </el-table-column>
      <el-table-column label="$t('user.phonenum')" prop="phonenum">
      </el-table-column>
      <el-table-column label="$t('user.username')" prop="username">
      </el-table-column>
     <el-table-column :label="$t('customconfig.status')" prop="status">
        <template slot-scope="scope">
 <span v-if="scope.row.status === 0" class="red">{{$t('common.disenable')}}</span>
         <span v-if="scope.row.status === 1" class="green">{{$t('common.enbale')}}</span>
          <!-- <span :class="scope.row.isenable === 0 ? 'red':'green'">{{scope.row.isenable==0?"禁用":"启用"}}</span> -->
        </template>
      </el-table-column>
    <el-table-column :label="$t('common.operation')" align="center" width="300px">
      <template slot-scope="scope">
        <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">
          {{$t('form.edit')}}</el-button>
        <el-button size="mini" type="danger" plain v-if="scope.row.status==1"
          @click="changeStatus(scope.$index, scope.row)" icon="el-icon-lock">{{$t('common.disenable')}}</el-button>
        <el-button size="mini" type="primary" plain v-else @click="changeStatus(scope.$index, scope.row)"
          icon="el-icon-unlock">{{$t('common.enbale')}}</el-button>
             <el-button size="mini" plain @click="assign(scope.$index, scope.row)" icon="el-icon-edit">{{$t('form.assign')}}</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="pageArray"
      :page-size="pagesize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: right; margin-top: 20px"
    >
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
      },
      pageArray: this.$customconfig.pageArray,
      pagesize: this.$customconfig.pagesize,
      total: 0,
      current: 1,
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
    handleSizeChange (val) {
      this.$data.pagesize = val
      this.loadUserList()
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadUserList()
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
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
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
          if (successResponse.data.code === 0) {
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

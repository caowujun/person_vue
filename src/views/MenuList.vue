<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
         {{$t('sidemenu.menulist')}}</span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form" size="small">
      <el-form-item prop="title">
        <el-input v-model="formInline.title" :placeholder="$t('menu.menuname')" class="input150"></el-input>
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
      <el-table-column label="菜单名称" prop="title">
        <template slot-scope="scope">
          {{scope.row.parentid==="root"?scope.row.title:"-----"+scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="菜单链接地址" prop="actionurl">
      </el-table-column>
      <el-table-column label="图标" prop="icon">
      </el-table-column>
    <el-table-column :label="$t('menu.status')"  prop="status">
      <template slot-scope="scope">
        <span v-if="scope.row.status === 0" class="red">{{$t('common.disenable')}}</span>
        <span v-if="scope.row.status === 1" class="green">{{$t('common.enbale')}}</span>
      </template>
    </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" plain v-if="scope.row.status==1" @click="changeStatus(scope.$index, scope.row)"
            icon="el-icon-lock">禁用</el-button>
          <el-button size="mini" type="primary" plain v-else @click="changeStatus(scope.$index, scope.row)" icon="el-icon-unlock">启用</el-button>
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
        title: ''
      },
      pageArray: this.$customconfig.pageArray,
      pagesize: this.$customconfig.pagesize,
      total: 0,
      current: 1,
      loading: true
    }
  },
  mounted () {
    this.loadMenuList()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.replace({
        name: 'MenuEdit',
        query: {
          id: row.id
        }
      })
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.$data.pagesize = val
      this.loadMenuList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadMenuList()
      console.log(`当前页: ${val}`)
    },
    loadMenuList () {
      this.$http.get(this.$apiList.menupage, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize,
          title: this.$data.formInline.title
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.tableData = successResponse.data.data.records
            this.total = successResponse.data.data.total
          }
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error) // 异常
        })
    },
    changeStatus (index, row) {
      this.$http.post(this.$apiList.updatemenustatus, {
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
      this.loadMenuList()
    },
    onReset () {
      // this.$data.formInline.title = "";
      this.$refs.form.resetFields()
      this.loadMenuList()
    },
    onAdd () {
      this.$router.replace({
        name: 'MenuEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

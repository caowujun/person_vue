<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        {{$t('sidemenu.customconfiglist')}}</span>
    </div>
    <el-form :inline="true" :model="formInline" style="text-align: left;" ref="form" size="small">
      <el-form-item prop="configkey">
        <el-input v-model="formInline.configkey" :placeholder="$t('customconfig.configkey')" class="input150">
        </el-input>
      </el-form-item>
      <el-form-item prop="description">
        <el-input v-model="formInline.description" :placeholder="$t('customconfig.note')" class="input150"></el-input>
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
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading"
      :element-loading-text="$t('common.loading')" element-loading-spinner="el-icon-loading">
      <el-table-column type="index" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column :label="$t('customconfig.configkey')" prop="configkey">
      </el-table-column>
      <el-table-column label="$t('customconfig.configvalue')" prop="configvalue">
      </el-table-column>
      <el-table-column :label="$t('customconfig.note')" prop="note">
      </el-table-column>
      <el-table-column :label="$t('customconfig.status')" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" class="red">{{$t('common.disenable')}}</span>
          <span v-if="scope.row.status === 1" class="green">{{$t('common.enbale')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">
            {{$t('form.edit')}}</el-button>
          <el-button size="mini" type="danger" plain v-if="scope.row.status==1"
            @click="changeStatus(scope.$index, scope.row)" icon="el-icon-lock">{{$t('common.disenable')}}</el-button>
          <el-button size="mini" type="primary" plain v-else @click="changeStatus(scope.$index, scope.row)"
            icon="el-icon-unlock">{{$t('common.enbale')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
      :page-sizes="pageArray" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="text-align: right; margin-top: 20px">
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
        configkey: '',
        description: ''
      },
      pageArray: this.$customconfig.pageArray,
      pagesize: this.$customconfig.pagesize,
      total: 0,
      current: 1,
      loading: true
    }
  },
  mounted () {
    this.loadCustomConfigList()
  },
  methods: {
    indexMethod (index) {
      return this.pagesize * (this.current - 1) + index + 1
    },
    handleEdit (index, row) {
      this.$router.replace({
        name: 'CustomConfigEdit',
        query: {
          id: row.id
        }
      })
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.$data.pagesize = val
      this.loadCustomConfigList()
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadCustomConfigList()
    },
    loadCustomConfigList () {
      this.$http.get(this.$apiList.customconfigpage, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize,
          configkey: this.$data.formInline.configkey,
          description: this.$data.formInline.description
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.tableData = successResponse.data.data.records
            this.total = successResponse.data.data.total
          }
          this.loading = false
          console.log(successResponse.data.data) // 请求的返回体
        })
        .catch((error) => {
          this.loading = false
          console.log(error) // 异常
        })
    },
    changeStatus (index, row) {
      this.$http.post(this.$apiList.updatecustomconfigstatus, {
        id: row.id,
        isenable: row.isenable === 0 ? 1 : 0
      })
        .then(successResponse => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            row.isenable = row.isenable === 0 ? 1 : 0
            this.$notify.success()
          } else {
            this.$notify.warning()
            // alert(successResponse.data.msg);
          }
        })
        .catch(failResponse => {
          console.log(failResponse)
          this.$notify.error()
          // alert(failResponse);
        })
    },
    onSubmit () {
      this.loadCustomConfigList()
    },
    onReset () {
      this.$refs.form.resetFields()
      this.loadCustomConfigList()
    },
    onAdd () {
      this.$router.replace({
        name: 'CustomConfigEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

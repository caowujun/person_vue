<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        {{$t('sidemenu.gasolinelist')}}
      </span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form"
      size="small">
      <el-form-item>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">
          {{$t('form.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading"
      :element-loading-text="$t('common.loading')" element-loading-spinner="el-icon-loading">

      <el-table-column :label="$t('form.recorddate')" prop="recorddate" :formatter="dateFormat">
      </el-table-column>
      <el-table-column :label="$t('gasoline.spendmoney')" prop="spendnum">
      </el-table-column>
      <el-table-column :label="$t('gasoline.mileage')" prop="note">
      </el-table-column>
       <el-table-column :label="$t('gasoline.Kilometer')" prop="note">
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">
            {{$t('form.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"> {{$t('form.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" current-page="1"
      :page-sizes="pageArray" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="text-align: right;margin-top: 20px;">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pageArray: this.$customconfig.pageArray,
      pagesize: this.$customconfig.pagesize,
      total: this.$customconfig.total,
      loading: true
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.$http.get(this.$apiList.gasolinepage, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.tableData = successResponse.data.data.records
            this.total = successResponse.data.data.total
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    dateFormat (row, column, cellValue, index) {
      return this.$local.dateFormaterLong(cellValue)
    },
    // mcFormat (row, column, cellValue, index) {
    //   return this.$local.dateFormaterLong(cellValue)
    // },
    handleEdit (index, row) {
      this.$router.replace({
        name: 'GasolineEdit',
        query: {
          id: row.id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(this.$t('tip.deleteconfirm'), this.$t('tip.title'), {
        confirmButtonText: this.$t('tip.confirm'),
        cancelButtonText: this.$t('tip.cancel'),
        type: 'warning'
      }).then(() => {
        this.$http.get(this.$apiList.deletegasoline, {
          params: {
            id: row.id
          }
        })
          .then(successResponse => {
            if (successResponse.data.code === 0) {
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
    },
    handleCurrentChange (val) {
      this.$data.current = val
      this.loadList()
    },
    onSubmit () {
      this.loadList()
    },
    onReset () {
      this.$refs.form.resetFields()
      this.loadList()
    },
    onAdd () {
      this.$router.replace({
        name: 'GasolineEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        {{$t('sidemenu.moneylist')}}
      </span>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form"
      size="small">
      <el-form-item prop="note">
        <el-input v-model="formInline.note" :placeholder="$t('money.note')" class="input150"></el-input>
      </el-form-item>
      <el-form-item prop="moneyclassification">
        <el-select v-model="formInline.moneyclassification" :placeholder="$t('money.moneyclassification')" class="input150">
          <el-option v-for="item in moneyclassifications" :label="item.enumname" :value="item.enumvalue" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit" size="small" icon="el-icon-search"> {{$t('form.search')}}
        </el-button>
        <el-button type="warning" plain @click="onReset" size="small" icon="el-icon-refresh"> {{$t('form.reset')}}
        </el-button>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">
          {{$t('form.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading"
      :element-loading-text="$t('common.loading')" element-loading-spinner="el-icon-loading">

      <el-table-column :label="$t('form.recorddate')" prop="recorddate" :formatter="dateFormat">
      </el-table-column>
      <el-table-column :label="$t('money.spendnum')" prop="spendnum">
      </el-table-column>
      <el-table-column :label="$t('money.note')" prop="note">
      </el-table-column>
      <el-table-column :label="$t('money.type')" prop="moneytype">
        <template slot-scope="scope">
          <span v-if="scope.row.moneytype === 0" class="red"> {{$t('money.out')}}</span>
          <span v-if="scope.row.moneytype === 1" class="green"> {{$t('money.in')}}</span>
        </template>
      </el-table-column>
       <el-table-column :label="$t('money.moneyclassification')" prop="moneyclassification" :formatter="mcFormat">
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
      formInline: {
        note: '',
        moneyclassification: ''
      },
      moneyclassifications: [],
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
      this.$http.get(this.$apiList.moneypage, {
        params: {
          current: this.$data.current,
          size: this.$data.pagesize,
          note: this.$data.formInline.note,
          moneyclassification: this.$data.formInline.moneyclassification
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
    loadenumconfig () {
      this.$http.get(this.$apiList.loadenumconfigByKey, {
        params: {
          enumname: 'MONEYCLASSIFICATION'
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.moneyclassifications = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    dateFormat (row, column, cellValue, index) {
      return this.$local.dateFormaterLong(cellValue)
    },
    mcFormat (row, column, cellValue, index) {
      return this.$local.dateFormaterLong(cellValue)
    },
    handleEdit (index, row) {
      this.$router.replace({
        name: 'MoneyEdit',
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
        this.$http.get(this.$apiList.deletemoney, {
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
      this.loadenumconfig()
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
        name: 'MoneyEdit'
      })
    }
  }
}
</script>

<style scoped>

</style>

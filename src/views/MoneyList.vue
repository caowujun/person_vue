<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix el-card__header1">
      <span>
        <i class="el-icon-share"></i>
        {{$t('sidemenu.moneylist')}}
      </span>
    </div>

	<el-form :inline="true" :model="formInline" style="text-align: left;" ref="form" size="small">

	 <el-form-item>
        <el-button type="warning" plain @click="onReset" size="small" icon="el-icon-refresh"> {{$t('form.refresh')}}
        </el-button>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">
          {{$t('form.add')}} </el-button>
	 </el-form-item>
	</el-form>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;" ref="form"
      size="small">
      <el-form-item prop="note">
        <el-input v-model="formInline.note" :placeholder="$t('money.note')" class="input150"></el-input>
      </el-form-item>
      <el-form-item prop="consumptiontype">
        <el-select v-model="formInline.consumptiontype" :placeholder="$t('money.consumptiontype')" class="input150">
          <el-option v-for="item in consumptiontypes" :label="item.enumname" :value="item.enumvalue" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit" size="small" icon="el-icon-search"> {{$t('form.search')}}
        </el-button>
        <el-button type="warning" plain @click="onReset" size="small" icon="el-icon-refresh"> {{$t('form.reset')}}
        </el-button>
        <el-button type="success" plain @click="onAdd" size="small" icon="el-icon-circle-plus-outline">
          {{$t('form.add')}}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border stripe size="small" v-loading="loading"
      :element-loading-text="$t('common.loading')" element-loading-spinner="el-icon-loading">

      <el-table-column :label="$t('money.date')" prop="recorddate" :formatter="dateFormat">
      </el-table-column>
      <el-table-column :label="$t('money.spendnum')" prop="spendnum">
      </el-table-column>
      <!--      <el-table-column :label="$t('money.note')" prop="note">
      </el-table-column> -->
      <el-table-column :label="$t('money.type')" prop="moneytype">
        <template slot-scope="scope">
          <span v-if="scope.row.moneytype === 0" class="red"> {{$t('money.out')}}</span>
          <span v-if="scope.row.moneytype === 1" class="green"> {{$t('money.in')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('money.consumptiontype')" prop="consumptiontype" :formatter="mcFormat">
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">
            {{$t('form.edit')}}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"  icon="el-icon-delete"> {{$t('form.delete')}}
          </el-button>
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
export default {
  data () {
    return {
      tableData: [],
      formInline: {
        note: '',
        consumptiontype: ''
      },
      consumptiontypes: [],
      pageArray: this.$customconfig.pageArray,
      pagesize: this.$customconfig.pagesize,
      total: 0,
      current: 1,
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
          consumptiontype: this.$data.formInline.consumptiontype
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
          enumname: 'consumptiontype'
        }
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.consumptiontype = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    dateFormat (row, column, cellValue, index) {
      return new Date(cellValue).Format('yyyy-MM-dd')
    },
    mcFormat (row, column, cellValue, index) {
      const filterConsumption = this.consumptiontype.filter(f => f.enumvalue === cellValue)
      if (filterConsumption && filterConsumption.size > 0) {
        return filterConsumption[0].enumname
      } else { return '' }
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
      this.$local.confirm(() => {
        this.$http
          .post(this.$apiList.deletemoney, this.$qs.stringify({
            id: row.id
          }))
          .then((successResponse) => {
            if (successResponse.data.code === 0) {
              this.loadList()
              this.$notify.success()
            } else {
              this.$notify.warning()
            }
          })
          .catch((failResponse) => {
            console.log(failResponse)
            this.$notify.error()
          })
      })
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

<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">

      <el-form-item label="日期" prop="recorddate">
        <el-date-picker  v-model="form.recorddate" type="date" class="input380" placeholder="选择日期" format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"  >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="金额" prop="spendnum">
        <el-input v-model.number="form.spendnum" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.note" class="input380"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.moneytype">
          <el-radio :label="0">支出</el-radio>
          <el-radio :label="1">收入</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check">保存</el-button>
        <el-button @click="goBack" plain icon="el-icon-circle-close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  // name: 'MoneyEdit',
  data () {
    return {
      form: {
        id: '',
        recorddate: new Date(),
        spendnum: '',
        note: '',
        moneytype: 0 // 开关不支持数值类型
      },
      id: '',
      rules: {
        recorddate: [{
          required: true,
          message: '请选择日期',
          trigger: 'blur'
        }],
        spendnum: [{
          required: true,
          message: '请正确填写金额',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    pagetitle: function () {
      return this.id === undefined ? '新增' : '编辑'
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/moneylist'
      })
      console.log('go back')
    },
    loadData () {
      this.$http.get(this.$apiList.loadmoneybyid, {
        params: {
          id: this.id
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === '0') {
            this.form = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post(this.$apiList.savemoney, this.form)
            .then(successResponse => {
              if (successResponse.data.code === '0') {
                this.$notify.success()
                this.id = successResponse.data.data
              } else {
                this.$notify.warning()
              }
            })
            .catch(failResponse => {
              console.log(failResponse)
              this.$notify.error()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    if (this.$route.query.id !== undefined) {
      this.loadData()
    }
  }
}
</script>
<style scoped="scoped">
  .input {
    width: 380px;
  }
</style>

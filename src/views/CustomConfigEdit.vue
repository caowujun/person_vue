<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">
      <el-form-item label="关键字" prop="configkey">
        <el-input v-model.trim="form.configkey" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="关键字值" prop="configvalue">
        <el-input v-model.trim="form.configvalue" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input v-model.trim="form.description" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="form.isenable"></el-switch>
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
  data () {
    return {
      form: {
        id: '',
        configkey: '',
        configvalue: '',
        description: '',
        isenable: true // 开关不支持数值类型
      },
      customconfigid: '',
      rules: {
        configkey: [{
          required: true,
          message: '关键字不能为空',
          trigger: 'blur'
        }],
        configvalue: [{
          required: true,
          message: '关键字值不能为空',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '说明不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    isnew: function () {
      return this.customconfigid === undefined
    },
    pagetitle: function () {
      return this.customconfigid === undefined ? '新增' : '编辑'
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/customconfiglist'
      })
      console.log('go back')
    },
    loadData () {
      this.$http.get(this.$apiList.loadcustomconfigbyid, {
        params: {
          id: this.customconfigid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            successResponse.data.data.isenable = successResponse.data.data.isenable !== 0
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
          this.$data.form.isenable = this.$data.form.isenable === true ? 1 : 0
          this.$http.post(this.$apiList.savecustomconfig, this.form)
            .then(successResponse => {
              console.log(successResponse)
              if (successResponse.data.code === 0) {
                this.$notify.success()
                this.goBack()
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
    this.customconfigid = this.$route.query.id
    if (this.$route.query.id !== undefined) {
      this.loadData()
    }
  }

}
</script>

<style scoped="scoped">

</style>

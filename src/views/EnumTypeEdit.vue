<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">
      <el-form-item :label="$t('enumtype.enumname')" prop="enumname">
        <el-input v-model.trim="form.enumname" class="input380"></el-input>
      </el-form-item>
      <el-form-item :label="$t('enumtype.enumvalue')" prop="enumvalue">
        <el-input v-model.trim="form.enumvalue" class="input380"></el-input>
      </el-form-item>
            <el-form-item :label="$t('enumtype.enumtype')" prop="enumtype">
        <el-input v-model.trim="form.enumtype" class="input380"></el-input>
      </el-form-item>
      <el-form-item :label="$t('enumtype.note')" prop="note">
        <el-input v-model.trim="form.note" class="input380"></el-input>
      </el-form-item>
      <el-form-item :label="$t('enumtype.status')">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check" size="small"> {{$t('form.save')}}
      </el-button>
      <el-button @click="goBack" plain icon="el-icon-circle-close" size="small"> {{$t('form.cancel')}}</el-button>
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
        enumname: '',
        enumvalue: '',
        description: '',
        enumtype: '',
        isenable: true // 开关不支持数值类型
      },
      id: '',
      rules: {
        enumname: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        }],
        enumvalue: [{
          required: true,
           message: this.$t('rule.required'),
          trigger: 'blur'
        }],
        enumtype: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    pagetitle: function () {
      return this.$t('sidemenu.enumtypelist') + '/' + this.id === undefined ? this.$t('form.add') : this.$t(
        'form.edit')
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
          id: this.id
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
    this.id = this.$route.query.id
    if (this.$route.query.id !== undefined) {
      this.loadData()
    }
  }

}
</script>

<style scoped="scoped">

</style>

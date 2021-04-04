<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">

      <el-form-item label="体重" prop="weight">
        <el-input v-model="form.weight" class="input380"  ></el-input>
      </el-form-item>
      <el-form-item label="运动" prop="sex">
        <el-input v-model="form.sex" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="备份" prop="note">
        <el-input v-model="form.note" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="recorddate">
        <el-input v-model="form.recorddate" class="input380"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check">保存</el-button>
        <el-button @click="goBack" plain icon="el-icon-circle-close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  validateDate
} from '@/assets/js/rules.js'

export default {
  // name: 'SportEdit',
  data () {
    return {
      form: {
        id: '',
        weight: '',
        sex: '',
        note: '',
        recorddate: ''
      },
      userid: '',
      rules: {
        recorddate: [{
          required: true,
          message: '日期不能为空',
          trigger: 'blur'
        }, {
          validator: validateDate,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    pagetitle: function () {
      return this.userid === undefined ? '新增' : '编辑'
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/userlist'
      })
      console.log('go back')
    },
    loadData () {
      this.$http.get(this.$apiList.loaduserbyid, {
        params: {
          id: this.userid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            successResponse.data.data.status = successResponse.data.data.status !== 0

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
          this.$data.form.status = this.$data.form.status === true ? 1 : 0

          this.$http.post(this.$apiList.saveuser, this.form)
            .then(successResponse => {
              console.log(successResponse)
              if (successResponse.data.code === 0) {
                this.$notify.success()
                this.userid = successResponse.data.data
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
    this.userid = this.$route.query.id
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

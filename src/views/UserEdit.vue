<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">

      <el-form-item label="登录名" prop="username">
        <el-input v-model="form.username" class="input" :disabled="this.userid === undefined?false:true"></el-input>
      </el-form-item>

      <el-form-item label="中文名" prop="cnname">
        <el-input v-model="form.cnname" class="input380"></el-input>
      </el-form-item>
<!--      <el-form-item label="身份证号" prop="idcard">
        <el-input v-model="form.idcard" class="input380"></el-input>
      </el-form-item> -->
      <el-form-item label="手机号" prop="phonenum">
        <el-input v-model="form.phonenum" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="form.status"></el-switch>
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
  validatePhone,
  // validateIdNo,
  validateChina,
  validateCode
} from '@/assets/js/rules.js'

export default {
  // name: 'UserEdit',
  data () {
    return {
      form: {
        id: '',
        cnname: '',
        // idcard: '',
        phonenum: '',
        status: true // 开关不支持数值类型
      },
      userid: '',
      rules: {
        username: [{
          required: true,
          message: '登录名不能为空',
          trigger: 'blur'
        }, {
          validator: validateCode,
          trigger: 'blur'
        }],
        cnname: [{
          required: true,
          message: '中文名不能为空',
          trigger: 'blur'
        }, {
          validator: validateChina,
          trigger: 'blur'
        }],
        // idcard: [{
        //   required: true,
        //   message: "身份照号不能为空",
        //   trigger: "blur"
        // }, {
        //   validator: validateIdNo,
        //   trigger: 'blur'
        // }],
        phonenum: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        }, {
          validator: validatePhone,
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

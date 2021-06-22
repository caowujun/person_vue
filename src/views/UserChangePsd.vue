<template>
  <el-dialog :title="$t('user.modifypsd')" :visible.sync="isshow" width="33%">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" hide-required-asterisk status-icon
      size="small">

      <el-form-item :label="$t('user.oldpsd')" prop="oldpsd">
        <el-input v-model="form.oldpsd" class="input" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.newpsd')" prop="newpsd">
        <el-input v-model="form.newpsd" class="input" show-password></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.confirmpsd')" prop="confirmnewpsd">
        <el-input v-model="form.confirmnewpsd" class="input" show-password></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close"> {{$t('tip.cancel')}}</el-button>
      <el-button type="primary" @click="save"> {{$t('tip.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  validatePsdReg, validateConfirmPsdReg
} from '@/assets/js/rules.js'

export default {
  name: 'UserChangePsd',
  data () {
    // const validateConfirmPsdReg = (rule, value, callback) => {
    //   if (!value) {
    //     let message = this.$t('rule.validatePsdReg'),
    //       return callback(new Error(message))
    //   }
    //   if (value !== this.form.newpsd) {
    //     let message = this.$t('rule.psdInconsistent'),
    //       callback(new Error(message))
    //   } else {
    //     callback()
    //   }
    // }

    return {
      form: {
        oldpsd: '',
        newpsd: '',
        confirmnewpsd: ''
      },
      rules: { // 校验表单规则
        oldpsd: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        }],
        newpsd: [{
          validator: validatePsdReg,
          trigger: 'blur',
          message: this.$t('rule.validatepsdreg')
        },
        {
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        }
        ],
        confirmnewpsd: [
          {
            required: true,
            message: this.$t('rule.required'),
            trigger: 'blur'
          },
          {
            validator: validateConfirmPsdReg,
            trigger: 'blur',
            newpsd: this.form.newpsd,
            message: this.$t('rule.validateconfirmpsdreg')
          }]
      }
    }
  },
  props: {
    dialogFormVisible: Boolean
  },
  computed: {
    isshow: {
      // getter
      get: function () {
        return this.dialogFormVisible
      },
      // setter,点X关闭dialog的时候会执行set方法
      set: function (newValue) {
        this.close()
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    close (newValue) { // 点关闭按钮的时候执行close，同时把点dialog的X 的转过来一起执行
      this.$refs.form.resetFields()
      this.$emit('close-dialog', {})
    },
    save () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post(this.$apiList.changepsd, {
            loginname: this.$store.state.user.loginname,
            oldpsd: this.$md5(this.form.oldpsd),
            newpsd: this.$md5(this.form.newpsd),
            confirmnewpsd: this.$md5(this.form.confirmnewpsd)
          })
            .then(successResponse => {
              if (successResponse.data.code === 0) {
                this.$notify.success()

                this.close()
                var that = this
                setTimeout(
                  function () {
                    that.$store.commit('logout')
                    that.$router.replace({
                      path: '/weblogin'
                    })
                  },
                  1000)
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
    },
    loadData () {
      this.$http.get(this.$apiList.loaduserbyloginname, {
        params: {
          loginname: this.$store.state.user.loginname
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.form = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    }
  }
}
</script>

<style>
</style>

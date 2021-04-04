<template>
  <el-dialog title="个人基本信息" :visible.sync="isshow" width="33%">
    <el-form ref="form" :model="form" label-width="150px" hide-required-asterisk status-icon size="small">
      <el-form-item label="中文名" prop="cnname">
        <el-input v-model="form.cnname" class="input"></el-input>
      </el-form-item>
<!--      <el-form-item label="身份证号" prop="idno">
        <el-input v-model="form.idno" class="input"></el-input>
      </el-form-item> -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" class="input"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="loginname">
        <el-input v-model="form.loginname" class="input"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="close">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      form: {
        cnname: '',
        // idno: '',
        phone: '',
        loginname: ''
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
      this.$emit('close-dialog', {
        // newvalue: newValue
      })
    },
    loadData () {
      this.$http.get(this.$apiList.loaduserbyloginname, {
        params: {
          loginname: this.$store.state.user.loginname
        }
      })
        .then((successResponse) => {
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

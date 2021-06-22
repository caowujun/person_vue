<template>
  <el-dialog :title="$t('user.personinfo')" :visible.sync="isshow" width="33%">
    <el-form ref="form" :model="form" label-width="150px" hide-required-asterisk status-icon size="small">
      <el-form-item :label="$t('user.cnname')" prop="cnname">
        <el-input v-model="form.cnname" class="input"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.phonenum')" prop="phonenum">
        <el-input v-model="form.phonenum" class="input"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.username')" prop="username">
        <el-input v-model="form.username" class="input"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
     <el-button @click="close"> {{$t('tip.cancel')}}</el-button>
     <el-button type="primary" @click="close"> {{$t('tip.confirm')}}</el-button>
      <!-- <el-button type="primary" @click="close">{{$t('tip.close')}}</el-button> -->
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
        phonenum: '',
        username: ''
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
          username: this.$store.state.user.username
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

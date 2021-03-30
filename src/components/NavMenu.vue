<template>
  <el-menu :default-active="activeIndex" class="topmenu" mode="horizontal" @select="handleSelect"    background-color="#545c64"
   text-color="#fff" active-text-color="#ffd04b" router>
    <span style=" float:left;padding:20px;color:#ffffff;font-size: 18px;">{{webtitle}}</span>
    <el-submenu index="2" style=" float: right;padding-right: 0px;">
      <template slot="title"> {{cnname}}</template>
      <el-menu-item @click="showuserinfo">个人信息</el-menu-item>
      <el-menu-item @click="changepsd">修改密码</el-menu-item>
      <el-menu-item @click="loginout">注销登录</el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      cnname: '',
      webtitle: ''
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    showuserinfo () {
      this.$emit('show-userinfo', {})
    },
    changepsd () {
      this.$emit('change-psd', {})
    },
    loginout () {
      this.$store.commit('logout')
      this.$router.replace({
        path: '/login'
      })
    },
    load () {
      this.cnname = '你好，' + this.$store.state.user.cnname

      this.$http.get(this.$apiList.loadcustomconfigByKey, {
        params: {
          configkey: 'webtitle'
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === '0') {
            this.webtitle = successResponse.data.data.configvalue
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

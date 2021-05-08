<template>
  <el-menu :default-active="activeIndex"   mode="horizontal" @select="handleSelect"    background-color="#2C3E50"
   text-color="#fff" active-text-color="#ffd04b" router>
      <!-- 225c64 -->
<img style="height:40px;width:40px;float:left;margin-top: 10px;" src="../assets/logo.png" />
    <span style=" float:left;padding:20px;color:#ffffff;font-size: 16px;">{{$t('navartop.title')}}</span>
    <el-submenu index="2" style=" float: right;padding-right: 0px;">
      <template slot="title">{{$t('navartop.hello')}} {{cnname}}</template>
      <el-menu-item @click="showuserinfo">{{$t('navartop.personinfo')}}</el-menu-item>
      <el-menu-item @click="changepsd">{{$t('navartop.pwdmodify')}}</el-menu-item>
      <el-menu-item @click="loginout">{{$t('navartop.logout')}}</el-menu-item>
    </el-submenu>
  <el-submenu index="3" style=" float: right;padding-right: 0px;" >
      <template slot="title">{{$t('navartop.changei18')}}</template>
         <el-menu-item v-for="item in options" :key="item.value" @click="changei18(item.value)"  :disabled="isCurrentLang(item.value)">{{item.label}}</el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      cnname: '',
      options: [
        {
          value: 'zh',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }, {
          value: 'ja',
          label: '日本語'
        }
      ]
    }
  },
  mounted () {
    this.load()
  },
  computed:
  {
    isCurrentLang () {
      return function (value) {
        return localStorage.getItem('lang') === value
      }
    }
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
    changei18 (lang) {
      localStorage.setItem('lang', lang)
      this.$i18n.locale = lang
      window.location.reload()
    },
    load () {
      this.cnname = this.$store.state.user.cnname
      // this.$http.get(this.$apiList.loadcustomconfigByKey, {
      //   params: {
      //     configkey: 'webtitle'
      //   }
      // })
      //   .then((successResponse) => {
      //     if (successResponse.data.code === 0) {
      //       this.webtitle = successResponse.data.data.configvalue
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error) // 异常
      //   })
    }
  }
}
</script>

<style>
/* .webtitle
{
  float:left;padding:20px;color:#ffffff;font-size: 18px;
}

.topmenu
{
float: right;padding-right: 0px;
} */
</style>

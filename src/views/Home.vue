<template>
  <el-container>
    <el-header class="myheader" height="61px">
      <nav-menu @show-userinfo="dialogFormVisible1=true" @change-psd="dialogFormVisible2=true"  ></nav-menu>
    </el-header>

    <el-container  >
      <el-aside class="myside" width="200px">
        <side-menu></side-menu>
      </el-aside>
      <el-main style="padding:10px">
        <router-view />
      </el-main>
    </el-container>

    <el-footer  >
      <foot-bar></foot-bar>
    </el-footer>
    <user-info :dialogFormVisible="dialogFormVisible1" @close-dialog="dialogFormVisible1=false"></user-info>
    <user-change-psd :dialogFormVisible="dialogFormVisible2" @close-dialog="dialogFormVisible2=false"></user-change-psd>
  </el-container>

</template>

<script>
import NavMenu from '@/components/NavMenu.vue'
import SideMenu from '@/components/SideMenu.vue'
import FootBar from '@/components/FootBar.vue'
import UserInfo from '@/views/UserInfo.vue'
import UserChangePsd from '@/views/UserChangePsd.vue'
export default {
  name: 'Home',
  data () {
    return {
      dialogFormVisible1: false,
      dialogFormVisible2: false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  },
  components: {
    NavMenu,
    SideMenu,
    FootBar,
    UserInfo,
    UserChangePsd
  }
}
</script>

<style scoped>
  .myheader {
    padding: 0;

  }

  .myside {
    border-right: solid 1px #e6e6e6;
  }
</style>

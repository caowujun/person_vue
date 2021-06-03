<template>
  <el-menu :default-active="activedMenu" class="el-menu-vertical-demo mysidemenu" @open="handleOpen"
    @close="handleClose" unique-opened router >
    <el-menu-item index="/dashboard" class="mysidemenuitem">
      <i class="el-icon-menu"></i>
      <span slot="title">{{$t('sidemenu.home')}}</span>
    </el-menu-item>

    <template v-for="item in menuList">
      <el-submenu v-if="isParent(item)" :key="item.id" :index="item.title" class="mysidemenuitem">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{getMenuLang(item.title)}}</span>
          </template>

          <template v-for="itemc in menuList">
            <el-menu-item v-if="itemc.parentid===item.id" :key="itemc.id" :index="itemc.actionurl" >
              <template slot="title">
                <i :class="itemc.icon"></i>
                <span slot="title">{{getMenuLang(itemc.title)}}</span>
              </template>
            </el-menu-item>
          </template>

      </el-submenu>

      <el-menu-item v-if="isActiveMenu(item)" :key="item.id" :index="item.actionurl" class="mysidemenuitem">
        <i :class="item.icon"></i>
        <span>{{getMenuLang(item.title)}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      activedMenu: ''
    }
  },
  mounted () {
    this.loadMenu()
    this.getCurrentMenu()
  },
  computed: {
    isParent () {
      return function (value) {
        return value.parentid === 'root' && value.actionurl === ''
      }
    },
    isActiveMenu () {
      return function (value) {
        return value.parentid === 'root' && value.actionurl !== ''
      }
    },
    getMenuLang () {
      return function (value) {
        return this.$t('sidemenu.' + value)
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    getCurrentMenu () {
      // 获取当前页面 菜单刷新后能自动选中
      const currentPage = window.location.href.split('#')[1]

      this.activedMenu = currentPage
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    loadMenu () {
      this.$http.get(this.$apiList.sidemenu, {
        params: {}
      })
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.menuList = successResponse.data.data
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
  .mysidemenu {
    border-right: 0px;
  }

  .mysidemenuitem {
    text-align: left;
  }
</style>

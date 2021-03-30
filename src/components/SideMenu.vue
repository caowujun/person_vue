<template>
  <el-menu :default-active="activedMenu" class="el-menu-vertical-demo mysidemenu" @open="handleOpen"
    @close="handleClose" unique-opened router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-menu-item index="/dashboard" class="mysidemenuitem">
      <i class="el-icon-menu"></i>
      <span slot="title">我的首页</span>
    </el-menu-item>

    <template v-for="item in menuList">
      <el-submenu v-if="isParent(item)" :key="item.id" :index="item.title" class="mysidemenuitem">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>

          <template v-for="itemc in menuList">
            <el-menu-item v-if="itemc.parentid===item.id" :key="itemc.id" :index="itemc.actionurl"
              style="text-align: center;">
              <template slot="title">
                <i :class="itemc.icon"></i>
                <span slot="title">{{itemc.title}}</span>
              </template>
            </el-menu-item>
          </template>

      </el-submenu>

      <el-menu-item v-if="isActiveMenu(item)" :key="item.id" :index="item.actionurl" class="mysidemenuitem">
        <i :class="item.icon"></i>
        <span> {{ item.title }}</span>
      </el-menu-item>

    </template>

    <!--       <el-menu-item v-for="(item,index) in navList" :key="item.id" :index="item.actionurl" class="mysidemenuitem">
      <i :class="item.icon"></i>
      <span> {{ item.title }}</span>
    </el-menu-item>

    <el-submenu v-for="(item,index) in navListp" :key="item.id" :index="item.title" class="mysidemenuitem">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>

      <el-menu-item v-for="(itemc,indexc) in item.children" :key="itemc.id" :index="itemc.actionurl"
        style="text-align: center;">
        <template slot="title">
          <i :class="itemc.icon"></i>
          <span slot="title">{{itemc.title}}</span>
        </template>
      </el-menu-item>
    </el-submenu> -->
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
    // isParent: function() {
    //   return this.customconfigid === undefined ? true : false;
    // } ,
    isParent () {
      return function (value) {
        return value.parentid === 'root' && value.actionurl === ''
      }
    },
    isActiveMenu () {
      return function (value) {
        return value.parentid === 'root' && value.actionurl !== ''
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

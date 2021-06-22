<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="$t('role.roleassign')">
      </el-page-header>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t('role.userassign')" name="first">
        <el-tree :data="userdata" show-checkbox node-key="id" default-expand-all id="usertree" ref="usertree" :props="defaultProps"
          @check-change="handleCheckChange1" check-strictly>
        </el-tree>
      </el-tab-pane>
      <el-tab-pane :label="$t('role.menuassign')" name="second">
        <el-tree :data="menudata" show-checkbox node-key="id" default-expand-all id="menutree" ref="menutree" :props="defaultProps"
          @check-change="handleCheckChange2" check-strictly>
        </el-tree>
      </el-tab-pane>

    </el-tabs>
  </el-card>
</template>

<script>
export default {
  // name: 'RoleAssign',
  data () {
    return {
      activeName: 'first',
      roleid: '',
      roleparentid: '', // 当前角色的父角色，主要控制只有根目录才能分配村镇
      userdata: [],
      menudata: [],
      tree1loaded: false,
      tree2loaded: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/rolelist'
      })
      console.log('go back')
    },
    handleClick (tab, event) {
      // 切换tab页，
      console.log(tab, event)
    },
    loadData_User () {
      this.$http.get(this.$apiList.usertreelist, {
        params: {

        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.userdata = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
      this.$http.get(this.$apiList.loadroleuser, {
        params: {
          roleid: this.roleid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.tree1loaded = false
            this.$refs.usertree.setCheckedKeys(successResponse.data.data.map(f => f.userid))
            var that = this
            setTimeout(
              function () {
                that.tree1loaded = true
              },
              1000)
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    loadData_Menu () {
      this.$http.get(this.$apiList.menutreelist, {
        params: {

        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.menudata = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })

      this.$http.get(this.$apiList.loadrolemenu, {
        params: {
          roleid: this.roleid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.tree2loaded = false
            this.$refs.menutree.setCheckedKeys(successResponse.data.data.map(f => f.menuid))
            var that = this
            setTimeout(
              function () {
                that.tree2loaded = true
              },
              1000)
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    handleCheckChange1 (data, checked, indeterminate) {
      // 在后台根据id
      if (this.tree1loaded === true) {
        this.$http.post(this.$apiList.saveroleuser, {
          roleid: this.roleid,
          userid: data.id
        })
          .then(successResponse => {
            console.log(successResponse)
            if (successResponse.data.code === 0) {
              this.$notify.success()
            } else {
              this.$notify.warning()
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$notify.error()
          })
      }
    },
    handleCheckChange2 (data, checked, indeterminate) {
      if (this.tree2loaded === true) {
        this.$http.post(this.$apiList.saverolemenu, {
          roleid: this.roleid,
          menuid: data.id
        })
          .then(successResponse => {
            console.log(successResponse)
            if (successResponse.data.code === 0) {
              this.$notify.success()
            } else {
              this.$notify.warning()
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
            this.$notify.error()
          })
      }
    }
  },
  mounted () {
    this.roleid = this.$route.query.id
    this.roleparentid = this.$route.query.parentid
    this.loadData_User()
    this.loadData_Menu()
  }

}
</script>

<style>

</style>

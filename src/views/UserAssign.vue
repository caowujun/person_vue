<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" content="用户-角色分配">
      </el-page-header>
    </div>
    <el-tree :data="roledata" show-checkbox node-key="id" default-expand-all id="roletree" ref="roletree" :props="defaultProps"
      @check-change="handleCheckChange1" check-strictly>
    </el-tree>
  </el-card>
</template>

<script>
export default {
  // name: 'RoleAssign',
  data () {
    return {
      userid: '',
      roledata: [],
      tree1loaded: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/userlist'
      })
      console.log('go back')
    },
    loadData_Role () {
      this.$http.get(this.$apiList.roletreelist, {
        params: {

        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.roledata = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
      this.$http.get(this.$apiList.loadroleuser, {
        params: {
          userid: this.userid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.tree1loaded = false
            this.$refs.roletree.setCheckedKeys(successResponse.data.data.map(f => f.roleid))
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
    handleCheckChange1 (data, checked, indeterminate) {
      // 在后台根据id

      if (this.tree1loaded === true) {
        this.$http.post(this.$apiList.saveroleuser, {
          userid: this.userid,
          roleid: data.id
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
    this.userid = this.$route.query.id
    this.loadData_Role()
  }

}
</script>

<style>

</style>

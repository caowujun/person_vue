<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" hide-required-asterisk status-icon size="small">
      <el-form-item v-if="isnew" label="父节点" prop="parentid">
        <el-select v-model="form.parentid" placeholder="请选择父节点" class="input380">
          <el-option label="root" value="root"></el-option>
          <el-option v-for="item in parentlist" :label="item.title" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="form.actionurl" class="input380"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" class="input380"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check">保存</el-button>
        <el-button @click="goBack" plain icon="el-icon-circle-close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import api from "@/assets/js/api.js"

export default {
  // name: 'MenuEdit',
  data () {
    return {
      form: {
        id: '',
        title: '',
        status: true, // 开关不支持数值类型
        actionurl: '',
        icon: '',
        parentid: ''
      },
      parentlist: [],
      menuid: '',
      rules: {
        title: [{
          required: true,
          message: '名称不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    isnew: function () {
      return this.menuid === undefined
    },
    pagetitle: function () {
      return this.menuid === undefined ? '新增' : '编辑'
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/menulist'
      })
      console.log('go back')
    },
    loadParentData () {
      this.$http.get(this.$apiList.menulist, {
        params: {
          parentid: 'root'
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            this.parentlist = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    loadData () {
      this.$http.get(this.$apiList.loadmenubyid, {
        params: {
          id: this.menuid
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
            successResponse.data.data.status = successResponse.data.data.status !== 0

            this.form = successResponse.data.data
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$data.form.status = this.$data.form.status === true ? 1 : 0
          this.$http.post(this.$apiList.savemenu, this.form)
            .then(successResponse => {
              console.log(successResponse)
              if (successResponse.data.code === 0) {
                this.$notify.success()
                this.menuid = successResponse.data.data
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
    }
  },
  mounted () {
    this.menuid = this.$route.query.id
    if (this.$route.query.id === undefined) {
      this.loadParentData()
    } else {
      this.loadData()
    }
  }

}
</script>

<style scoped="scoped">
  .input {
   width: 380px;
  }

</style>

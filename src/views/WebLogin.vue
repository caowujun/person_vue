<template>
  <div class="login"
    :style="{backgroundImage: 'url(' + (coverImgUrl  ) + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}">

    <el-form ref="loginForm" :model="form" :rules="ruleslogin" @keydown.enter.native="handleSubmit"
      class="login-container" v-bind:class="classObject" label-position="left" label-width="0px">
      <h3 class="login_title">{{webtitle}}</h3>
      <p style="color:orangered" v-show="showerror">{{errormsg}}</p>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit" type="primary" long class="login_button">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'WebLogin',
  data () {
    return {
      form: {
        username: 'admin',
        password: ''
      },
      showerror: false,
      errormsg: '',
      coverImgUrl: '',
      webtitle: '欢迎使用个人管理系统',
      ruleslogin: { // 校验表单规则
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post(this.$apiList.login, {
            username: this.form.username,
            userpsd: this.$md5(this.form.password)
          })
            .then(successResponse => {
              if (successResponse.data.code === '0') {
                this.$store.commit('login', successResponse)
                // 如果不加这句，发现切换用户的时候，window.localStorage的user值变化了，但是_this.$store.state.user 里的没有变，必须在这里显示定义一番
                // this.$store.state.user = successResponse.data.data;
                var path = this.$route.query.redirect
                this.$router.replace({
                  path: path === '/' || path === undefined ? '/home' : path
                })
              } else {
                this.showerror = true
                this.errormsg = successResponse.data.msg
              }
            })
            .catch(failResponse => {
              this.showerror = true
              this.errormsg = failResponse.data.msg
            })
        }
      })
    }
  },
  mounted () {
    this.coverImgUrl = require('../assets/images/4.jpg')
    // this.$http.get(this.$apiList.loadcustomconfigByKey, {
    //     params: {
    //       configkey: "loginbackimg"
    //     }
    //   })
    //   .then((successResponse) => {
    //     console.log(successResponse);
    //     if (successResponse.data.code == "0") {
    // this.coverImgUrl = require('../assets/images/' + successResponse.data.data.configvalue);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error); //异常
    // });
  },
  computed: {
    classObject: function () {
      return {
        ispc: true
      }
    }
  }

}
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: center;
    position: fixed;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    padding: 35px 35px 15px 35px;
    background: #fff;
  }

  .ispc {

    position: absolute;
    right: 160px;
    top: 300px;
    transform: translateY(-60%);
    width: 350px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_button {
    width: 100%;
    background: #505458;
    border: none
  }
</style>

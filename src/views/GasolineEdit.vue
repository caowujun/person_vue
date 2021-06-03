<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules"    hide-required-asterisk status-icon      >

      <el-form-item :label="$t('gasoline.recorddate')" prop="recorddate">
        <el-date-picker v-model="form.recorddate" type="date" class="input380" :placeholder="$t('form.dateplaceholder')"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('gasoline.spendmoney')" prop="spendmoney">
        <el-input  v-model="form.spendmoney" class="input380"  ></el-input>
      </el-form-item>

      <el-form-item :label="$t('gasoline.volume')" prop="volume">
        <el-input  v-model="form.volume"          class="input380"></el-input>
      </el-form-item>

       <el-form-item :label="$t('gasoline.unitprice')" prop="unitprice">
        <el-input  v-model="form.unitprice"          class="input380"></el-input>
      </el-form-item>

       <el-form-item :label="$t('gasoline.kilometer')" prop="kilometer">
        <el-input  v-model="form.kilometer"          class="input380"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check" size="small"> {{$t('form.save')}}
        </el-button>
        <el-button @click="goBack" plain icon="el-icon-circle-close" size="small"> {{$t('form.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  isTwoDecimal, isInteger
} from '@/assets/js/rules.js'

export default {
  data () {
    return {
      form: {
        id: '',
        recorddate: new Date(),
        spendmoney: '',
        volume: '',
        unitprice: '',
        kilometer: ''
      },
      id: '',
      rules: {
        recorddate: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        }],
        spendmoney: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        },
        {
          validator: isTwoDecimal,
          trigger: 'blur',
          message: this.$t('rule.needTwoDecimal')
        }],
        unitprice: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        },
        {
          validator: isTwoDecimal,
          trigger: 'blur',
          message: this.$t('rule.needTwoDecimal')
        }],
        volume: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        },
        {
          validator: isTwoDecimal,
          trigger: 'blur',
          message: this.$t('rule.needTwoDecimal')
        }],
        kilometer: [{
          required: true,
          message: this.$t('rule.required'),
          trigger: 'blur'
        },
        {
          validator: isInteger,
          trigger: 'blur',
          message: this.$t('rule.needInteger')
        }]
      }
    }
  },
  computed: {
    pagetitle: function () {
      return this.$t('sidemenu.gasolinelist') + '/' + this.id === undefined ? this.$t('form.add') : this.$t(
        'form.edit')
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/gasolinelist'
      })
    },
    loadData () {
      this.$http.get(this.$apiList.loadgasolinebyid, {
        params: {
          id: this.id
        }
      })
        .then((successResponse) => {
          console.log(successResponse)
          if (successResponse.data.code === 0) {
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
          this.$http.post(this.$apiList.savegasoline, this.form)
            .then(successResponse => {
              if (successResponse.data.code === 0) {
                this.$notify.success()
                this.goBack()
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
    this.id = this.$route.query.id
    if (this.$route.query.id !== undefined) {
      this.loadData()
    } else {
      this.form.recorddate = new Date().Format('yyyy-MM-dd')
    }
  }
}
</script>
<style scoped="scoped">
  .input380 {
    width: 380px;
  }
</style>

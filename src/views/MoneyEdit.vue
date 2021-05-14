<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="pagetitle">
      </el-page-header>
    </div>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules"
    hide-required-asterisk status-icon      >

      <el-form-item :label="$t('form.recorddate')" prop="recorddate">
        <el-date-picker v-model="form.recorddate" type="date" class="input380" :placeholder="$t('form.dateplaceholder')"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('money.spendnum')" prop="spendnum">
        <el-input  v-model="form.spendnum" class="input380"  ></el-input>
      </el-form-item>

      <el-form-item :label="$t('money.note')" prop="note">
        <el-input type="textarea" autosize :placeholder="$t('form.areaplaceholder')" v-model="form.note"
          class="input380"></el-input>
      </el-form-item>

      <el-form-item :label="$t('money.type')" class="input380">
        <el-radio-group v-model="form.moneytype">
          <el-radio :label="0">{{$t('money.out')}}</el-radio>
          <el-radio :label="1">{{$t('money.in')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('money.consumptiontype')" prop="consumptiontype">
        <el-select v-model="form.consumptiontype" :placeholder="$t('money.consumptiontype')" class="input380">
          <el-option v-for="item in consumptiontypes" :label="item.enumname" :value="item.enumvalue" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.prevent="onSubmit" plain icon="el-icon-circle-check"> {{$t('form.save')}}
        </el-button>
        <el-button @click="goBack" plain icon="el-icon-circle-close"> {{$t('form.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  validateMoney
} from '@/assets/js/rules.js'

export default {
  // name: 'MoneyEdit',
  data () {
    return {
      form: {
        id: '',
        recorddate: new Date(),
        spendnum: '',
        note: '',
        moneytype: 0,
        moneyclassification: ''
      },
      id: '',
      consumptiontypes: [],
      rules: {
        recorddate: [{
          required: true,
          message: this.$t('rule.daterule'),
          trigger: 'blur'
        }],
        spendnum: [{
          required: true,
          message: this.$t('rule.requiredrule'),
          trigger: 'blur'
        },
        {
          validator: validateMoney,
          trigger: 'blur',
          message:this.$t('rule.spendnumrule')
          // requvalidateMoneyired: true,
          // message: this.$t('rule.spendnumrule'),
          // trigger: 'blur'
        }],
        moneyclassification: [{
          required: true,
          message: this.$t('money.requiredrule'),
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    pagetitle: function () {
      return this.$t('sidemenu.moneylist') + '/' + this.id === undefined ? this.$t('form.add') : this.$t(
        'form.edit')
    }
  },
  methods: {
    goBack () {
      this.$router.replace({
        path: '/moneylist'
      })
    },
    loadData () {
      this.$http.get(this.$apiList.loadmoneybyid, {
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
    loadenumconfig () {
      this.$http.get(this.$apiList.loadenumconfigByKey, {
        params: {
          enumtype: 'consumptiontype'
        }
      })
        .then((successResponse) => {
          debugger
          if (successResponse.data.code === 0) {
            this.consumptiontypes = successResponse.data.data
            debugger
          }
        })
        .catch((error) => {
          console.log(error) // 异常
        })
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post(this.$apiList.savemoney, this.form)
            .then(successResponse => {
              if (successResponse.data.code === 0) {
                this.$notify.success()
                this.id = successResponse.data.data
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
    this.loadenumconfig()
    if (this.$route.query.id !== undefined) {
      this.loadData()
    }else{
      this.form.recorddate=new Date().Format("yyyy-MM-dd")
    }
  }
}
</script>
<style scoped="scoped">
  .input380 {
    width: 380px;
  }
</style>

import Vue from 'vue' // 引入vue
import VueI18n from 'vue-i18n' // 引入i18n模块
import elementJaLocale from 'element-ui/lib/locale/lang/ja' // element-ui英文包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui中文包
import elementEnLocale from 'element-ui/lib/locale/lang/en'// element-ui中文包
import locale from 'element-ui/lib/locale' // 引入elementuiui语言包模块
import enLocale from './en' // 本地英文包
import zhLocale from './zh' // 本地中文包
import jaLocale from './ja' // 本地日文包

Vue.use(VueI18n) // vue使用i18n模块
// 引入本地
const messages = {
  ja: {
    ...jaLocale, // es6的拓展运算符，相当于解析出每个对象
    ...elementJaLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  }
}
// 创建国际化实例
const i18n = new VueI18n({
  locale: window.localStorage.lang || 'zh', // set locale，默认中文
  messages // set locale messages。语言包
})
locale.i18n((key, value) => i18n.t(key, value))
export default i18n

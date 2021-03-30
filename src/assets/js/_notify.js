import {
  Notification
} from 'element-ui'
// success/warning/info/error
var success = function (msg, title, position) {
  Notification.success({
    title: title || '提示',
    message: msg || '操作成功！',
    position: position || 'bottom-right'
  })
}
var warning = function (msg, title, position) {
  Notification.warning({
    title: title || '提示',
    message: msg || '操作失败！',
    position: position || 'bottom-right'
  })
}
var error = function (msg, title, position) {
  Notification.error({
    title: title || '提示',
    message: msg || '出现异常！',
    position: position || 'bottom-right'
  })
}
export default {
  success,
  warning,
  error
}

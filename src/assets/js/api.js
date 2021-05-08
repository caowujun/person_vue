const apilist = {
  // 登录
  login: '/api/sysuser/login.do', // 登录
  // 菜单
  sidemenu: '/api/sysuser/getUserMenus.do', // dashboard左边的菜单
  menulist: '/api/menu/list.do', // 编辑时，获取根目录的所有菜单
  menupage: '/api/menu/selectAll.do', // page列表
  // updatemenustatus: "/api/sysmenu/updateStatus.do", //是否禁用
  loadmenubyid: '/api/menu/selectOne.do', // 编辑用
  insertmenu: '/api/menu/insert.do', // 新增或者更新
  updatemenu: '/api/menu/update.do', // 新增或者更新
  menutreelist: '/api/menu/treeList.do', // assignmenu时的tree跟数据
  // 用户
  userpage: '/api/sysuser/selectAll.do', // page列表，因为没有上下级关系，所以不会和menu一样重写了page方法
  usertreelist: '/api/sysuser/treeList.do', // assignuser时的tree跟数据
  // updateuserstatus: "/api/sysuser/updateStatus.do", //是否禁用某个账号
  loaduserbyid: '/api/sysuser/selectOne.do', // 编辑用
  loaduserbyloginname: '/api/sysuser/findByLoginName.do', // 编辑用
  insertuser: '/api/sysuser/insert.do', // 新增或者更新
  updateuser: '/api/sysuser/update.do', // 新增或者更新
  changepsd: '/api/sysuser/changePsd.do', // 修改密码
  // 角色
  rolepage: '/api/sysrole/selectAll.do', // page列表
  // updaterolestatus: "/api/sysrole/updateStatus.do", //是否禁用某个角色
  loadrolebyid: '/api/sysrole/selectOne.do', // 编辑用
  insertrole: '/api/sysrole/insert.do', // 新增或者更新
  updaterole: '/api/sysrole/update.do', // 新增或者更新
  roletreelist: '/api/sysrole/treeList.do', // 用户分配权限时的tree跟数据
  // 角色相关
  loadroleuser: '/api/roleuser/list.do', // assignuser获取默认选中的数据
  loadrolemenu: '/api/rolemenu/list.do', // assignmenu获取默认选中的数据
  loadUserRole: '/api/sysuser/getUserRoles.do', // 用户-权限
  saveroleuser: '/api/roleuser/savetree.do', // 保存
  saverolemenu: '/api/rolemenu/savetree.do', // 保存

  // 系统自定义
  customconfigpage: '/api/customconfig/selectAll.do', // 用户自定义分页page
  // updatecustomconfigstatus: "/api/customconfig/updateStatus.do", //是否禁用某个配置项
  loadcustomconfigbyid: '/api/customconfig/selectOne.do', // 编辑用
  insertcustomconfig: '/api/customconfig/insert.do', // 新增或者更新
  loadcustomconfigByKey: '/api/customconfig/findByKey.do', // 根据key获取自定义的值
  updatecustomconfig: '/api/customconfig/update.do', // 新增或者更新
  // 枚举
  enumconfigpage: '/api/enumtypes/selectAll.do', // 用户自定义分页page
  // updateenumconfigstatus: "/api/enumtypes/updateStatus.do", //是否禁用某个配置项
  loadenumconfigbyid: '/api/enumtypes/selectOne.do', // 编辑用
  loadenumconfigByKey: '/api/enumtypes/findByKey.do', // 根据key获取自定义的值
  insertenumconfig: '/api/enumtypes/insert.do', // 新增或者更新
  updateenumconfig: '/api/enumtypes/update.do' // 新增或者更新
}

export default apilist

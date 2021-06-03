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
  rolepage: '/api/role/selectAll.do', // page列表
  // updaterolestatus: "/api/role/updateStatus.do", //是否禁用某个角色
  loadrolebyid: '/api/role/selectOne.do', // 编辑用
  insertrole: '/api/role/insert.do', // 新增或者更新
  updaterole: '/api/role/update.do', // 新增或者更新
  roletreelist: '/api/role/treeList.do', // 用户分配权限时的tree跟数据
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
  updateenumconfig: '/api/enumtypes/update.do', // 新增或者更新

  sportpage: '/api/sport/selectAll.do', // 用户自定义分页page
  loadsportbyid: '/api/sport/selectOne.do', // 编辑用
  insertsport: '/api/sport/insert.do', // 新增或者更新
  updatesport: '/api/sport/update.do', // 新增或者更新
  savesport: '/api/sport/save.do', // save
  deletesport: '/api/sport/deleteOne.do', // delete

  moneypage: '/api/money/selectAll.do', // 用户自定义分页page
  loadmoneybyid: '/api/money/selectOne.do', // 编辑用
  insertmoney: '/api/money/insert.do', // 新增或者更新
  updatemoney: '/api/money/update.do', // 新增或者更新
  savemoney: '/api/money/save.do', // 用户自定义分页page
  deletemoney: '/api/money/deleteOne.do', // delete

  gasolinepage: '/api/gasoline/selectAll.do', // 用户自定义分页page
  loadgasolinebyid: '/api/gasoline/selectOne.do', // 编辑用
  insertgasoline: '/api/gasoline/insert.do', // 新增或者更新
  updategasoline: '/api/gasoline/update.do', // 新增或者更新
  savegasoline: '/api/gasoline/save.do', // 用户自定义分页page
  deletegasoline: '/api/gasoline/deleteOne.do', // delete

  albumpage: '/api/album/selectAll.do', // 用户自定义分页page
  loadalbumbyid: '/api/album/selectOne.do', // 编辑用
  insertalbum: '/api/album/insert.do', // 新增或者更新
  updatealbum: '/api/album/update.do', // 新增或者更新
  savealbum: '/api/album/save.do', // 用户自定义分页page
  deletealbum: '/api/album/deleteOne.do', // delete
  importfolder: '/api/album/importFolder.do', // delete
  importfile: '/api/album/importFile.do' // delete
}

export default apilist

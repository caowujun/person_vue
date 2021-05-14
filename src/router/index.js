import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/', // 解释下，这里是指的不加login路径，也指向login路由去
  redirect: '/weblogin'
}, {
  path: '/weblogin',
  name: 'WebLogin',
  component: () => import(/* webpackChunkName: "about" */ '../views/WebLogin.vue')
},
{
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  // home页面并不需要被访问
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: () => import(/* webpackChunkName: "about" */ '../views/DashBoard.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/moneylist',
      name: 'MoneyList',
      component: () => import(/* webpackChunkName: "about" */ '../views/MoneyList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/moneyedit',
      name: 'MoneyEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/MoneyEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/gasolinelist',
      name: 'GasolineList',
      component: () => import(/* webpackChunkName: "about" */ '../views/GasolineList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/gasolineedit',
      name: 'GasolineEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/GasolineEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/sportlist',
      name: 'SportList',
      component: () => import(/* webpackChunkName: "about" */ '../views/SportList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/sportedit',
      name: 'SportEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/SportEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/albumlist',
      name: 'AlbumList',
      component: () => import(/* webpackChunkName: "about" */ '../views/AlbumList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/albumedit',
      name: 'AlbumEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/AlbumEdit.vue'),
      meta: {
        requireAuth: true
      }
    },{
      path: '/userlist',
      name: 'UserList',
      component: () => import(/* webpackChunkName: "about" */ '../views/UserList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userassign',
      name: 'UserAssign',
      component: () => import(/* webpackChunkName: "about" */ '../views/UserAssign.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/useredit',
      name: 'UserEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/UserEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/menulist',
      name: 'MenuList',
      component: () => import(/* webpackChunkName: "about" */ '../views/MenuList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/menuedit',
      name: 'MenuEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/MenuEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/rolelist',
      name: 'RoleList',
      component: () => import(/* webpackChunkName: "about" */ '../views/RoleList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/roleedit',
      name: 'RoleEdit',
      component: () => import(/* webpackChunkName: "about" */ '../views/RoleEdit.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/roleassign',
      name: 'RoleAssign',
      component: () => import(/* webpackChunkName: "about" */ '../views/RoleAssign.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/customconfiglist',
      name: 'CustomConfigList',
      component: () => import(/* webpackChunkName: "about" */ '../views/CustomConfigList.vue'),
      meta: {
        requireAuth: true
      }
    }, {
      path: '/enumtypelist',
      name: 'EnumtypeList',
      component: () => import(/* webpackChunkName: "about" */ '../views/EnumTypeList.vue'),
      meta: {
        requireAuth: true
      }
    },

    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router

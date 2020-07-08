import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/monitorsObject',
    component: Layout,
    redirect: '/monitorsObject/heartBeat',
    name: 'monitorsObject',
    meta: {
      title: '监控对象配置',
      icon: 'lock',
      roles: ['ADMIN']
    },
    children: [
      {
        path: 'heartBeat',
        component: () => import('@/views/monitorsObject/heartBeat'),
        name: 'heartBeat',
        meta: {
          title: '设备心跳监控',
          roles: ['ADMIN']
        }
      },
      {
        path: 'service',
        component: () => import('@/views/monitorsObject/service'),
        name: 'service',
        meta: {
          title: '应用服务监控',
          roles: ['ADMIN']
        }
      }
    ]
  },
  {
    path: '/add',
    component: Layout,
    name: 'addNewVue',
    hidden: true,
    meta: {
      title: '监控对象配置'
    },
    children: [
      {
        path: 'newHeartBeat',
        component: () => import('@/views/addNewVue/newHeartBeat'),
        name: 'newHeartBeat',
        meta: {
          title: '新增监控对象'
        }
      },
      {
        path: 'newServer',
        component: () => import('@/views/addNewVue/newServer'),
        name: 'newServer',
        meta: {
          title: '新增监控对象'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/monitorsObject', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard/index',
    name: '首页面板',
    hidden: false,
    meta: { role: ['admin', 'teacher-assistant', 'salesman'] },
    children: [
      {
        path: 'dashboard/index',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页面板', icon: 'home', role: ['admin', 'teacher-assistant', 'salesman'] }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system', role: ['admin', 'teacher-assistant', 'salesman'] },
    children: [
      {
        path: 'role',
        name: '角色列表',
        component: () => import('@/views/roles/index'),
        meta: { title: '角色列表', icon: 'role', role: ['admin'] }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表', icon: 'users', role: ['admin', 'teacher-assistant', 'salesman'] }
      },
      {
        path: 'sockpuppet',
        name: '马甲列表',
        hidden: true,
        component: () => import('@/views/sockpuppets/index'),
        meta: { title: '马甲列表', icon: 'users', role: ['admin'] }
      },
      {
        path: 'college',
        name: '学院列表',
        component: () => import('@/views/colleges/index'),
        meta: { title: '学院列表', icon: 'college', role: [] }
      }
    ]
  },

  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    name: '直播间管理',
    meta: { title: '直播间管理', icon: 'room', role: ['admin'] },
    children: [
      {
        path: 'index',
        name: '直播间列表',
        component: () => import('@/views/video/index'),
        meta: { title: '直播间列表', icon: 'livelist', role: ['admin'] }
      },
      {
        path: 'chatmsg',
        name: '直播互动',
        component: () => import('@/views/chatmsg/index'),
        meta: { title: '直播互动', icon: 'chatmsg', role: ['admin'] }
      },
      {
        path: 'word',
        name: '敏感词汇管理',
        component: () => import('@/views/word/index'),
        meta: { title: '敏感词汇管理', icon: 'word', role: ['admin'] }
      }
    ]
  },

  {
    path: '/website',
    component: Layout,
    redirect: '/website/index',
    name: '网站管理',
    meta: { title: '网站管理', icon: 'website', role: ['admin'] },
    children: [
      {
        path: 'level',
        name: '会员等级',
        component: () => import('@/views/levels/index'),
        meta: { title: '会员等级', icon: 'level', role: ['admin'] }
      },
      {
        path: '/ads',
        name: '广告设置',
        component: () => import('@/views/ads/index'),
        meta: { title: '广告设置', icon: 'ad', role: ['admin'] },
        children: [
          {
            path: 'Homead',
            name: '首页广告',
            component: () => import('@/views/ads/Homead'),
            meta: { title: '首页广告', icon: 'homead', role: ['admin'] }
          },
          {
            path: 'Livead',
            name: '直播间广告',
            component: () => import('@/views/ads/Livead'),
            meta: { title: '直播间广告', icon: 'livead', role: ['admin'] }
          }
        ]
      },
      {
        path: 'teacher',
        name: '名师简介',
        component: () => import('@/views/teachers/index'),
        meta: { title: '名师简介', icon: 'teacher', role: ['admin'] }
      },
      {
        path: 'course',
        name: '课程简介',
        component: () => import('@/views/courses/index'),
        meta: { title: '课程简介', icon: 'course', role: ['admin'] }
      },
      {
        path: '/article',
        name: '文章管理',
        component: () => import('@/views/article/list'),
        meta: { title: '文章管理', icon: 'article', role: ['admin'] },
        children: [
          {
            path: 'articleType',
            name: '文章类别',
            component: () => import('@/views/articleType/index'),
            meta: { title: '文章类别', icon: 'type', role: ['admin'] }
          },
          {
            path: 'index',
            name: '文章列表',
            component: () => import('@/views/article/index'),
            meta: { title: '文章列表', icon: 'article2', role: ['admin'] }
          }
        ]
      },
      {
        path: '/overview',
        name: '学校概况',
        component: () => import('@/views/introduction/list'),
        meta: { title: '学校概况', icon: 'school', role: ['admin'] },
        children: [
          {
            path: 'introduction',
            name: '学校简介',
            component: () => import('@/views/introduction/index'),
            meta: { title: '学校简介', icon: 'introduction', role: ['admin'] }
          },
          {
            path: 'history',
            name: '发展历程',
            component: () => import('@/views/histories/index'),
            meta: { title: '发展历程', icon: 'history', role: ['admin'] }
          }
        ]
      },
      {
        path: 'announcement',
        name: '重要通告',
        component: () => import('@/views/announcement/index'),
        meta: { title: '重要通告', icon: 'announcement', role: ['admin'] }
      },
      {
        path: 'curriculum',
        name: '课程表管理',
        component: () => import('@/views/curriculum/Index'),
        meta: { title: '课程表管理', icon: 'curriculum', role: ['admin'] }
      },
      {
        path: 'answer',
        name: '咨询问答',
        component: () => import('@/views/robot/Answer'),
        meta: { title: '咨询问答', icon: 'answer', role: ['admin'] }
      }
    ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    name: '营销工具',
    meta: { title: '营销工具', icon: 'sale', role: ['admin'] },
    children: [
      {
        path: 'index',
        name: '抽奖',
        component: () => import('@/views/sale/Index'),
        meta: { title: '抽奖', icon: 'prize', role: ['admin'] }
      },
      {
        path: '/packet',
        name: '红包管理',
        // redirect: 'packet',
        component: () => import('@/views/packet/index'),

        meta: { title: '红包管理', icon: 'packet', role: ['admin'] },
        children: [
          {
            path: 'List',
            name: '红包列表',
            component: () => import('@/views/packet/List'),
            meta: { title: '红包列表', icon: 'packet', role: ['admin'] }
          },
          {
            path: 'Userpacket',
            name: '用户红包',
            component: () => import('@/views/packet/Userpacket'),
            meta: { title: '用户红包', icon: 'packet', role: ['admin'] }
          }
        ]
      },
      {
        path: 'activity',
        name: '活动管理',
        component: () => import('@/views/activities/Index'),
        meta: { title: '活动管理', icon: 'activity', role: ['admin'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'violation/index',
    name: '违规处理',
    hidden: false,
    meta: { role: ['admin'] },
    children: [
      {
        path: 'violation/index',
        component: () => import('@/views/violation/Index'),
        meta: { title: '违规处理', icon: 'violation', role: ['admin'] }
      }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

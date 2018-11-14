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

//let role = this.info.data.role
//let role = info.name;
//let role = getRoles();

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
    meta: { role: ['admin', 'teacher-assistant', 'salesman'],access_point:'dashboard' },
    children: [
      {
        path: 'dashboard/index',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页面板', icon: 'home',access_point:'home', role: ['admin', 'teacher-assistant','team-leader', 'salesman'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system',access_point:'system', role: ['admin','team-leader', 'teacher-assistant', 'salesman'] },
    children: [
      {
        path: 'role',
        name: '角色列表',
        component: () => import('@/views/roles/index'),
        meta: { title: '角色列表', icon: 'role',access_point:'role', role: ['admin'] }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表', icon: 'users',access_point:'user', role: ['admin','team-leader', 'teacher-assistant', 'salesman'] }
      },
      {
        path: 'sockpuppet',
        name: '马甲列表',
        hidden: true,
        component: () => import('@/views/sockpuppets/index'),
        meta: { title: '马甲列表', icon: 'users',access_point:'sockpuppet', role: ['admin', 'salesman'] }
      },
      {
        path: 'college',
        name: '学院列表',
        component: () => import('@/views/colleges/index'),
        meta: { title: '学院列表', icon: 'college',access_point:'', role: []}
      },
      {
        path: 'access',
        name: '授权列表',
        component: () => import('@/views/access/index'),
        meta: { title: '授权列表', icon: 'access',access_point:'access', role: ['admin']}
      }
    ]
  },

  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    name: '直播间管理',
    meta: { title: '直播间管理', icon: 'room',access_point:'room', role: ['admin','teacher-assistant'] },
    children: [
      {
        path: 'index',
        name: '直播间列表',
        component: () => import('@/views/video/index'),
        meta: { title: '直播间列表', icon: 'livelist',access_point:'livelist', role: ['admin','teacher-assistant'] }
      },
      {
        path: 'chatmsg',
        name: '直播互动',
        component: () => import('@/views/chatmsg/index'),
        meta: { title: '直播互动', icon: 'chatmsg',access_point:'chatmsg', role: ['admin','teacher-assistant'] }
      },
      {
        path: 'word',
        name: '敏感词汇管理',
        component: () => import('@/views/word/index'),
        meta: { title: '敏感词汇管理', icon: 'word',access_point:'word', role: ['admin','teacher-assistant'] }
      }
    ]
  },

  {
    path: '/website',
    component: Layout,
    redirect: '/website/index',
    name: '网站管理',
    meta: { title: '网站管理', icon: 'website',access_point:'website', role: ['admin','teacher-assistant'] },
    children: [
      {
        path: 'level',
        name: '会员等级',
        component: () => import('@/views/levels/index'),
        meta: { title: '会员等级', icon: 'level',access_point:'level', role: ['admin','teacher-assistant'] }
      },
      {
        path: '/ads',
        name: '广告设置',
        component: () => import('@/views/ads/index'),
        meta: { title: '广告设置', icon: 'ad',access_point:'ad', role: ['admin','teacher-assistant'] },
        children: [
          {
            path: 'Homead',
            name: '首页广告',
            component: () => import('@/views/ads/Homead'),
            meta: { title: '首页广告', icon: 'homead',access_point:'homead', role: ['admin','teacher-assistant'] }
          },
          {
            path: 'Livead',
            name: '直播间广告',
            component: () => import('@/views/ads/Livead'),
            meta: { title: '直播间广告', icon: 'livead',access_point:'livead', role: ['admin','teacher-assistant'] }
          }
        ]
      },
      {
        path: 'teacher',
        name: '名师简介',
        component: () => import('@/views/teachers/index'),
        meta: { title: '名师简介', icon: 'teacher',access_point:'teacher', role: ['admin','teacher-assistant'] }
      },
      {
        path: 'course',
        name: '课程简介',
        component: () => import('@/views/courses/index'),
        meta: { title: '课程简介', icon: 'course',access_point:'course', role: ['admin','teacher-assistant'] }
      },
      {
        path: '/article',
        name: '文章管理',
        component: () => import('@/views/article/list'),
        meta: { title: '文章管理', icon: 'article',access_point:'article', role: ['admin','teacher-assistant'] },
        children: [
          {
            path: 'articleType',
            name: '文章类别',
            component: () => import('@/views/articleType/index'),
            meta: { title: '文章类别', icon: 'type',access_point:'type', role: ['admin','teacher-assistant'] }
          },
          {
            path: 'index',
            name: '文章列表',
            component: () => import('@/views/article/index'),
            meta: { title: '文章列表', icon: 'article2',access_point:'articlelist', role: ['admin','teacher-assistant'] }
          }
        ]
      },
      {
        path: '/overview',
        name: '学校概况',
        component: () => import('@/views/introduction/list'),
        meta: { title: '学校概况', icon: 'school',access_point:'school', role: ['admin','teacher-assistant'] },
        children: [
          {
            path: 'introduction',
            name: '学校简介',
            component: () => import('@/views/introduction/index'),
            meta: { title: '学校简介', icon: 'introduction',access_point:'introduction', role: ['admin','teacher-assistant'] }
          },
          {
            path: 'history',
            name: '发展历程',
            component: () => import('@/views/histories/index'),
            meta: { title: '发展历程', icon: 'history',access_point:'develop_history', role: ['admin','teacher-assistant'] }
          }
        ]
      },
      {
        path: 'announcement',
        name: '重要通告',
        component: () => import('@/views/announcement/index'),
        meta: { title: '重要通告', icon: 'announcement',access_point:'announcement', role: ['admin','teacher-assistant'] }
      },
      {
        path: 'curriculum',
        name: '课程表管理',
        component: () => import('@/views/curriculum/Index'),
        meta: { title: '课程表管理', icon: 'curriculum',access_point:'curriculum', role: ['admin','teacher-assistant'] }
      },
      {
        path: 'answer',
        name: '咨询问答',
        component: () => import('@/views/robot/Answer'),
        meta: { title: '咨询问答', icon: 'answer',access_point:'answer', role: ['admin','teacher-assistant'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/sale/index',
    name: '营销工具',
    meta: { title: '营销工具', icon: 'sale',access_point:'sale', role: ['admin','teacher-assistant'] },
    children: [
      {
        path: 'sale/saleSet',
        name: '营销设置',
        component: () => import('@/views/saleSet/Index'),
        meta: { title: '营销设置', icon: 'set',access_point:'set', role: ['admin','teacher-assistant'] }
      },
      {
        path: '/sale',
        name: '抽奖',
        component: () => import('@/views/sale/Index'),
        meta: { title: '抽奖', icon: 'prize',access_point:'prize', role: ['admin','teacher-assistant'] },
        children: [
          {
            path: 'lottery_draws',
            name: '奖励列表',
            component: () => import('@/views/sale/lottery_draws'),
            meta: { title: '奖励列表', icon: 'prize',access_point:'lottery_draws', role: ['admin','teacher-assistant'] }
          },
          {
            path: 'lottery_history',
            name: '历史记录',
            component: () => import('@/views/sale/lottery_history'),
            meta: { title: '历史记录', icon: 'prize',access_point:'lottery_history', role: ['admin','teacher-assistant'] }
          }
        ]

      },
      {
        path: '/packet',
        name: '红包管理',
        // redirect: 'packet',
        component: () => import('@/views/packet/index'),

        meta: { title: '红包管理', icon: 'packet',access_point:'packet', role: ['admin','teacher-assistant'] },
        children: [
          {
            path: 'List',
            name: '红包列表',
            component: () => import('@/views/packet/List'),
            meta: { title: '红包列表', icon: 'packet',access_point:'packetlist', role: ['admin','teacher-assistant'] }
          },
          {
            path: 'Userpacket',
            name: '用户红包',
            component: () => import('@/views/packet/Userpacket'),
            meta: { title: '用户红包', icon: 'packet',access_point:'userpacket', role: ['admin','teacher-assistant'] }
          }
        ]
	    },
      {
        path: '/cash',
        name: '兑奖管理',
        // redirect: 'packet',
        component: () => import('@/views/cash/index'),

        meta: { title: '兑奖管理', icon: 'cash', role: ['admin'] },
        children: [
          {
            path: 'cash_awards',
            name: '奖品列表',
            component: () => import('@/views/cash/cash_awards'),
            meta: { title: '奖品列表', icon: 'cash', role: ['admin'] }
          },
          {
            path: 'cash_history',
            name: '兑奖记录',
            component: () => import('@/views/cash/cash_history'),
            meta: { title: '兑奖记录', icon: 'cash', role: ['admin'] }
          }
        ]
      },
      {
        path: 'sale/activity',
        name: '活动管理',
        component: () => import('@/views/activities/Index'),
        meta: { title: '活动管理', icon: 'activity',access_point:'activity', role: ['admin','teacher-assistant'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'violation/index',
    name: '违规处理',
    hidden: false,
    meta: { role: ['admin','teacher-assistant'],access_point:'violation' },
    children: [
      {
        path: 'violation/index',
        component: () => import('@/views/violation/Index'),
        meta: { title: '违规处理', icon: 'violation',access_point:'vio', role: ['admin','teacher-assistant'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '',
    name: '数据统计',
    hidden: false,
    meta: { title: '数据统计', icon: 'data',access_point:'data', role: ['admin', 'salesman','teacher-assistant','team-leader'] },
    children: [
	    {
		    path: 'data/current',
		    name: '实时在线用户',
		    component: () => import('@/views/data/Current'),
		    meta: { title: '实时在线用户', icon: 'line',access_point:'current', role: ['admin', 'salesman','teacher-assistant','team-leader'] }
	    },
      {
        path: 'data/index',
        name: '新增用户统计',
        component: () => import('@/views/data/Register'),
        meta: { title: '新增用户统计', icon: 'register',access_point:'register', role: ['admin', 'salesman','teacher-assistant','team-leader'] }
      },
	    {
		    path: 'data/register',
		    name: '用户登录历史',
		    component: () => import('@/views/data/History'),
		    meta: { title: '用户登录历史', icon: 'line',access_point:'loginhistory', role: ['admin', 'salesman','teacher-assistant','team-leader'] }
	    }
    ]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

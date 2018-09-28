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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard/index',
    name: '首页面板',
    hidden: false,
    children: [
      {
        path: 'dashboard/index',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页面板', icon: 'home' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'role',
        name: '角色列表',
        component: () => import('@/views/roles/index'),
        meta: { title: '角色列表', icon: 'role' }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表', icon: 'users' }
      },
      {
        path: 'sockpuppet',
        name: '马甲列表',
        hidden: true,
        component: () => import('@/views/sockpuppets/index'),
        meta: { title: '马甲列表', icon: 'users' }
      },
      {
        path: 'college',
        name: '学院列表',
        component: () => import('@/views/colleges/index'),
        meta: { title: '学院列表', icon: 'college' }
      }
    ]
  },

  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    name: '直播间管理',
	  meta: { title: '直播间管理', icon: 'room' },
    children: [
      {
        path: 'index',
	      name: '直播间列表',
        component: () => import('@/views/video/index'),
        meta: { title: '直播间列表', icon: 'livelist' }
      },
	    /*{
		    path: 'my',
		    name: '我的直播间',
		    component: () => import('@/views/video/My'),
		    meta: { title: '我的直播间', icon: 'mylive' }
	    },*/
	    {
		    path: 'password',
		    name: '直播间密码',
		    component: () => import('@/views/video/Password'),
		    meta: { title: '直播间密码', icon: 'livepwd' }
	    },
      {
        path: 'chatmsg',
        name: '直播互动',
        component: () => import('@/views/chatmsg/index'),
        meta: { title: '直播互动', icon: 'chatmsg' }
      },
      {
        path: 'wx_code',
        name: '二维码管理',
        component: () => import('@/views/wx_code/index'),
        meta: { title: '二维码管理', icon: 'wx_code' }
      },
      {
        path: 'word',
        name: '敏感词汇管理',
        component: () => import('@/views/word/index'),
        meta: { title: '敏感词汇管理', icon: 'word' }
      },
      {
        path: 'online',
        name: '在线列表',
        component: () => import('@/views/online/index'),
        meta: { title: '在线列表', icon: 'online' }
      }
    ]
  },

  {
  	path: '/website',
	  component: Layout,
	  redirect: '/website/index',
	  name: '网站管理',
	  meta: { title: '网站管理', icon: 'website' },
	  children: [
      {
        path: 'level',
        name: '会员等级',
        component: () => import('@/views/levels/index'),
        meta: { title: '会员等级', icon: 'level' }
      },
      {
        path: '/ads',
        name: '广告设置',
        component: () => import('@/views/ads/index'),
        meta: { title: '广告设置', icon: 'ad' },
        children: [
          {
            path: 'Homead',
            name: '首页广告',
            component: () => import('@/views/ads/Homead'),
            meta: { title: '首页广告', icon: 'homead' }
          },
          {
            path: 'Livead',
            name: '直播间广告',
            component: () => import('@/views/ads/Livead'),
            meta: { title: '直播间广告', icon: 'livead' }
          },
          {
            path: 'Livead',
            name: '弹幕广告',
            component: () => import('@/views/ads/Livead'),
            meta: { title: '弹幕广告', icon: 'livead' }
          }
        ]
      },
      {
        path: 'teacher',
        name: '名师管理',
        component: () => import('@/views/teachers/index'),
        meta: { title: '名师管理', icon: 'teacher' }
      },
      {
        path: 'course',
        name: '课程管理',
        component: () => import('@/views/courses/index'),
        meta: { title: '课程管理', icon: 'course' }
      },
      {
        path: '/article',
        name: '文章管理',
        component: () => import('@/views/article/list'),
        meta: { title: '文章管理', icon: 'article' },
        children: [
          {
            path: 'articleType',
            name: '文章类别',
            component: () => import('@/views/articleType/index'),
            meta: { title: '文章类别', icon: 'type' }
          },
          {
            path: 'index',
            name: '文章列表',
            component: () => import('@/views/article/index'),
            meta: { title: '文章列表', icon: 'article2' }
          }
        ]
      },
      {
        path: '/overview',
        name: '学校概况',
        component: () => import('@/views/introduction/list'),
        meta: { title: '学校概况', icon: 'school' },
        children: [
          {
            path: 'introduction',
            name: '学校简介',
            component: () => import('@/views/introduction/index'),
            meta: { title: '学校简介', icon: 'introduction' }
          },
          {
            path: 'history',
            name: '发展历程',
            component: () => import('@/views/histories/index'),
            meta: { title: '发展历程', icon: 'history' }
          }
        ]
      },
      {
        path: 'announcement',
        name: '重要通告',
        component: () => import('@/views/announcement/index'),
        meta: { title: '重要通告', icon: 'announcement' }
      },
      {
        path: 'answer',
        name: '咨询问答',
        component: () => import('@/views/robot/Answer'),
        meta: { title: '咨询问答', icon: 'answer' }
      }
	  ]
  },
  {
    path: '/sale',
    component: Layout,
    redirect: '/sale/index',
    name: '营销工具',
    meta: { title: '营销工具', icon: 'sale' },
    children: [
      {
        path: 'index',
        name: '抽奖',
        component: () => import('@/views/sale/Index'),
        meta: { title: '抽奖', icon: 'prize' }
      },
	    {
		    path: '/packet',
		    name: '红包管理',
        // redirect: 'packet',
        component: () => import('@/views/packet/index'),

		    meta: { title: '红包管理', icon: 'packet' },
        children: [
          {
            path: 'List',
            name: '红包列表',
            component: () => import('@/views/packet/List'),
            meta: { title: '红包列表', icon: 'packet' }
          },
          {
            path: 'Userpacket',
            name: '用户红包',
            component: () => import('@/views/packet/Userpacket'),
            meta: { title: '用户红包', icon: 'packet' }
          }
        ]
	    },
      {
        path: 'activity',
        name: '活动',
        component: () => import('@/views/sale/Activity'),
        meta: { title: '活动', icon: 'activity' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'violation/index',
    name: '违规处理',
    hidden: false,
    children: [
      {
        path: 'violation/index',
        component: () => import('@/views/violation/Index'),
        meta: { title: '违规处理', icon: 'violation' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


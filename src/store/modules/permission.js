import { asyncRouterMap, constantRouterMap } from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(access, route) {
  /*if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
    Arr.indexOf(element);
  }*/
  if(route.meta && route.meta.access_point){
    if(access.access_point.indexOf(route.meta.access_point)>1){
      return true
    }
    if(access.main_menu.indexOf(route.meta.access_point)>1){
        return true
    }
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, access) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(access, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, access)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { access } = data
        let accessedRouters
        if (access.role_id==1) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, access)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

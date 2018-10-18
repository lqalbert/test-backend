import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    nickname: '',
    avatar: '',
    roles: [],
    user_id: '',
    live_url: 'rtmp://192.168.121.130/lives',
    live_key: '（密匙已过期请重新设置）',
    company_id: '',
    level_type: '',
    company_name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id
    },
    SET_LIVE_URL: (state, live_url) => {
      state.live_url = live_url
    },
    SET_LIVE_KEY: (state, live_key) => {
      state.live_key = live_key
    },
    SET_COMPANY_ID: (state, company_id) => {
      state.company_id = company_id
    },
    SET_LEVEL_TYPE: (state, level_type) => {
      state.level_type = level_type
    },
    SET_COMPANY_NAME: (state, company_name) => {
      state.company_name = company_name
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: 用户角色未设置 !')
          }
          commit('SET_NAME', data.name)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          commit('SET_USER_ID', data.user_id)
          commit('SET_COMPANY_ID', data.company_id)
          commit('SET_LEVEL_TYPE', data.level_type)
          commit('SET_COMPANY_NAME', data.company_name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 修改数据
    ChangeLive({ commit }, [key, data]) {
      commit(key, data)
    }
  }
}

export default user

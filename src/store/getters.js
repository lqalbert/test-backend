const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  user_id: state => state.user.user_id,
  role_id: state => state.user.role_id,
  live_url: state => state.user.live_url,
  live_key: state => state.user.live_key,
  company_id: state => state.user.company_id,
  company_name: state => state.user.company_name,
  level_type: state => state.user.level_type,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
}
export default getters

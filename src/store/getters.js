const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  user_id: state => state.user.user_id,
  live_url: state => state.user.live_url,
  live_key: state => state.user.live_key,
  company_id: state => state.user.company_id,
  level_type: state => state.user.level_type
}
export default getters

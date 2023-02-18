import { http } from 'services/http'
import { apiLogin, apiLogout } from 'services/apiRouter'

const login = (data) => http.post(apiLogin, { ...data })

const logout = () => http.post(apiLogout)

export default { login, logout }

import { http } from 'services/http'
import { apiCEOgetList } from 'services/apiRouter'

const getList = () => http.get(apiCEOgetList)

export default { getList }

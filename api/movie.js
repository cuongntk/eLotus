import { http } from 'services/http'
import { apiTmdbNowPlaying, apiTmdbTopRated } from 'services/apiRouter'

const getListNowPlaying = (p) =>
  http.get(apiTmdbNowPlaying, {
    params: {
      page: p,
    },
  })

const getListTopRated = (p) =>
  http.get(apiTmdbTopRated, {
    params: {
      page: p,
    },
  })

const getOne = (id) => http.get(id)

export default { getListNowPlaying, getListTopRated, getOne }

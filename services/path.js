export const path403 = '/403'
export const path404 = '/404'
export const path500 = '/404'
export const pathHome = '/'
export const pathLogin = (redirectURL = '') => (redirectURL ? `/login?redirectURL=${redirectURL}` : `/login`)

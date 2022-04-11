import $http from './http'

export const API = {
  intelligence_list: data => $http('get', '/match/intelligence-list', data),
}

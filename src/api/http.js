import axios from 'axios'
axios.defaults.baseURL = '/'

axios.interceptors.request.use(
  config => {
    //http request 拦截器
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json',
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(response => {
  //http response 拦截器
  switch (response.data.code) {
    case 200:
      break
    default:
      break
  }
  return response.data
})

const get = (url, params = {}) => {
  //封装get方法
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const post = (url, data) => {
  //封装post请求
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response)
      },
      err => reject(err)
    )
  })
}

const http = (fecth, url, param) => {
  //统一接口处理，返回数据
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        get(url, param)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
        break
      case 'post':
        post(url, param)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
        break
      default:
        break
    }
  })
}
export default http

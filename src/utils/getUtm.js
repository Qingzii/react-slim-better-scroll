const getCookieVal = offset => {
  let endstr = document.cookie.indexOf(';', offset)
  if (endstr === -1) endstr = document.cookie.length
  return unescape(document.cookie.substring(offset, endstr))
}

const GetCookie = name => {
  //取Cookie
  let arg = name + '='
  let alen = arg.length
  let clen = document.cookie.length
  let i = 0
  while (i < clen) {
    let j = i + alen
    if (document.cookie.substring(i, j) === arg) return getCookieVal(j)
    i = document.cookie.indexOf(' ', i) + 1
    if (i === 0) break
  }
  return ''
}

export const getUtm = () => {
  // 获取utm参数
  let a = GetCookie('utm') && JSON.parse(GetCookie('utm'))
  for (let key in a) {
    if (key.indexOf('utm') > -1) {
      let utm = a
      return utm
    }
  }
  let url = window.location.href //获取当前url
  let dz_url = url.split('#')[1] //获取#/之前的字符串
  let cs = dz_url ? dz_url.split('?')[1] || '' : url.split('?')[1] || '' //获取?之后的参数字符串
  if (cs === '' || !cs) return
  let cs_arr = cs.split('&') //参数字符串分割为数组
  let utm = {},
    index = 0
  for (var i = 0; i < cs_arr.length; i++) {
    //遍历数组，拿到json对象
    if (cs_arr[i].split('=')[0].indexOf('utm') === -1) continue // 只保留utm相关参数
    utm[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
    index++
  }
  if (index === 0) return
  let expire = new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 30)
  expire = ';expires=' + expire.toGMTString()
  document.cookie = 'utm=' + escape(JSON.stringify(utm)) + expire
  return utm
}

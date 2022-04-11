import CryptoJS from 'crypto-js/crypto-js' //引用AES源码js
const key = CryptoJS.enc.Utf8.parse('l4bRkSxAiLSGbvxQYsm4CZcmTVoAFtKN') //密钥
const iv = CryptoJS.enc.Utf8.parse('') //偏移量

const decrypt = word => {
  //解密方法
  let decryptedStr
  let base64 = CryptoJS.enc.Base64.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(base64)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  try {
    decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString().replace(/[\r\n]/g, '')
  } catch (error) {
    localStorage.clear()
  }
}

const encrypt = word => {
  //加密方法
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export { decrypt, encrypt }

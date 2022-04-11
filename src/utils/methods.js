import encryptlong from 'encryptlong'

export const clearAllCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (var i = keys.length; i--; ) {
      document.cookie = keys[i] + '=0;path=' / ';expires=' + new Date(0).toUTCString()
    }
  }
}

export const filterEncrty = data => {
  let privateKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICWwIBAAKBgQDjjUje3ofEWw1/BtBrf4u7hX/L9KQppdtwRoipf/L3XMfFxyOh\n' +
    'Z+u5ZyPrxmRBllSwI2TiOTmIzmSEO4xaRwhXUs3rTPfQ5Gp1bw43rbluWau03GRd\n' +
    'X1n2m8bq1aUADa9gB0UzqRjVPn6vEIzN4FiQ/fdg2Bd/PmrX3OEPl4x9SwIDAQAB\n' +
    'AoGAWdEOjkmvtSVrclQyN/wkH2RWSR7LHVVGBE8S6jSCpniMsdgkjDUEqi230/x+\n' +
    '3hSEYPHXhCOqPgGZU0hd4dRfybkkVmXS/fN8kXfDJyA/4xwFEZkvXsgYHxFCsR6D\n' +
    'gHHh08aSb2v4zxxkbmPsFxKXBEvTHTqrcIYIJcBUHh7MhKECQQD/PRZk8SatWu2L\n' +
    'My8/ALlt9jqqpJOWGTpxObZlSiP2ObCzWS1nvHg8tdzBFScNjmB1x4+kxph8mp6O\n' +
    'g0a1tI/FAkEA5DsN42F5+a2WLVwh7nlWJ1zURNHhEVldlSNed4OGQaKtYllM7m08\n' +
    'YGYHJ1e3Tdc5aR4w8Ln4MyPo8VJcHJoZzwJAKKzHgNadX0r6SBCkGto2srtmpgMM\n' +
    'MgNbOOgFlSa3jGmtKyevALUcRDCHOY3xZ0ulO5/N2Gh9rH3HftaU0igwMQJALNVU\n' +
    '8xfQ6DUrTRnOKJR5Uh4wLJy2A7x0X7mk8wFJPFeCi9FTBXs74wvn19ipT4c55eZi\n' +
    'YseFdDZXqiAtrAixjQJAVRBvRkYpW78T2p/t3LuJXO7w4gta04CYatW+xkon8jxR\n' +
    'mJKtSBIPvSy7XTgbHV6nor93MJia/N52CrtDJ29XmA==\n' +
    '-----END RSA PRIVATE KEY-----'
  //实例化jsEncrypt对象
  let jm = new encryptlong()
  jm.setPrivateKey(privateKey)
  return jm.decryptLong(data)
}



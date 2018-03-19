import nConfig from 'config/network'
import resCode from 'config/resCode'
import Network from 'network'

const RETRY_INTERVAL = 1000
const MAX_RETRY_TIME = 10

const login = function(tryTime, cb) {
  console.log(`[Network] start login, ${tryTime}`)
  wx.login({
    success: res => {
      wx.request({
        url: nConfig.LOGIN, 
        method: 'POST',
        data: {
          code: res.code
        },
        success: res => {
          res.data = res.data || {}
          if (res.statusCode !== 200 || res.data.code !== 0) {
            console.error(`[Network] login failed ${JSON.stringify(res)}`)
            ++tryTime
            if (tryTime < MAX_RETRY_TIME) {
              setTimeout(function() {
                login(tryTime, cb)
              }, RETRY_INTERVAL)
            }
          } else {
            console.log(`[Network] login success, ${JSON.stringify(res.data.data)}`)
            cb && cb(res.data.data)

            wx.getUserInfo({
              success: userInfo => {
                Network.decryptWXData(userInfo.encryptedData, userInfo.iv, res => {
                  Network.store({
                    userInfo: res.data
                  })
                })
              }
            })
          }
        },
        fail: err => {
          cb(undefined)
        }
      })
    }
  })
}

export default login

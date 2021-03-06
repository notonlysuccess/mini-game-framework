import DataCenter from 'data/dataCenter'
import resCode from 'config/resCode'

const RETRY_INTERVAL = 10000
const MAX_RETRY_TIME = 5
const tryAgain = (object, err, retryTime) => {
  ++retryTime
  console.error(`${err} ${object.url} retry time: ${retryTime}`)
  if (retryTime === MAX_RETRY_TIME) {
    object.fail(err)
    return
  }
  setTimeout(function() {
    tryRequest(object, retryTime)
  }, RETRY_INTERVAL)
}

const tryRequest = (object, retryTime) => {
  console.log(`[Network] start request ${object.url}`)
  wx.request({
    url: object.url,
    method: 'POST',
    data: object.data,
    success: res => {
      // res.data.code = resCode.ERR_SESSION_TIMEOUT
      if (res.statusCode !== 200) {
        tryAgain(object, `[Network] req: ${JSON.stringify(object)}, statusCode: ${res.statusCode}`, retryTime)
      } else if (!res.data) {
        tryAgain(object, `[Network] req: ${JSON.stringify(object)}, data: ${JSON.stringify(data)}`, retryTime)
      } else if (res.data.code === resCode.ERR_SESSION_TIMEOUT || res.data.code === resCode.ERR_BAD_SESSION) {
        DataCenter.getNetworkData('session', data => {
          if (data) {
            object.data.session = data.session
            if (object.sessionTimeout) {
              object.sessionTimeout()
            } else {
              tryAgain(object, `[Network] session timeout`, retryTime)
            }
          }
        })
      } else if (res.data.code) {
        tryAgain(object, `[Network] req: ${JSON.stringify(object)}, code: ${res.data.code}`, retryTime)
      } else {
        object.success(res.data.data)
      }
    },
    fail: res => {
      tryAgain(object, `[Network] request failed req:${JSON.stringify(object)}, res: ${JSON.stringify(res)}`, retryTime)
    }
  })
}

// request with session
const request = object => {
  DataCenter.getData('session', data => {
    object.data.session = data.session
    tryRequest(object, 0)
  })
}

export {
  request
}

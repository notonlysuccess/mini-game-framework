import config from 'config/network'
import {
  request
} from 'utils/request'

const decryptWXData = function(encryptedData, iv, cb) {
  request({
    url: config.DECRYPT_WX_DATA,
    data: {
      encryptedData,
      iv
    },
    success: data => {
      cb && cb(data)
    },
    fail: err => {
    }
  })
}

export default decryptWXData

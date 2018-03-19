import config from 'config/network'
import {
  request
} from 'utils/request'

const getGameInfo = function(cb) {
  request({
    url: config.GET_GAME_INFO,
    data: {},
    success: data => {
      cb && cb(data)
    },
    fail: err => {
    }
  })
}

export default getGameInfo

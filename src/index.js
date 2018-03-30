import 'weapp-adapter.js'
import 'laya.core.js'
import 'laya.ui.js'
import 'laya.wxmini.js'

Laya.MiniAdpter.init()

import config from 'config'

Laya.init(config.SCREEN_WIDTH, config.SCREEN_HEIGHT)

import onShow from './onShow'
import onHide from './onHide'
import Audio from 'audio'

Audio.init()

wx.onShow(options => {
  onShow(options)
})

wx.onHide(options => {
  onHide(options)
})

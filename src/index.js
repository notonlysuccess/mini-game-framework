import 'weapp-adapter.js'
import 'laya.core.min.js'
import 'laya.ui.min.js'
import 'laya.wxmini.min.js'
import config from 'config'

Laya.MiniAdpter.init()
Laya.init(config.SCREEN_WIDTH, config.SCREEN_HEIGHT)

import onShow from 'onShow'
import onHide from 'onHide'

wx.onShow(options => {
  onShow(options)
})

wx.onHide(options => {
  onHide(options)
})

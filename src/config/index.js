const info = wx.getSystemInfoSync()
const DPR = info.devicePixelRatio
const isIphoneX = info.model.indexOf('iPhone X') !== -1

export default {
  BASE_SCREEN_WIDTH: 414 * 3,
  BASE_SCREEN_HEIGHT: 736 * 3,
  SCREEN_WIDTH: info.screenWidth * 3,
  SCREEN_HEIGHT: info.screenHeight * 3,
  PLATFORM: info.platform,
  IS_IPHONEX: isIphoneX,
  SAFE_HEIGHT: 30 * 3,
  STATE_HEIGHT: 42 * 3,
  STATE_WIDTH: (414 - 100) * 3,
  STATE_MARGIN_TOP: 32,
  STATE_PAUSE_ICON_SIZE: 48 * 3,
  DPR,
  FRAME_MS: 16,
}

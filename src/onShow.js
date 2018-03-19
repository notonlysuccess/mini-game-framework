import AssetsLoader from 'utils/assetsLoader'
import PanelManager from 'panel/panelManager'
import GameLoop from 'gameLoop'

let firstEnter = true

const onShow = options => {
  GameLoop.start()

  if (firstEnter) {
    firstEnter = false
    AssetsLoader.init(() => {
      PanelManager.redirectTo('animation')
    })
  }
}

export default onShow

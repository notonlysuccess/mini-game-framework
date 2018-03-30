import GamePanel from './gamePanel'
import WelcomePanel from './welcomePanel'
import AnimationPanel from './animationPanel'
import RankPanel from './rankPanel'

export default class PanelManager {
  static _panels = []

  static _panelMap = {
    'game': GamePanel,
    'welcome': WelcomePanel,
    'animation': AnimationPanel,
    'rank': RankPanel
  }

  static destroy() {
    for (let i = this._panels.length - 1; i >= 0; --i) {
      this._panels[i]._destroy()
    }
    this._panels = []
  }

  static redirectTo(panelName, ...args) {
    const panelClass = this._panelMap[panelName]
    if (!panelClass) {
      console.error(`Can not found ${panelName} panel`)
      throw `Can not found ${panelName} panel`
    }

    if (this._panels.length) {
      const currentPanel = this._panels.splice(this._panels.length - 1, 1)[0]
      currentPanel._destroy()
    }

    this._panels.push(new panelClass(...args))
  }

  static navigateTo(panelName, ...args) {
    const panelClass = this._panelMap[panelName]
    if (!panelClass) {
      console.error(`Can not found ${panelName} panel`)
      throw `Can not found ${panelName} panel`
    }

    if (this._panels.length) {
      const currentPanel = this._panels[this._panels.length - 1]
      currentPanel.hide()
    }

    this._panels.push(new panelClass(...args))
  }

  static reLaunch(panelName, ...args) {
    const panelClass = this._panelMap[panelName]
    if (!panelClass) {
      console.error(`Can not found ${panelName} panel`)
      throw `Can not found ${panelName} panel`
    }

    for (let i = this._panels.length - 1; i >= 0; --i) {
      this._panels[i]._destroy()
    }

    this._panels = [new panelClass(...args)]
  }

  static navigateBack() {
    const currentPanel = this._panels.splice(this._panels.length - 1, 1)[0]
    currentPanel._destroy()

    if (this._panels.length) {
      const prevPanel = this._panels[this._panels.length - 1]
      prevPanel.show()
    }
  }
}

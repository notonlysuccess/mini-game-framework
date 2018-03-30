import config from 'config/audio'

export default class Audio {
  static init() {
    this._audios = {}
    for (const key in config) {
      const audio = wx.createInnerAudioContext()
      audio.src = config[key]
      audio._finished = 0
      audio._waiting = 0

      audio.onEnded(() => {
        audio._finished++
        if (audio._waiting > audio._finished) {
          audio.play()
        }
      })
      this._audios[key] = audio
    }
  }
  static play(name) {
    if (this._audios[name]) {
      this._audios[name]._waiting++
      this._audios[name].play()
    }
  }
}

import { classicBehavior } from './../classic_beh.js'

const controlAudio = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    audioSrc: String
  },
  attached () {
    this._rescoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseURL: 'images/player@waitting.png',
    playURL: 'images/player@playing.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay () {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        controlAudio.title = 'start'
        controlAudio.src = this.properties.audioSrc
      } else {
        this.setData({
          playing: false
        })
        controlAudio.pause()
      }
    },
    _rescoverStatus () {
      if (controlAudio.paused) {
        this.setData({
          playing: false
        })
        return 
      } 
      
      if (controlAudio.src == this.properties.audioSrc) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      controlAudio.onPlay(() => {
        this._rescoverStatus()
      })
      controlAudio.onPause(() => {
        this._rescoverStatus()
      })
      controlAudio.onStop(() => {
        this._rescoverStatus()
      })
      controlAudio.onEnded(() => {
        this._rescoverStatus()
      })
    }
  }
})

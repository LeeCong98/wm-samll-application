import UserModel from './../../models/user.js'
var userRequest = new UserModel 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDelegate: true,
    userInfo: {},
    likeBookNumber: 0,
    classicItem: []
  },

  /**
   * 生命周期函数--监听页面加载
   * login 
   * register
   * /admin
   * 
   */
  onLoad: function (options) {
    this.getInfo()
  },
  // 用户操作函数
  delegateUser (event) {
    if (event.detail.rawData) {
      this.setData({
        userInfo: JSON.parse(event.detail.rawData),
        isDelegate: true
      })
    } else {
      this.showPrompt('授权失败')
    }
  },
  getInfo () {
    wx.getUserInfo({
      success: (event) => {
        if (event.userInfo) {
          this.setData({
            userInfo: event.userInfo,
            isDelegate: true
          })
        }
      },
      fail: (event) => {
        if (event.errMsg) {
          this.setData({
            isDelegate: false
          })
        }
      }
    })
  },
  pageDataInit () {
    userRequest.getLikeBookNumber(({ data }) => {
      this.setData({
        likeBookNumber: data.count
      })
    }, () => {
      this.showPrompt('获取数据失败')
    })
    userRequest.getClassic(({ data }) => {
      this.setData({
        classicItem: data
      })
    })
  },
  showPrompt (text) {
    wx.showToast({
      title: text,
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  removeItem (event) {
    var index = event.currentTarget.dataset['index']
    if (index !== undefined) {
      this.setData({
        classicItem: this.data.classicItem.filter((item, idx) => {
          if (index !== idx) return item
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.pageDataInit()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
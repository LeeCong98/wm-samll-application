import classicModel from '../../models/classic.js'
import Like from '../../models/like.js'

let classic_model = new classicModel()
let like = new Like()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,  // 最新期刊的数据
    latest: true,
    first: false,
    like_status: true,
    fav_nums: 0
  },

  // #页面自定义事件

  // ## 点击与取消点赞
  onLike (event) {
    let behavior = event.detail.behavior
    like.changePro(behavior, this.data.classicData.type, this.data.classicData.id)
  },
  // 更新classicData数据
  _updateClassicData (type) {
    classic_model.getPreviousOrNext((rsp) => {
      // 每次使用缓存更新点赞数和点赞次数
      like._getClassicLikeStatus(rsp.id, rsp.type, (rsp) => {
        this.setData({
          'like_status': rsp.data.like_status,
          'fav_nums': rsp.data.fav_nums
        })
      })
      this.setData({
        classicData: rsp,
        latest: classic_model.isLatest(rsp.index),
        first: classic_model.isFirst(rsp.index)
      })
    }, this.data.classicData.index, type)
  },
  // ## 用户点击左边进行组件切换
  onPrevious (event) {
    this._updateClassicData('/previous')
  },
  // ## 用户点击右边进行组件切换
  onNext (event) {
    this._updateClassicData('/next')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    classic_model.getLatest((rsp) => {
      this.setData({
        classicData: rsp.data,
        like_status: rsp.data.like_status,
        fav_nums: rsp.data.fav_nums
      })
    })
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
  onShareAppMessage: function (event) {
    // 用户分享功能，首先需要设置showShareMenu的withShareMenu为true，以获得分享的数据
    wx.showShareMenu({
      withShareTicket: true,
      success (event) {
        // 如果没有转发，那么这里的withShareTicke为空
        console.log(event)
      }
    })
    return {
      title: 'testing',
      path: '/page/classic/classic'
    }
  }
})
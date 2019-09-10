import { BookModel } from '../../models/book.js' 

const book = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: {},
    feature: false,
    more: null
  },
  methods: {
  },
  // 子组件事件
  toBookDetail (event) {
    wx.navigateTo({
      url: '/pages/book-detail/index?id=' + event.detail.bookId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    book.getHotList()
    .then((res) => {
      this.setData({
        books: res.data
      })
    })
  },
  // 页面事件处理
  checkSeek (event) {
    if (event.detail.type === 'cancel') {
      this.setData({
        feature: false
      }) 
    } else {
      this.setData({
        feature: true
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      feature: false
    })
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
    // 赋值随机数进行加载
    this.setData({
      more: parseInt(Math.random() * 11)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
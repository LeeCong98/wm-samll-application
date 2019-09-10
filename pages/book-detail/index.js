import {BookModel} from './../../models/book.js'
import  LikeModel  from './../../models/like.js'

var BookRequest = new BookModel
const likeRequest = new LikeModel
Page({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },
  /**
   * 组件的初始数据
   */
  data: {
    bookDetail: {},
    likeInfo: {
      likestatus: false,
      fav_nums: 0,
      id: null
    },
    bookComment: {
      comments: [{}]
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  },
  // 赞改变
  changeLikeStatus (event, params) {
    const behavior = event.detail.behavior
    const type = 4e2
    likeRequest.changePro(behavior, type, this.data.likeInfo.id)
  },
  update () {
    BookRequest.getComments(this.data.likeInfo.id)
      .then(rsp => {
        this.setData({
          bookComment: rsp.data
        })
      })
  },
  onLoad (options) {
    // 显示加载
    wx.showLoading()
    var detail =  BookRequest.getBookDetail(options.id)
    var likeStatus = BookRequest.getLikeStatus(options.id)
    var comment = BookRequest.getComments(options.id)
    detail.then(rsp => {
        this.setData({
          bookDetail: rsp.data
        })
      })
    
    likeStatus.then(rsp => {
        this.setData({
          likeInfo: {
            likestatus: rsp.data.like_status,
            fav_nums: rsp.data.fav_nums,
            id: rsp.data.id
          }
        })
      })
    
    comment.then(rsp => {
        this.setData({
          bookComment: rsp.data
        })
      })
    // 隐藏加载,使用promise.all方法
    Promise.all([detail, likeStatus, comment])
    .then(rsps => {
      wx.hideLoading()
    }, error=> {
      wx.hideLoading()
    })
  },
  onReady () {

  },
  onShow () {

  },
  onHide () {

  },
  onUnLoad () {

  }
})

import HTTP from './../util/http.js'

class Like extends HTTP {
  changePro (behavior, type, art_id) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        type: type,
        art_id: art_id
      },
      success (rsp) {
        if (rsp.data.error_code !== 0) {
          wx.showToast({
            title: behavior === 'like' ? '点赞失败' : '取消点赞失败',
            duration: 700,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: behavior === 'like' ? '点赞成功' : '取消点赞成功',
            duration: 700,
            icon: 'none'
          })
        }
      }
    })
  }
  _getClassicLikeStatus (artId, category, callback) {
    this.request({
      url: 'classic/' + category + '/' + artId + '/favor',
      success: callback
    })
  }
}
export default Like
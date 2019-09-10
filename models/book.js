import { HTTP } from './../util/http-p.js'

class BookModel extends HTTP {
  getHotList () {
    return this.request({
      url: 'book/hot_list',
    })
  }
  getBookDetail (bookId) {
    return this.request({
      url: `book/${ bookId }/detail`
    })
  }
  getComments (bookId) {
    return this.request({
      url: `book/${ bookId }/short_comment`
    })
  }
  getLikeStatus (bookId) {
    return this.request({
      url: `book/${ bookId }/favor`
    })
  }
  putComment (params) {
    return this.request({
      url: `/book/add/short_comment`,
      data: params,
      method: 'POST'
    })
  }
}
export { BookModel }
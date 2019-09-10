import { HTTP } from './../util/http-p.js'

class UserModel extends HTTP {
  getLikeBookNumber(success, error) {
    this.request({
      url: '/book/favor/count'
    })
      .then(success, error)
  }
  getClassic (success, error) {
    this.request({
      url: '/classic/favor'
    })
    .then(success, error)
  }
}
export default UserModel
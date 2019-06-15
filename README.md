# 一个具备视听功能的小程序Example

## 技术栈

- 项目结构
  - REST结构
- 后端
  - Python
    - django-rest-framework

- 前端

  - tencent Wx
    - wxss(CSS) + wxml
  - javascript
  - 页面布局
    - flex

  - wx port

## config类的封装

- 状态码判断
  - 如果不是以2开头，那么就认为此次请求失败
- 使用ES6的一些方法
  - startWith
    - 以那个字符开头
  - endWdith
    - 以何字符结尾
- 使用ES6的class类对HTTP请求进行封装

### 在小程序中进行断点调试

- 在小程序中执行代码分为两种，你可以在小程序的source控制台看到，sm版本（我们写出的程序），以及其编译后的版本，
- 在sm'版本，你可以像在浏览器进行断电调试一样，进行程序的调试

### 小程序中的提示框

- `wx.showToast`
  - icon
    - 是否使用icon
  - title
    - 标题
  - duration
    - 持续时间

### 请求数据方法的封装

- 在程序设计中，我们一般都不会在一个页面中直接对一些数据进行请求，而是转而进行方法的封装

- 使用一些方法回调来进行数据的请求

  ```javascript
  classic.getLatest((rsp) => {
     this.setData({
     latestData: rsp.data
  })
  ```

### 组件数据更新

- 数据更新

  ```javascript
  <like-cmp like="{{like_status }}" count="{{ fav_nums }}"  />
  ```

### 小程序开发的数据更新技巧

- 既然我们使用了model数据层，那么我们在开发中，就不应当让这些数据请求在组件中完成，一个组件应当是独立的，而不是具有这种必然的耦合性，这样组件复用将显得非常棘手

### 补零的严谨性

- 在程序中，你应当避免在一些插值表达式或者操作获取中直接对数据进行过滤，应当使用一些单独的方法对数据进行处理，这样也方便后期的严谨性

### 注意内存泄漏的问题

- 注意，在observer中不能对数据本身赋值，这很简单，很简单，这和对gte和set赋值是一样的

### 触碰区域

- 在移动端触碰区域体验一定需要好，不能在移动端使用一些需要精确触碰的操作，这会让你的用户体验非常差

## 业务技巧

### 通过缓存机制来确认页码问题

- 我们每次去请求页面都是请求最新一期的期刊，那么我们此时将其缓存在文件中，然后我一次我们请求新的数都要求查看是否是最新一期，如果是最新一期，那么禁用按钮，不在发起请求新一期的请求
- 相同，以相同的道理去判断是否为第一期

### 利用缓存来减少请求次数

- 在一些程序中，如果用户会去频繁进行多次请求相同的内容，那么是非常消耗服务器的资源和性能，也给用户带来非常不要的体验
- 那么在这当中我们就要加入缓存机制，让用户请求相同的内容时不再发送新的请求，而是直接使用缓存中的数据进行数据的复用

### 注意缓存的缺陷

- 如果其中的数据包含一些会和用户进行交互的部分，那么你不应当让这部分数据进行缓存，而是进行数据请求或者进行实时更新，

## 音乐的播放和状态管理

- 需要注意切换组件之间的状态修改

## 小程序的TabBar

- 在app.json中进行定义

  ```javascript
   "tabBar": {
      "borderStyle": "black",
      "selectedColor": "#000000",
      "backgroundColor": "#ffffff",
      "color": "#c7c7c7",
      "list": [
        {
          "pagePath": "pages/classic/classic",
          "selectedIconPath": "/images/tab/classic@highlight.png",
          "iconPath": "/images/tab/classic.png",
          "text": "流行"
        },
        {
          "pagePath": "pages/book/book",
          "selectedIconPath": "/images/tab/book@highlight.png",
          "iconPath": "/images/tab/book.png",
          "text": "书单"
        },
        {
          "pagePath": "pages/user/user",
          "selectedIconPath": "/images/tab/my@highlight.png",
          "iconPath": "/images/tab/my.png",
          "text": "喜欢"
        }
      ]
    }
  ```

- 注意如果其中的资源无效，那么程序将会报错

### Promise的几个方法

- rece

  - **Promise.race(iterable)** 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

  - ```javascript
    var promise1 = new Promise(function(resolve, reject) {
        setTimeout(resolve, 500, 'one');
    });
    
    var promise2 = new Promise(function(resolve, reject) {
        setTimeout(resolve, 100, 'two');
    });
    
    Promise.race([promise1, promise2]).then(function(value) {
      console.log(value);
    ```

- all

  - 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例，此实例在 `iterable` 参数内所有的 `promise` 都“完成（resolved）”或参数中不包含 `promise` 时回调完成（resolve）；如果参数中  `promise` 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 `promise` 的结果。

  - ```java
    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values);
    }
    ```

  
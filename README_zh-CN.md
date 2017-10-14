# vue-simple-uploader  [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url] [![juejin likes][juejin-image]](juejin-url)

> 一个基于 [simple-uploader.js](https://github.com/simple-uploader/Uploader) 的 Vue 上传组件

![example](https://github.com/simple-uploader/vue-uploader/blob/master/example/simple-uploader.gif)

## 特性

* 支持文件、多文件、文件夹上传

* 支持拖拽文件、文件夹上传

* 统一对待文件和文件夹，方便操作管理

* 可暂停、继续上传

* 错误处理

* 支持“快传”，通过文件判断服务端是否已存在从而实现“快传”

* 上传队列管理，支持最大并发上传

* 分块上传

* 支持进度、预估剩余时间、出错自动重试、重传等操作

## 安装

``` bash
npm install vue-simple-uploader --save
```

## 使用

### 初始化

``` js
import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import App from './App.vue'

Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
  render(createElement) {
    return createElement(App)
  }
}).$mount('#app')
```

### App.vue

``` vue
<template>
  <uploader :options="options" class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
          target: '//localhost:3000/upload',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        }
      }
    }
  }
</script>

<style>
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
```

## 组件

### Uploader

上传根组件，可理解为一个上传器。

#### Props

* `options {Object}`

  参考 [simple-uploader.js 配置](https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#配置)。

* `autoStart {Boolean}`

  默认 `true`, 是否选择文件后自动开始上传。

#### 事件

参见 [simple-uploader.js uploader 事件](https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#事件)

**注意：**

* 所有的事件都会通过 [lodash.kebabCase](https://github.com/lodash/lodash/blob/master/kebabCase.js) 做转换，例如 `fileSuccess` 就会变成 `file-success`。

* `catch-all` 这个事件是不会触发的。

* `file-added(file)`, 添加了一个文件事件，一般用做文件校验，如果设置 `file.ignored = true` 的话这个文件就会被过滤掉。

#### 作用域插槽

* `files {Array}`

  纯文件列表，没有文件夹概念。

* `fileList {Array}`

  统一对待文件、文件夹列表。

* `started`

  是否开始上传了。

#### 得到 `Uploader` 实例

可以通过如下方式获得：

```js
// 在 uploader 组件上会有 uploader 属性 指向的就是 Uploader 实例
const uploaderInstance = this.$refs.uploader.uploader
// 这里可以调用实例方法
// https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#方法
uploaderInstance.cancel()
```

### UploaderBtn

点选上传文件按钮。

#### Props

* `directory {Boolean}`

  默认 `false`, 是否是文件夹上传。

* `single {Boolean}`

  默认 `false`, 如果设为 `true`，则代表一次只能选择一个文件。

* `attrs {Object}`

  默认 `{}`, 添加到 input 元素上的额外属性。

### UploaderDrop

拖拽上传区域。

### UploaderList

文件、文件夹列表，同等对待。

#### 作用域插槽

* `fileList {Array}`

  文件、文件夹组成数组。

### UploaderFiles

文件列表，没有文件夹概念，纯文件列表。

#### 作用域插槽

* `files {Array}`

  文件列表。

### UploaderUnsupport

不支持 HTML5 File API 的时候会显示。

### UploaderFile

文件、文件夹单个组件。

#### Props

* `file {Uploader.File}`

  封装的文件实例。

* `list {Boolean}`

  如果是在 `UploaderList` 组件中使用的话，请设置为 `true`。

#### 作用域插槽

* `file {Uploader.File}`

  文件实例。

* `list {Boolean}`

  是否在 `UploaderList` 组件中使用。

* `status {String}`

  当前状态，可能是：`success`, `error`, `uploading`, `paused`, `waiting`

* `name {String}`

  文件名字。

* `paused {Boolean}`

  是否暂停了。

* `error {Boolean}`

  是否出错了。

* `averageSpeed {Number}`

  平均上传速度，单位字节每秒。

* `formatedAverageSpeed {String}`

  格式化后的平均上传速度，类似：`3 KB / S`。

* `currentSpeed {Number}`

  当前上传速度，单位字节每秒。

* `isComplete {Boolean}`

  是否已经上传完成。

* `isUploading {Boolean}`

  是否在上传中。

* `size {Number}`

  文件或者文件夹大小。

* `formatedSize {Number}`

  格式化后文件或者文件夹大小，类似：`10 KB`.

* `uploadedSize {Number}`

  已经上传大小，单位字节。

* `progress {Number}`

  介于 0 到 1 之间的小数，上传进度。

* `progressStyle {String}`

  进度样式，transform 属性，类似：`{transform: '-50%'}`.

* `progressingClass {String}`

  正在上传中的时候值为：`uploader-file-progressing`。

* `timeRemaining {Number}`

  预估剩余时间，单位秒。

* `formatedTimeRemaining {String}`

  格式化后剩余时间，类似：`3 miniutes`.

* `type {String}`

  文件类型。

* `extension {String}`

  文件名后缀，小写。

* `fileCategory {String}`

  文件分类，其中之一：`folder`, `document`, `video`, `audio`, `image`, `unknown`。

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

[npm-image]: https://img.shields.io/npm/v/vue-simple-uploader.svg?style=flat
[npm-url]: https://npmjs.org/package/vue-simple-uploader
[downloads-image]: https://img.shields.io/npm/dm/vue-simple-uploader.svg?style=flat
[downloads-url]: https://npmjs.org/package/vue-simple-uploader
[juejin-image]: https://badge.juejin.im/entry/599dad0ff265da248b04d7b8/likes.svg?style=flat
[juejin-url]: https://juejin.im/entry/599dad0ff265da248b04d7b8/detail

# vue-simple-uploader  [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][downloads-url] [![juejin likes][juejin-image]][juejin-url]

> A Vue.js upload component powered by [simple-uploader.js](https://github.com/simple-uploader/Uploader)

![example](https://github.com/simple-uploader/vue-uploader/blob/master/example/simple-uploader.gif)

![QQ](https://github.com/simple-uploader/Uploader/blob/develop/assets/simple-uploader-QQ-3.png?raw=true)

[中文](./README_zh-CN.md)

## Features

* Treat Folder and File as `File`
* Pause/Resume upload
* Recover upload
* Error handling
* Drag and Drop with folder reader
* Custom upload buttons
* Folder Upload
* Queue management
* File validation
* Upload progress
* Time remaining
* Chunk uploads

## Install

``` bash
npm install vue-simple-uploader@next --save
```

## Notes

- https://www.cnblogs.com/xiahj/p/vue-simple-uploader.html
- https://github.com/LuoLiangDSGA/spring-learning/tree/master/boot-uploader
- http://www.smarthu.club

## Usage

### init

``` js
import { createApp } from 'vue'
import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(uploader)
app.mount('#app')
```

### App.vue

``` vue
<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
  >
    <!-- <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list> -->
  </uploader>
</template>

<script>
  import { nextTick, ref, onMounted } from 'vue'
  export default {
    setup () {
      const uploaderRef = ref(null)
      const options = {
        target: '//localhost:3000/upload', // '//jsonplaceholder.typicode.com/posts/',
        testChunks: false
      }
      const attrs = {
        accept: 'image/*'
      }
      const statusText = {
        success: 'success',
        error: 'error',
        uploading: 'uploading',
        paused: 'paused',
        waiting: 'waiting'
      }
      const complete = () => {
        console.log('complete', arguments)
      }
      const fileComplete = () => {
        console.log('file complete', arguments)
      }
      onMounted(() => {
        nextTick(() => {
          window.uploader = uploaderRef.value.uploader
        })
      })
      return {
        uploaderRef,
        options,
        attrs,
        statusText,
        complete,
        fileComplete
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

## Components

### Uploader

Root component.

#### Props

* `options {Object}`

  See [simple-uploader.js options](https://github.com/simple-uploader/Uploader#configuration).

  Besides, some other options are avaliable too:

  - `parseTimeRemaining(timeRemaining, parsedTimeRemaining) {Function}`

    this function option to format the current file's time remaining value(seconds, number), you can return your language time remaining text, params:

    - `timeRemaining{Number}`, time remaining seconds

    - `parsedTimeRemaining{String}`, default shown time remaining text, you can use it like this:

      ```js
      parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
        return parsedTimeRemaining
          .replace(/\syears?/, '年')
          .replace(/\days?/, '天')
          .replace(/\shours?/, '小时')
          .replace(/\sminutes?/, '分钟')
          .replace(/\sseconds?/, '秒')
      }
      ```
  - `categoryMap {Object}`

    File category map, default:

    ```js
    {
      image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
      video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
      audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
      document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
    }
    ```

* `autoStart {Boolean}`

  Default `true`, Whether the file will be start uploading after it is added.

* `fileStatusText {Object}`

  Default:
  ```js
  {
    success: 'success',
    error: 'error',
    uploading: 'uploading',
    paused: 'paused',
    waiting: 'waiting'
  }
  ```
  An object map for file status text.

  After 0.6.0, `fileStatusText` can be a function with params `(status, response = null)`, you can control the status text more flexible:

  ```js
  fileStatusText(status, response) {
    const statusTextMap = {
      uploading: 'uploading',
      paused: 'paused',
      waiting: 'waiting'
    }
    if (status === 'success' || status === 'error') {
      // only use response when status is success or error
  
      // eg:
      // return response data ?
      return response.data
    } else {
      return statusTextMap[status]
    }
  }
  ```

* `onFileAdded(file) {Function}`
  
  After `1.0.0`.

  Called when file is added, this function is used for file validation. To reject(filter) this file you should `return false`.

* `onFilesAdded(files, fileList) {Function}`

  After `1.0.0`.

  Called when files are added, this function is used for files validation. To reject(filter) these files you should `return false`.

#### Events

See [simple-uploader.js uploader/events](https://github.com/simple-uploader/Uploader#events)

**Note:**

* All events name will be transformed by [lodash.kebabCase](https://github.com/lodash/lodash/blob/master/kebabCase.js), eg: `fileSuccess` will be transformed to `file-success`

* `catchAll` event will not be emited.

#### Scoped Slots

* `files {Array}`

  An array of files (no folders).

* `fileList {Array}`

  An array of files and folders.

* `started`

  Started uploading or not.

#### Get `Uploader` instance

You can get it like this:

```js
// Composition API
const uploader = ref(null)
// there will be an uploader attribute on the uploader component, which points to the Uploader instance
const uploaderInstance = uploader.value.uploader
// now you can call all uploader methods
// https://github.com/simple-uploader/Uploader#methods
uploaderInstance.cancel()

//Options API
const uploaderInstance = this.$refs.uploader.uploader
// now you can call all uploader methods
// https://github.com/simple-uploader/Uploader#methods
uploaderInstance.cancel()
```

### UploaderBtn

Select files button.

#### Props

* `directory {Boolean}`

  Default `false`, Support selecting Folder

* `single {Boolean}`

  Default `false`, To prevent multiple file uploads if it is `true`.

* `attrs {Object}`

  Default `{}`, Pass object to set custom attributes on input element.

### UploaderDrop

Droped files area.

### UploaderList

An array of `Uploader.File` file(folder) objects added by the user, but it treated Folder as `Uploader.File` Object.

#### Scoped Slots

* `fileList {Array}`

  An array of files and folders.

### UploaderFiles

An array of `Uploader.File` file objects added by the user.

#### Scoped Slots

* `files {Array}`

  An array of files (no folders).

### UploaderUnsupport

It will be shown if the current browser do not support HTML5 File API.

### UploaderFile

File item component.

#### Props

* `file {Uploader.File}`

  `Uploader.File` instance.

* `list {Boolean}`

  It should be `true` if it is puted in `UploaderList`

#### Scoped Slots

* `file {Uploader.File}`

  `Uploader.File` instance.

* `list {Boolean}`

  In `UploaderList` component or not.

* `status {String}`

  Current status, the values is one of `success`, `error`, `uploading`, `paused`, `waiting`

* `paused {Boolean}`

  Indicated if the file is paused.

* `error {Boolean}`

  Indicated if the file has encountered an error.

* `averageSpeed {Number}`

  Average upload speed, bytes per second.

* `formatedAverageSpeed {String}`

  Formated average upload speed, eg: `3 KB / S`

* `currentSpeed {Number}`

  Current upload speed, bytes per second.

* `isComplete {Boolean}`

  Indicated whether the file has completed uploading and received a server response.

* `isUploading {Boolean}`

  Indicated whether file chunks is uploading.

* `size {Number}`

  Size in bytes of the file.

* `formatedSize {Number}`

  Formated file size, eg: `10 KB`.

* `uploadedSize {Number}`

  Size uploaded in bytes.

* `progress {Number}`

  A number between 0 and 1 indicating the current upload progress of the file.

* `progressStyle {String}`

  The file progress element's transform style, eg: `{transform: '-50%'}`.

* `progressingClass {String}`

  The value will be `uploader-file-progressing` if the file is uploading.

* `timeRemaining {Number}`

  Remaining time to finish upload file in seconds.

* `formatedTimeRemaining {String}`

  Formated remaining time, eg: `3 miniutes`.

* `type {String}`

  File type.

* `extension {String}`

  File extension in lowercase.

* `fileCategory {String}`

  File category, one of `folder`, `document`, `video`, `audio`, `image`, `unknown`.

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

[npm-image]: https://img.shields.io/npm/v/vue-simple-uploader.svg?style=flat
[npm-url]: https://npmjs.org/package/vue-simple-uploader
[downloads-image]: https://img.shields.io/npm/dm/vue-simple-uploader.svg?style=flat
[downloads-url]: https://npmjs.org/package/vue-simple-uploader
[juejin-image]: https://img.shields.io/badge/Jue%20Jin-446Likes-blue.svg
[juejin-url]: https://juejin.im/entry/599dad0ff265da248b04d7b8/detail


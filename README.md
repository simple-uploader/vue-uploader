# vue-simple-uploader

> A Vue.js upload component powered by [simple-uploader.js](https://github.com/simple-uploader/Uploader)

![example](https://github.com/simple-uploader/vue-uploader/blob/master/example/simple-uploader.gif)

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
npm install vue-simple-uploader --save
```

## Usage

### init

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

## Components

### Uploader

Root component.

#### Props

* `options {Object}`

  See [simple-uploader.js options](https://github.com/simple-uploader/Uploader#configuration).

* `autoStart {Boolean}`

  Default `true`, Whether the file will be start uploading after it is added.

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

### UploaderFiles

An array of `Uploader.File` file objects added by the user.

### UploaderUnsupport

It will be shown if the current browser do not support HTML5 File API.

### UploaderFile

File item component.

#### Props

* `file {Uploader.File}`

  `Uploader.File` instance.

* `list {Boolean}`

  It should be `true` if it is puted in `UploaderList`

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

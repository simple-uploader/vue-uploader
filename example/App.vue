<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
  ></uploader>
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
        success: '成功了',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      }
      const complete = function () {
        console.log('complete', arguments)
      }
      const fileComplete = function () {
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

<template>
  <div class="uploader-unsupport" v-show="!support">
    <slot>
      <p>
        Your browser, unfortunately, is not supported by Uploader.js. The library requires support for <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along with <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>.
      </p>
    </slot>
  </div>
</template>

<script>
  import { inject } from 'vue'
  const COMPONENT_NAME = 'uploader-unsupport'

  export default {
    name: COMPONENT_NAME,
    setup () {
      const uploader = inject('uploader').proxy.uploader
      const support = uploader.support
      return {
        support
      }
    }
  }
</script>

<style>
  .uploader-unsupport {
    position: relative;
    z-index: 10;
    overflow: hidden;
  }
</style>

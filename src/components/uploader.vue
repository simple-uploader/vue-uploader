<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started"></slot>
  </div>
</template>

<script>
  import Uploader from 'simple-uploader.js'
  import { kebabCase } from '../common/utils'

  const COMPONENT_NAME = 'uploader'

  export default {
    name: COMPONENT_NAME,
    props: {
      options: {
        type: Object,
        default () {
          return {}
        }
      },
      autoStart: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        started: false,
        files: [],
        fileList: []
      }
    },
    methods: {
      uploadStart () {
        this.started = true
      },
      fileAdded (file) {
        if (file.ignored) {
          // is ignored, filter it
          return false
        }
      },
      fileRemoved (file) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
      },
      filesSubmitted (files, fileList) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
        if (this.autoStart) {
          this.uploader.upload()
        }
      },
      allEvent (...args) {
        args[0] = kebabCase(args[0])
        this.$emit.apply(this, args)
      }
    },
    created () {
      const uploader = new Uploader(this.options)
      this.uploader = uploader
      uploader.on('catchAll', this.allEvent)
      uploader.on('uploadStart', this.uploadStart)
      uploader.on('fileAdded', this.fileAdded)
      uploader.on('fileRemoved', this.fileRemoved)
      uploader.on('filesSubmitted', this.filesSubmitted)
    },
    destroyed () {
      const uploader = this.uploader
      uploader.off('catchAll', this.allEvent)
      uploader.off('uploadStart', this.uploadStart)
      uploader.off('fileAdded', this.fileAdded)
      uploader.off('fileRemoved', this.fileRemoved)
      uploader.off('filesSubmitted', this.filesSubmitted)
      this.uploader = null
    }
  }
</script>

<style>
  .uploader {
    position: relative;
  }
</style>

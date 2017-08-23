<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started"></slot>
  </div>
</template>

<script>
  import Uploader from 'simple-uploader.js'

  const COMPONENT_NAME = 'uploader'

  const EVENT_UPLOAD_START = 'upload-start'
  const EVENT_FILE_ADDED = 'file-added'
  const EVENT_FILE_REMOEED = 'file-removed'
  const EVENT_FILES_SUBMITTED = 'files-submitted'

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
        this.$emit(EVENT_UPLOAD_START)
        this.started = true
      },
      fileAdded (file) {
        this.$emit(EVENT_FILE_ADDED, file)
        if (file.ignored) {
          // is ignored, filter it
          return false
        }
      },
      fileRemoved (file) {
        this.$emit(EVENT_FILE_REMOEED, file)
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
      },
      filesSubmitted (files, fileList) {
        this.$emit(EVENT_FILES_SUBMITTED, files, fileList)
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
        if (this.autoStart) {
          this.uploader.upload()
        }
      }
    },
    created () {
      const uploader = new Uploader(this.options)
      this.uploader = uploader
      uploader.on('uploadStart', this.uploadStart)
      uploader.on('fileAdded', this.fileAdded)
      uploader.on('fileRemoved', this.fileRemoved)
      uploader.on('filesSubmitted', this.filesSubmitted)
    },
    destroyed () {
      const uploader = this.uploader
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

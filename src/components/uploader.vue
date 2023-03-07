<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </slot>
  </div>
</template>

<script>
  import { provide, ref, onUnmounted, getCurrentInstance } from 'vue'
  import Uploader from 'simple-uploader.js'
  import { kebabCase } from '../common/utils'
  import UploaderBtn from './btn.vue'
  import UploaderDrop from './drop.vue'
  import UploaderUnsupport from './unsupport.vue'
  import UploaderList from './list.vue'
  import UploaderFiles from './files.vue'
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader'
  const FILE_ADDED_EVENT = 'fileAdded'
  const FILES_ADDED_EVENT = 'filesAdded'
  const UPLOAD_START_EVENT = 'uploadStart'

  const ALL_EVENTS = [
    'change',
    'dragover',
    'dragenter',
    'dragleave',
    'file-success',
    'file-complete',
    'file-progress',
    'file-added',
    'files-added',
    'files-submitted',
    'file-removed',
    'file-retry',
    'file-error',
    'upload-start',
    'complete'
  ]

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
      },
      fileStatusText: {
        type: [Object, Function],
        default () {
          return {
            success: 'success',
            error: 'error',
            uploading: 'uploading',
            paused: 'paused',
            waiting: 'waiting'
          }
        }
      },
      onFileAdded: Function,
      onFilesAdded: Function
    },
    emits: ALL_EVENTS,
    setup (props, { emit }) {
      const started = ref(false)
      const files = ref([])
      const fileList = ref([])
      const instance = getCurrentInstance()
      let uploader = new Uploader(props.options)
      const uploadStart = () => {
        started.value = true
      }
      const fileAdded = (file) => {
        const _file = file
        if (props.onFileAdded) {
          const ignored = props.onFileAdded(_file)
          if (ignored === false || _file.ignored) {
            return false
          }
        } else {
          emit(kebabCase(FILE_ADDED_EVENT), _file)
          if (_file.ignored) {
            // is ignored, filter it
            return false
          }
        }
      }
      const filesAdded = (files, fileList) => {
        if (props.onFilesAdded) {
          const ignored = props.onFilesAdded(files, fileList)
          if (ignored === false || (files.ignored || fileList.ignored)) {
            return false
          }
        } else {
          emit(kebabCase(FILES_ADDED_EVENT), files, fileList)
          if (files.ignored || fileList.ignored) {
            // is ignored, filter it
            return false
          }
        }
      }
      const fileRemoved = () => {
        files.value = [...uploader.files]
        fileList.value = [...uploader.fileList]
      }
      const filesSubmitted = () => {
        files.value = [...uploader.files]
        fileList.value = [...uploader.fileList]
        if (props.autoStart) {
          uploader.upload()
        }
      }
      const allEvent = (...args) => {
        const name = args[0]
        const EVENTSMAP = {
          [FILE_ADDED_EVENT]: true,
          [FILES_ADDED_EVENT]: true,
          [UPLOAD_START_EVENT]: 'uploadStart'
        }
        const handler = EVENTSMAP[name]
        if (handler) {
          if (handler === true) {
            return
          }
          instance.setupState[handler](...args.slice(1))
        }
        args[0] = kebabCase(name)
        emit(...args)
      }

      props.options.initialPaused = !props.autoStart
      uploader.fileStatusText = props.fileStatusText
      uploader.on('catchAll', allEvent)
      uploader.on(FILE_ADDED_EVENT, fileAdded)
      uploader.on(FILES_ADDED_EVENT, filesAdded)
      uploader.on('fileRemoved', fileRemoved)
      uploader.on('filesSubmitted', filesSubmitted)
      // uploader[UPLOAD_START_EVENT] = uploadStart

      onUnmounted(() => {
        uploader.off('catchAll', allEvent)
        uploader.off(FILE_ADDED_EVENT, fileAdded)
        uploader.off(FILES_ADDED_EVENT, filesAdded)
        uploader.off('fileRemoved', fileRemoved)
        uploader.off('filesSubmitted', filesSubmitted)
        uploader = null
      })

      provide('uploader', instance)

      return {
        uploader,
        started,
        files,
        fileList,
        uploadStart,
        fileAdded,
        filesAdded,
        fileRemoved,
        filesSubmitted,
        allEvent
      }
    },
    components: {
      UploaderBtn,
      UploaderDrop,
      UploaderUnsupport,
      UploaderList,
      UploaderFiles,
      UploaderFile
    }
  }
</script>

<style>
  .uploader {
    position: relative;
  }
</style>

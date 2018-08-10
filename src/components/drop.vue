<template>
  <div class="uploader-drop" :class="dropClass" ref="drop" v-show="support">
    <slot></slot>
  </div>
</template>

<script>
  import { uploaderMixin, supportMixin } from '../common/mixins'

  const COMPONENT_NAME = 'uploader-drop'

  export default {
    name: COMPONENT_NAME,
    mixins: [uploaderMixin, supportMixin],
    data () {
      return {
        dropClass: ''
      }
    },
    methods: {
      onDragEnter () {
        this.dropClass = 'uploader-dragover'
      },
      onDragLeave () {
        this.dropClass = ''
      },
      onDrop () {
        this.dropClass = 'uploader-droped'
      }
    },
    mounted () {
      this.$nextTick(() => {
        const dropEle = this.$refs.drop
        const uploader = this.uploader.uploader
        uploader.assignDrop(dropEle)
        uploader.on('dragenter', this.onDragEnter)
        uploader.on('dragleave', this.onDragLeave)
        uploader.on('drop', this.onDrop)
      })
    },
    beforeDestroy () {
      const dropEle = this.$refs.drop
      const uploader = this.uploader.uploader
      uploader.off('dragenter', this.onDragEnter)
      uploader.off('dragleave', this.onDragLeave)
      uploader.off('drop', this.onDrop)
      uploader.unAssignDrop(dropEle)
    }
  }
</script>

<style>
  .uploader-drop {
    position: relative;
    padding: 10px;
    overflow: hidden;
    border: 1px dashed #ccc;
    background-color: #f5f5f5;
  }
  .uploader-dragover {
    border-color: #999;
    background-color: #f7f7f7;
  }
</style>

<template>
  <div class="uploader-drop" :class="dropClass" ref="drop" v-show="support">
    <slot></slot>
  </div>
</template>

<script>
  import { inject, nextTick, ref, onMounted, onBeforeUnmount } from 'vue'

  const COMPONENT_NAME = 'uploader-drop'

  export default {
    name: COMPONENT_NAME,
    setup () {
      const uploader = inject('uploader').proxy.uploader
      let drop = ref(null)
      let dropClass = ref('')
      const support = uploader.support
      const onDragEnter = () => {
        dropClass = 'uploader-dragover'
      }
      const onDragLeave = () => {
        dropClass = ''
      }
      const onDrop = () => {
        dropClass = 'uploader-droped'
      }
      onMounted(() => {
        nextTick(() => {
          const dropEle = drop.value
          uploader.assignDrop(dropEle)
          uploader.on('dragenter', onDragEnter)
          uploader.on('dragleave', onDragLeave)
          uploader.on('drop', onDrop)
        })
      })
      onBeforeUnmount(() => {
        const dropEle = drop.value
        uploader.off('dragenter', onDragEnter)
        uploader.off('dragleave', onDragLeave)
        uploader.off('drop', onDrop)
        uploader.unAssignDrop(dropEle)
      })
      return {
        drop,
        dropClass,
        support,
        onDragEnter,
        onDragLeave,
        onDrop
      }
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

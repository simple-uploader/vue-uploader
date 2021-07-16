<template>
  <div class="uploader-files">
    <slot :files="files">
      <ul>
        <li v-for="file in files" :key="file.id">
          <uploader-file :file="file"></uploader-file>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import UploaderFile from './file.vue'
  import { uploaderMixin } from '../common/mixins'

  const COMPONENT_NAME = 'uploader-files'

  export default {
    name: COMPONENT_NAME,
    mixins: [uploaderMixin],
    components: {
      UploaderFile
    },
    setup () {
      const fileList = ref([])
      return {
        fileList
      }
    }
  }
</script>

<style>
  .uploader-files {
    position: relative;
  }
  .uploader-files > ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
</style>

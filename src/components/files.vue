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
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader-files'

  export default {
    name: COMPONENT_NAME,
    computed: {
      files () {
        return this.$parent.files
      }
    },
    components: {
      UploaderFile
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

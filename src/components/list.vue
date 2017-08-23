<template>
  <div class="uploader-list">
    <slot :file-list="fileList">
      <ul>
        <li v-for="file in fileList" :key="file.id">
          <uploader-file :file="file" :list="true"></uploader-file>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader-list'

  export default {
    name: COMPONENT_NAME,
    computed: {
      fileList () {
        return this.$parent.fileList
      }
    },
    components: {
      UploaderFile
    }
  }
</script>

<style>
  .uploader-list {
    position: relative;
  }
  .uploader-list > ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
</style>

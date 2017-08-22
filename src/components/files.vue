<template>
  <div class="uploader-files">
    <slot>
      <ul>
        <li v-for="file in $parent.files" :key="file.id">
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
    components: {
      UploaderFile
    }
  }
</script>

<style>
  .uploader-files {
    position: relative;
  }
</style>

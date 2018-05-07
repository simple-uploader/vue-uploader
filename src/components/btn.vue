<template>
  <span class="uploader-btn" ref="btn" v-show="support">
    <slot></slot>
  </span>
</template>

<script>
  import { uploaderMixin, supportMixin } from '../common/mixins'

  const COMPONENT_NAME = 'uploader-btn'

  export default {
    name: COMPONENT_NAME,
    mixins: [uploaderMixin, supportMixin],
    props: {
      directory: {
        type: Boolean,
        default: false
      },
      single: {
        type: Boolean,
        default: false
      },
      attrs: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.uploader.assignBrowse(this.$refs.btn, this.directory, this.single, this.attrs)
      })
    }
  }
</script>

<style>
  .uploader-btn {
    display: inline-block;
    position: relative;
    padding: 4px 8px;
    font-size: 100%;
    line-height: 1.4;
    color: #666;
    border: 1px solid #666;
    cursor: pointer;
    border-radius: 2px;
    background: none;
    outline: none;
  }
  .uploader-btn:hover {
    background-color: rgba(0, 0, 0, .08);
  }
</style>

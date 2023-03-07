<template>
  <label class="uploader-btn" ref="btn" v-show="support">
    <slot></slot>
  </label>
</template>

<script>
  import { inject, nextTick, ref, onMounted } from 'vue'

  const COMPONENT_NAME = 'uploader-btn'

  export default {
    name: COMPONENT_NAME,
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
    setup (props) {
      const btn = ref(null)
      const uploader = inject('uploader').proxy.uploader
      const support = uploader.support
      onMounted(() => {
        nextTick(() => {
          uploader.assignBrowse(btn.value, props.directory, props.single, props.attrs)
        })
      })
      return {
        btn,
        support
      }
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

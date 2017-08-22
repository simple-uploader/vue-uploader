import { getUploader } from './utils'

export const uploaderMixin = {
  mounted () {
    this.uploader = getUploader(this)
  }
}

export const supportMixin = {
  data () {
    return {
      support: true
    }
  },
  mounted () {
    this.support = this.uploader.support
  }
}

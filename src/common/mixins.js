export const uploaderMixin = {
  inject: ['uploader']
}

export const supportMixin = {
  data () {
    return {
      support: true
    }
  },
  mounted () {
    this.support = this.uploader.uploader.support
  }
}

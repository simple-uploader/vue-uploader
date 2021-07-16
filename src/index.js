import Uploader from './components/uploader.vue'
import UploaderBtn from './components/btn.vue'
import UploaderDrop from './components/drop.vue'
import UploaderUnsupport from './components/unsupport.vue'
import UploaderList from './components/list.vue'
import UploaderFiles from './components/files.vue'
import UploaderFile from './components/file.vue'

const uploader = {
  version: /* eslint-disable no-undef */ __VERSION__,
  install,
  Uploader,
  UploaderBtn,
  UploaderDrop,
  UploaderUnsupport,
  UploaderList,
  UploaderFiles,
  UploaderFile
}

export default uploader

function install (app, options) {
  app.component(Uploader.name, Uploader)
  app.component(UploaderBtn.name, UploaderBtn)
  app.component(UploaderDrop.name, UploaderDrop)
  app.component(UploaderUnsupport.name, UploaderUnsupport)
  app.component(UploaderList.name, UploaderList)
  app.component(UploaderFiles.name, UploaderFiles)
  app.component(UploaderFile.name, UploaderFile)
}

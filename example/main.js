import { createApp } from 'vue'
import uploader from '../src'
import App from './App.vue'

const app = createApp(App)
app.use(uploader)
app.mount('#app')

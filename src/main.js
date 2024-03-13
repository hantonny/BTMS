import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import App from './App.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App)
app.use(createBootstrap()) // Important

app.use(router)

app.mount('#app')

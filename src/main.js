import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/plugins/router'
import store from './store'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

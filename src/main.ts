import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueAxios from 'vue-axios'
import axios from 'axios'


import App from './App.vue'
import router from './router'

import VCalendar from 'v-calendar'
import VueGoodTablePlugin from 'vue-good-table-next'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'v-calendar/style.css'
import './assets/main.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(createPinia())
app.use(router).use(VCalendar).use(VueGoodTablePlugin)

app.mount('#app')

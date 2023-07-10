import './assets/styles/main.scss'

import { createApp } from 'vue'
import router from "@/router/index"
import { createPinia } from "pinia";

import App from './App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')

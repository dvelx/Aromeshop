import { createApp } from 'vue'
import './assets/style/main.scss'
import App from './App.vue'
import router from './router/index.ts'
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount('#app')

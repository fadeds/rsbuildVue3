import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.mount('#root');

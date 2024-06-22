import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue';
import router from './router'; 
import './components/style.css';
import './assets/main.css';

const myApp = createApp(App)
const app = createApp(App);
const pinia = createPinia();
app.use(Quasar, {
});
app.use(pinia);
app.use(router);
app.mount('#app');


myApp.use(Quasar, {
  plugins: {}, 
})




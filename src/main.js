import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import routes from "./router/index";
import "./index.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(routes);
app.mount("#app");

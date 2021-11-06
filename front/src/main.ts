import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store, key } from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(store, key).use(router).use(VueAxios, axios).mount("#app");

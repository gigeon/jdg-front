import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from "vuex";
import session from "./js/store/store-session";

import router from "@/js/router";
import fetchApi from "@/js/fetchApi";

import '@/css/style.css'
import '@/css/base.css'

const store = createStore({
  modules: {
    session,
  },
});

// store를 다른 파일에서 사용할 수 있도록 export
export { store };

const app = createApp(App)

app.use(router)
app.use(store);
app.config.globalProperties.$fetchApi = fetchApi;

app.mount('#app')
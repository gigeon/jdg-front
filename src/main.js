import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import { createStore } from "vuex";
import session from "./js/store/store-session";

import router from "@/js/router";
import fetchApi from "@/js/fetchApi";

import '@/css/style.css'
import '@/css/base.css'

const COMPONENTS = [
    "inputForm", 
];

function loadBrComponents(app) {
    try {
        for(let component of COMPONENTS) {
            app.component(component, defineAsyncComponent(() =>
                import(`@/components/${component}.vue`)));
        }
    } catch (error) {
        console.log("loadEpComponents: Error=" + error);
    }
}

const store = createStore({
  modules: {
    session,
  },
});

export { store };

const app = createApp(App)

app.use(router)
app.use(store);
app.config.globalProperties.$fetchApi = fetchApi;

loadBrComponents(app);

app.mount('#app')
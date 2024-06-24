import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import router from "./router";
import App from "@/App/App.vue";
import { createHead, useHead } from "@vueuse/head";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button"

const app = createApp(App);
export const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createHead());

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount("#app");
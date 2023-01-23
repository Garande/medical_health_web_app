import "./bootstrap";
import { createApp as createClientApp } from "vue";
import { createPinia } from "pinia";
import { createRouter } from "./router";

import App from "./App.vue";
import VueMultiselect from "@vueform/multiselect";

const createApp = async () => {
    const app = createClientApp(App);
    const router = createRouter();
    const pinia = createPinia();

    app.use(pinia);
    app.component(VueMultiselect.name, VueMultiselect);

    const dashboard = {
        app,
        router,
    };

    app.use(dashboard.router);

    return dashboard;
};

createApp().then(async (dashboard) => {
    await dashboard.router.isReady;

    dashboard.app.mount("#app");
});

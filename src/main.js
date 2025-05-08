import "./assets/main.css";

import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";
import App from "./App.vue";
import router from "./router";
import store from "./router/store";

const app = createApp(App);
app.use(router);
app.use(plugin, defaultConfig(config));
app.use(store);

app.mount("#app");

import "./assets/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import ApiService from "./service/api.service";

/**
 * Import Components and Make them Global
 */
import PageWrapper from "@/components/custom/PageWrapper/index.vue";
import Table from "@/components/custom/FORM/Table.vue";
import Button from "@/components/custom/FORM/Button.vue";
import Select from "@/components/custom/FORM/Select.vue";

export const buildApp = () => {
  const baseUrl: string = import.meta.env.VITE_BASE_API_URL;
  ApiService.setBaseUrl(baseUrl);
  ApiService.mount401Interceptor();

  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.use(router);
  /**
   * Components
   */
  app.component("page-wrapper", PageWrapper);
  app.component("y-table", Table);
  app.component("y-button", Button);
  app.component("y-select", Select);

  return { pinia, app, router };
};
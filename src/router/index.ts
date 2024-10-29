import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Products from "@/views/Products/index.vue";
import Login from "@/components/custom/login/login.vue";
import Overview from "@/views/Overview.vue";
import Settings from "@/views/settings.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/components/custom/layout/index.vue"),
    children: [
      {
        path: "/home",
        redirect: "/home",
      },
      {
        path: "/products",
        component: Products,
      },
      {
        path: "/products/edit/:id",
        name: "ProductEdit",
        component: () => import("@/views/Products/Edit/id.vue"),
      },
      {
        path: "/overview",
        name: "Overview",
        component: Overview,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 100,
      };
    }
    return { top: 0 };
  },
});

export default router;

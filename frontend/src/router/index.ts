import { createRouter, createWebHashHistory } from "vue-router";
import { ROUTES_PATHS } from "../constans/router.ts";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: ROUTES_PATHS.MAIN,
      name: ROUTES_PATHS.MAIN,
      component: () => import("@/pages/MainPage.vue"),
    },
    {
      path: ROUTES_PATHS.PRODUCTPAGE,
      name: ROUTES_PATHS.PRODUCTPAGE,
      component: () => import("@/pages/ProductPage.vue"),
    },
    {
      path: ROUTES_PATHS.PRODUCTLIST,
      name: ROUTES_PATHS.PRODUCTLIST,
      component: () => import("@/pages/ProductList.vue"),
    },
    {
      path: ROUTES_PATHS.ABOUTUS,
      name: ROUTES_PATHS.ABOUTUS,
      component: () => import("@/pages/AboutPage.vue"),
    },
    {
      path: ROUTES_PATHS.BLOG,
      name: ROUTES_PATHS.BLOG,
      component: () => import("@/pages/BlogPage.vue"),
    },
    {
      path: ROUTES_PATHS.REVIEWS,
      name: ROUTES_PATHS.REVIEWS,
      component: () => import("@/pages/ReviewsPage.vue"),
    },
    {
      path: ROUTES_PATHS.CART,
      name: ROUTES_PATHS.CART,
      component: () => import("@/pages/CartPage.vue"),
    },
    {
      path: ROUTES_PATHS.CONTACTS,
      name: ROUTES_PATHS.CONTACTS,
      component: () => import("@/pages/ContactsPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import { ROUTES_PATHS } from "../constans/router.ts";
import MainPage from "../pages/MainPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import ProductList from "../pages/ProductList.vue";
import AboutPage from "../pages/AboutPage.vue";
import BlogPage from "../pages/BlogPage.vue";
import ReviewsPage from "../pages/ReviewsPage.vue";
import CartPage from "../pages/CartPage.vue";
import ContactsPage from "../pages/ContactsPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: ROUTES_PATHS.MAIN,
      name: ROUTES_PATHS.MAIN,
      component: MainPage,
    },
    {
      path: ROUTES_PATHS.PRODUCTPAGE,
      name: ROUTES_PATHS.PRODUCTPAGE,
      component: ProductPage,
    },
    {
      path: ROUTES_PATHS.PRODUCTLIST,
      name: ROUTES_PATHS.PRODUCTLIST,
      component: ProductList,
    },
    {
      path: ROUTES_PATHS.ABOUTUS,
      name: ROUTES_PATHS.ABOUTUS,
      component: AboutPage,
    },
    {
      path: ROUTES_PATHS.BLOG,
      name: ROUTES_PATHS.BLOG,
      component: BlogPage,
    },
    {
      path: ROUTES_PATHS.REVIEWS,
      name: ROUTES_PATHS.REVIEWS,
      component: ReviewsPage,
    },
    {
      path: ROUTES_PATHS.CART,
      name: ROUTES_PATHS.CART,
      component: CartPage,
    },
    {
      path: ROUTES_PATHS.CONTACTS,
      name: ROUTES_PATHS.CONTACTS,
      component: ContactsPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundPage,
    },
  ],
});

export default router;

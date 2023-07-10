import { createRouter, createWebHashHistory } from 'vue-router'
import {ROUTES_PATHS} from "@/constants/router";
import MainPage from "@/pages/MainPage.vue";
import AromaHomePage from "@/pages/AromaHomePage.vue";
import AromaAutoPage from "@/pages/AromaAutoPage.vue";
import CosmetologyPage from "@/pages/CosmetologyPage.vue";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.MAIN,
      name: ROUTES_PATHS.MAIN,
      component: MainPage
    },
    {
      name: ROUTES_PATHS.AROMAHOME,
      path: ROUTES_PATHS.AROMAHOME,
      component: AromaHomePage
    },
    {
      path: ROUTES_PATHS.AROMAAUTO,
      name: ROUTES_PATHS.AROMAAUTO,
      component: AromaAutoPage
    },
    {
      path: ROUTES_PATHS.COSMETOLOGY,
      name: ROUTES_PATHS.COSMETOLOGY,
      component: CosmetologyPage
    }
    ,
    {
      path: ROUTES_PATHS.PRIVATE_POLICY,
      name: ROUTES_PATHS.PRIVATE_POLICY,
      component: PrivacyPolicyPage
    }
  ]
})

export default router

<template>
  <Header />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page-opacity" mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component"/>
        </div>
      </Transition>
    </RouterView>
  </main>

  <Footer />
</template>

<script setup lang="ts">
import {RouterView, useRoute} from "vue-router";
import Header from "./components/HeaderComponent.vue";
import Footer from "./components/FooterComponent.vue";
import { cartStore } from "@/store/cartStore.ts";

const route = useRoute()
const store = cartStore();
const userAccessKey = localStorage.getItem("userAccessKeyAroma");

if (userAccessKey) {
  store.updateUserAccessKey(userAccessKey);
}

store.loadBasket(userAccessKey);
</script>
<style lang="scss">
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: all .6s ease-out;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}

</style>

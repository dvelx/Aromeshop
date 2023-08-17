<template>
  <Header />
  <main>
    <router-view />
  </main>

  <Footer />
</template>

<script setup lang="ts">
import Header from "./components/HeaderComponent.vue";
import Footer from "./components/FooterComponent.vue";
import {cartStore} from "@/store/cartStore.ts";

const store = cartStore()
const userAccessKey = localStorage.getItem('userAccessKeyAroma')

if(userAccessKey) {
  store.updateUserAccessKey(userAccessKey)
}

store.loadBasket()

</script>
<style lang="scss" scoped></style>

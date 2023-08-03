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
import { getUserKey } from "@/store/getUserKey.ts";
import {onBeforeMount} from "vue";





onBeforeMount(() => {
  const store = getUserKey()
  store.getKey()
  const key = store.state.userAccessKey
  console.log(key)
  console.log('перед монтированием')
})

</script>
<style lang="scss" scoped></style>

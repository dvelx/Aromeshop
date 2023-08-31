<template>
  <div>
    инфо заказа

    {{ orderInfo }}

    продукты

    {{ orderProduct }}
  </div>
</template>

<script setup lang="ts">
import { cartStore } from "@/store/cartStore.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";

const store = cartStore();
const route = useRoute();

const orderInfo = computed(() => {
  return store.state.orderInfo;
});

const orderProduct = computed(() => {
  return store.state.orderInfo.items;
});

const loadOrder = () => {
  if (store.state.orderInfo && store.state.orderInfo.id === route.params.id) {
    return;
  }
  store.loadOrderInfo(+route.params.id);
};
loadOrder()
</script>

<style lang="scss" scoped></style>

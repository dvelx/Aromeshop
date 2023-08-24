<template>
  <li v-for="item in items" :key="item.id" class="form__cart-order">
    <h3>{{ item.title }}</h3>
    <b>{{ numberFormatter(item.price) }} ₽</b>
    <span>Артикул: {{ item.id }}</span>
  </li>
</template>

<script setup lang="ts">
import { cartStore } from "@/store/cartStore.ts";
import { computed } from "vue";
import numberFormatter from "../helpers/numberFormatter.ts";

const store = cartStore();

const items = computed(() => {
  return store.state.cartProduct;
});
</script>

<style scoped>
.form__cart-order {
  display: grid;
  grid-template-columns: 1fr 90px;
  grid-gap: 5px 20px;
  
  & h3 {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  }
  
  & b {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
  }
  
  & span {
    font-size: 12px;
    line-height: 1;
    color: #9d9d9d;
  }
  
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>

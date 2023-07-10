<template>
    <div class="container">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
</template>

<script setup lang="ts">

import ProductCard from "@/components/ProductCard.vue";
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
</style>

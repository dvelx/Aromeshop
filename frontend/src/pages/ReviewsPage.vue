<template>
  <div class="container">
    <h2 class="reviews__title">Отзывы</h2>
    <ReviewItem v-for="item in reviews" :item="item" :key="item.id"/>
  </div>
</template>

<script setup lang="ts">
import ReviewItem from "@/components/ReviewItem.vue";
import reviews from "@/fakeApi/reviews.ts";
</script>

<style lang="scss" scoped>
.reviews__title {
  margin-bottom: 50px;
}
</style>

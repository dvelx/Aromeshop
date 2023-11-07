<template>
  <div class="review">
    <div class="container">
      <div class="review__author-block">
        <span class="review__author">{{ item.author }}</span>
        <span class="review__date">{{ item.date }}</span>
      </div>
      <p class="review__text">{{ item.reviewText }}</p>
      <div class="review__rating">
        <svg width="160" height="32" viewBox="0 0 160 32">
          <defs>
            <mask :id="item.author">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect :x="percentReview + '%'" y="0" width="100%" height="100%" fill="rgba(201, 164, 137, 1)" />
            </mask>

            <symbol viewBox="0 0 32 32" id="star">
              <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
            </symbol>
            <symbol viewBox="0 0 160 32" id="stars">
              <use xlink:href="#star" x="-64" y="0"></use>
              <use xlink:href="#star" x="-32" y="0"></use>
              <use xlink:href="#star" x="0" y="0"></use>
              <use xlink:href="#star" x="32" y="0"></use>
              <use xlink:href="#star" x="64" y="0"></use>
            </symbol>
          </defs>

          <use xlink:href="#stars" fill="rgba(201, 164, 137, 1)" stroke="black" :mask="`url(#${item.author})`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

interface IItem {
  id: number,
  author: string,
  date: string,
  reviewText: string,
  stars: number
}

const props = defineProps<{
  item: IItem
}>()

const percentReview = computed(() => {
  return props.item.stars / 0.05
})

</script>

<style scoped lang="scss">
.review {
  margin-bottom: 30px;
  
  &__author-block {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
  &__author {
    display: block;
    margin-right: 40px;
  }
  &__date {
    display: block;
  }
  &__text {
    margin-bottom: 10px;
  }
}
</style>

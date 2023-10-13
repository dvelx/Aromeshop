<template>
  <Carousel
    id="gallery"
    v-model="currentSlide"
    :items-to-show="1"
    :wrap-around="false"
  >
    <Slide v-for="slide in 4" :key="slide">
      <div class="carousel__item">
        <img
          class="product-page__image main__image"
          :src="product.image_url"
          :alt="product.title"
        />
      </div>
    </Slide>
  </Carousel>

  <Carousel
    id="thumbnails"
    ref="carousel"
    v-model="currentSlide"
    :items-to-show="5"
    :wrap-around="true"
  >
    <Slide v-for="slide in 4" :key="slide">
      <div class="carousel__item" @click="slideTo(slide - 1)">
        <img
          class="product-page__image"
          :src="product.image_url"
          :alt="product.title"
        />
      </div>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import { ref } from "vue";
import Product from "@/types/Product.ts";

defineProps<{
  product: Product;
}>();

const currentSlide = ref(0);

const slideTo = (val: number) => {
  currentSlide.value = val;
};
</script>

<style lang="scss">
.product-page__image.main__image {
  width: 400px;
  height: 400px;
  border-radius: 10px;
}
.product-page__image {
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  min-height: 180px;
}
.carousel__viewport {
  border-radius: 10px;
  overflow: hidden;
}
.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  touch-action: pan-y;
  overscroll-behavior: none;
}
.carousel * {
  box-sizing: border-box;
}
.carousel__track {
  display: flex;
  padding: 0 !important;
  position: relative;
}

.carousel__slide {
  scroll-snap-stop: normal;
  flex-shrink: 0;
  margin-right: 5px;
  margin-left: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#thumbnails .carousel__item {
  min-height: 100px;
  cursor: pointer;
}
.carousel__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .product-page__image {
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    min-height: 80px;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

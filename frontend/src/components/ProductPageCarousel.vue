<template>
  <Swiper 
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="[FreeMode, Navigation, Thumbs]"
    class="product-swiper"
  >
    <SwiperSlide v-for="item in 5" :key="item" class="product-slide">
      <img :src="product.image_url" :alt="product.title">
    </SwiperSlide>
  </Swiper>
  <Swiper 
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="[FreeMode, Navigation, Thumbs]"
    class="product-swiper"  
  >

    <SwiperSlide v-for="item in 5" :key="item" class="product-slide">
      <img :src="product.image_url" :alt="product.title">
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from "swiper/types";
import Product from "@/types/Product.ts";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

defineProps<{
  product: Product;
}>();

const thumbsSwiper: Ref<SwiperClass | undefined> = ref();

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper;
};
</script>

<style lang="scss">
@import "src/assets/style/variables";
.product-swiper.swiper {
  width: 100%;
  height: 100%;
}

.product-slide.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-slide.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}


.product-swiper.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.product-slide.swiper-slide {
  background-size: cover;
  background-position: center;
}



.product-slide {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.product-slide.swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.product-slide.swiper-slide-thumb-active {
  opacity: 1;
}
.swiper-button-prev, .swiper-button-next {
 color: $primary; 
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

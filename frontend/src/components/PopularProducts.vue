<template>
  <section class="popular-products">
    <div class="popular-container container">
      <h1 class="title">Популярные ароматизаторы</h1>
      <h3 class="title-cta">Купите наши популярные ароматы</h3>
      <swiper
        :modules="[Pagination, Autoplay]"
        :breakpoints="swiperOptions.breakpoints"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000 }"
      >
        <swiper-slide v-for="item in products" :key="item.id">
          <router-link :to="'/product/' + item.slug">
            <div class="card">
              <img :src="item.image_url" alt="" class="card__image" />
              <div class="card__desc">
                <h5 class="card__title">
                  {{ item.title }}
                </h5>
                <span class="card__price"
                >{{ numberFormatter(item.price) }} ₽</span
                >
              </div>
              <p class="card__text">
                {{ item.brand_title }}
              </p>
            </div>
          </router-link>
        </swiper-slide>
        ...
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { computed, ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Products from "@/types/Products.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";
import Product from "@/types/Product.ts";

const productsData = ref({} as Products);
const products = computed<Product[]>(() => {
  return productsData.value.products;
});
const swiperOptions = {
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
      slidesPerGroup: 4
    },
    1366: {
      slidesPerView: 5,
      spaceBetween: 50,
      slidesPerGroup: 5
    },
  },
};
const loadProducts = () => {
  apiDataService
    .getAll(48, 0)
    .then((res: ResponseData) => (productsData.value = res.data));
};
loadProducts();
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.popular-container {
  margin-bottom: 30px;
}
.swiper-wrapper {
  width: 1200px;
}
.title {
  font-family:
    Zilla Slab,
    serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 28.8px */
  letter-spacing: 4.32px;
  text-align: center;
}
.title-cta {
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 44.8px */
  letter-spacing: 0.96px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 350px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(242, 242, 242, 0.5);
  border-radius: 20px;
  padding: 30px;
  background-color: white;
  box-shadow: $card_shadow;

  &__image {
    margin-bottom: 24px;
    height: 220px;
    max-height: 220px;
    object-fit: contain;
  }

  &__desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    position: absolute;
    top: 20px;
    right: 0;
    background-color: yellow;
    border-radius: 5px;
    padding: 7px 15px;
    color: $dark-text;
    font-weight: 700;
  }

  &__title {
    font-size: 16px;
    height: 18px;
    font-weight: 600;
    color: $dark-text;
    overflow: hidden;
  }
  &__text {
    color: $dark-text;
  }

  &__btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 12px;
    align-items: center;
    border: 1px solid $primary;
    border-radius: 100px;
    gap: 8px;
    transition: all 0.4s ease-in-out;
  }
  &__btn:hover {
    background-color: $primary;
    color: $white;
  }
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
    height: min-content;
    padding: 15px;
    background-color: white;
    box-shadow: $card_shadow;

    &__image {
      margin-bottom: 24px;
      height: 120px;
      object-fit: contain;
    }

    &__desc {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &__price {
      font-size: 16px;
      color: $dark-text;
    }

    &__title {
      height: 18px;
      margin-bottom: 5px;
    }

    &__text {
      color: $dark-text;
      font-size: 13px;
    }

    &__btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 5px 7px;
      border-radius: 100px;
    }
  }
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

<template>
  <div class="popular-container container">
    <h1 class="title">Популярные ароматизаторы</h1>
    <h3 class="title-cta">Купи наши популярные свечи</h3>
    <swiper
      :modules="[Pagination, Autoplay]"
      :breakpoints="swiperOptions.breakpoints"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <router-link :to="'/product/' + item.slug">
          <div class="card">
            <img :src="item.image_url" alt="" class="card__image" />
            <div class="card__desc">
              <h5 class="card__title">
                {{ item.title }}
              </h5>
              <p class="card__price">{{ numberFormatter(item.price) }} ₽</p>
            </div>
            <p class="card__text">
              {{ item.brand_title }}
            </p>
            <button class="card__btn btn" @click="addCart(item.id, 1)">
              В КОРЗИНУ

              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  fill="#0C0D12"
                />
                <path
                  d="M9 12H15"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 9V15"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </router-link>
      </swiper-slide>
      ...
    </swiper>
  </div>
</template>

<script setup lang="ts">
// :autoplay="{ delay: 1000 }"
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { computed, ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Products from "@/types/Products.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";
import { cartStore } from "@/store/cartStore.ts";
import Product from "@/types/Product.ts";

const store = cartStore();

const productsData = ref({} as Products);
const products = computed<Product[]>(() => {
  return productsData.value.products;
});
const swiperOptions = {
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1366: {

      slidesPerView: 5,
      spaceBetween: 50,
    }
  }
}
const loadProducts = () => {
  apiDataService
    .getAll(8, 0)
    .then((res: ResponseData) => (productsData.value = res.data));
};

const addCart = (id: number, quantity: number) => {
  store.addProductToCart(id, quantity);
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
  height: 430px;
  max-height: 430px;
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
    max-height: 35px;
  }
  &__price {
    color: $dark-text;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 160%; /* 32px */
    letter-spacing: 0.6px;
    color: $dark-text;
  }
  &__text {
    margin-bottom: 24px;
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

@media (max-width: 1199px) {
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 270px;
    max-height: 270px;
    border: 1px solid rgba(242, 242, 242, 0.5);
    border-radius: 20px;
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
      font-size: 12px;
      color: $dark-text;
    }

    &__title {
      font-size: 12px;
      font-weight: 600;
      line-height: 160%; /* 32px */
      letter-spacing: 0.6px;
      color: $dark-text;
    }

    &__text {
      margin-bottom: 14px;
      color: $dark-text;
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
@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

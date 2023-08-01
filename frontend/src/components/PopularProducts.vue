<template>
  <div class="popular-container container">
    <h1 class="title">Популярные ароматизаторы</h1>
    <h3 class="title-cta">Купи наши популярные свечи</h3>
    <swiper
      :modules="[Pagination, Autoplay]"
      :autoplay="{ delay: 6000 }"
      :slides-per-view="4"
      :space-between="50"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <router-link :to="{ path: '/product', query: { id: item.id } }">
          <div class="card">
            <img :src="item.image_url" alt="" class="card__image" />
            <div class="card__desc">
              <h5 class="card__title">
                {{ item.title }}
              </h5>
              <p class="card__price">{{ item.price }} p</p>
            </div>
            <p class="card__text">
              {{ item.brand_title }}
            </p>
            <button class="card__btn btn">
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
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../constans/api.ts";

interface IProducts {
  brand_id?: number;
  brand_title?: string;
  category_id?: number;
  category_name?: string;
  description?: string;
  id?: number;
  image_url?: string;
  price?: number;
  title?: string;
}

const products = ref({});

const loadProducts = () => {
  axios.get(API_URL + "/products").then((res) => {
    const data = res.data;
    products.value = Object.assign(data, (item: IProducts) => {
      return {
        brand_id: item?.brand_id,
        brand_title: item?.brand_title,
        category_id: item?.category_id,
        category_name: item?.category_name,
        description: item?.description,
        id: item?.id,
        image: item?.image_url,
        price: item?.price,
        title: item?.title,
      };
    });
  });
};

loadProducts();
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.popular-container {
  margin-bottom: 30px;
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

.popular_products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(242, 242, 242, 0.5);
  border-radius: 10px;
  padding: 30px;
  background-color: white;
  box-shadow:
    5px 5px 10px rgba(242, 242, 242, 0.5),
    -5px -5px 10px rgba(242, 242, 242, 0.5),
    5px -5px 10px rgba(242, 242, 242, 0.5),
    -5px 5px 10px rgba(242, 242, 242, 0.5);

  &__image {
    margin-bottom: 24px;
    height: 300px;
  }

  &__desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 160%; /* 32px */
    letter-spacing: 0.6px;
    color: $dark-text;
    padding-left: 20px;
  }
  &__text {
    margin-bottom: 24px;
    color: $dark-text;
    padding-left: 20px;
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
  }
}
</style>

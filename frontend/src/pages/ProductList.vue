<template>
  <div class="container product-list__container">
    <FilteredProducts />

    <div class="product-list__list">
      <div class="card" v-for="item of products" :key="item.id">
        <router-link :to="{ path: '/product', query: { id: item.id } }">
          <img :src="item.image_url" alt="" class="card__image" />
        </router-link>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import FilteredProducts from "../components/FilteredProducts.vue";

import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../constans/api.ts";

const products = ref(null);

const loadProducts = () => {
  axios.get(API_URL + "/products").then((res) => (products.value = res.data));
};

loadProducts();
</script>

<style lang="scss" scoped>
@import "../assets/style/main";
.product-list {
  &__container {
    display: flex;
    flex-direction: row;
    width: 100vw;
    gap: 50px;
  }

  &__list {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(4, 1fr);
    grid-auto-flow: column;
    gap: 30px;
    width: 100%;
  }
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(242, 242, 242, 0.5);
  border-radius: 10px;
  padding: 30px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(242, 242, 242, 0.5),
    -5px -5px 10px rgba(242, 242, 242, 0.5),
    5px -5px 10px rgba(242, 242, 242, 0.5),
    -5px 5px 10px rgba(242, 242, 242, 0.5);

  &__image {
    margin-bottom: 24px;
  }

  &__desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 160%; /* 32px */
    letter-spacing: 0.6px;
  }
  &__text {
    margin-bottom: 24px;
    padding-left: 20px;
  }

  &__btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px 12px;
    margin-top: auto;
    align-items: center;
    border: 1px solid $primary;
    border-radius: 100px;
    gap: 8px;
  }
}
</style>

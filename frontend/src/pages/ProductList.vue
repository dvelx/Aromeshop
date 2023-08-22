<template>
  <div class="container product-list__container">
    <FilteredProducts />

    <div class="product-list__content">
      <div class="product-list__list">
          <div v-for="item in products" :key="item.id" class="card">
              <router-link :to="'/product/' + item.slug">
                  <img :src="item.image_url" alt="" class="card__image" />
              </router-link>
              <div class="card__desc">
                  <h5 class="card__title" @click="console.log(productsData)">
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
      </div>
      <BasePagination :per-page="limit" :count="Number(countProducts.count)" :page="page" />
        
    </div>
    
  </div>
</template>

<script setup lang="ts">
import FilteredProducts from "../components/FilteredProducts.vue";
import {computed, ref, watch} from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Products from "@/types/Products.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";
import { cartStore } from "@/store/cartStore.ts";
import Product from "@/types/Product.ts";
import BasePagination from "@/components/BasePagination.vue";

const store = cartStore();

const productsData = ref({} as Products);
const page = ref(1 as number);
const limit = ref(8)

const products = computed<Product[]>(() => {
  return productsData.value.products;
});
const countProducts = computed(() => {
    return  productsData.value.pagination || 0
})

const loadProducts = () => {
  apiDataService
    .getAll(limit.value, page.value)
    .then((res: ResponseData) => (productsData.value = res.data))
};

const addCart = (id: number, quantity: number) => {
  store.addProductToCart(id, quantity);
};

watch([page], () => {
    loadProducts()
})
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
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__list {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(4, 1fr);
    gap: 30px;
    width: 100%;
  }
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  padding-top: 10px;
  border: 2px solid $white;
  border-radius: 20px;
  background-color: $white;

  &__image {
    max-height: 200px;
    object-fit: contain;
    margin-bottom: 24px;
    border-radius: 20px;
    background-color: $white;
  }

  &__desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
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
    width: 80%;
    justify-content: center;
    padding: 10px 12px;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    border: 1px solid $primary;
    border-radius: 100px;
    gap: 8px;
    transition: all 0.4s ease-in-out;
  }
  &__btn:hover {
    background-color: $primary;
  }
}
@media (max-width: 1199px) {
  .product-list {
    &__container {
      gap: 25px;
    }

    &__list {
      display: grid;
      grid-template: repeat(2, 1fr) / repeat(2, 1fr);
      gap: 30px;
      width: 100%;
    }
  }
}
</style>

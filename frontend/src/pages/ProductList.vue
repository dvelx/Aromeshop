<template>
  <section class="product-list">
    <div class="top container">
      <h1 class="top__title">Каталог товаров</h1>
    </div>
    <div class="container product-list__container">
      <FilteredProducts
        v-model:priceFrom="priceFrom"
        v-model:priceTo="priceTo"
        v-model:sort-by="sortBy"
        v-model:order="order"
      />

      <div class="product-list__content">
        <div v-if="loader" class="product-list__list">
          <div v-for="item in limit" :key="item" class="card skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-desc">
              <div class="skeleton-title"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-price"></div>
            </div>
            <div class="skeleton-btn"></div>
          </div>
        </div>
        <div v-else class="product-list__list">
          <div v-for="item in products" :key="item.id" class="card">
            <router-link :to="'/product/' + item.slug">
              <img :src="item.image" alt="" class="card__image" />
            </router-link>
            <div class="card__desc">
              <h5 class="card__title">
                {{ item.title }}
              </h5>
              <p class="card__text">
                {{ item.Brand.title }}
              </p>
              <p class="card__price">
                Цена: {{ numberFormatter(item.price) }} ₽
              </p>
            </div>
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
        <button v-show="showMoreBtn" class="show-more-btn">
          показать еще
        </button>
<!--         @click="showMore"-->
        <!--      <BasePagination-->
        <!--        v-model:page="page"-->
        <!--        :per-page="limit"-->
        <!--        :count="Number(countProducts.count)"-->
        <!--      />-->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FilteredProducts from "../components/FilteredProducts.vue";
import { computed, ref, watch } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";
import { cartStore } from "@/store/cartStore.ts";
import Product from "@/types/Product.ts";
// import BasePagination from "@/components/BasePagination.vue";

const store = cartStore();

const loader = ref(true);
const showMoreBtn = ref(true);
const productsData = ref({} as Product[]);
const page = ref(1);
const limit = ref(8);
const sortBy = ref("");
const order = ref("");
const priceFrom = ref(0);
const priceTo = ref(100000);

const products = computed(() => {
  return productsData.value;
});
// const showMore = () => {
//   if (
//     productsData.value.pagination.limit < productsData.value.pagination.count
//   ) {
//     limit.value = limit.value + 8;
//   } else {
//     showMoreBtn.value = false;
//   }
// };

const loadProducts = () => {
  apiDataService
    .getAll(
      limit.value,
      page.value,
      sortBy.value,
      order.value,
      priceFrom.value,
      priceTo.value,
    )
    .then((res: ResponseData) => (productsData.value = res.data))
    .then(() => (loader.value = false));
};

const addCart = (id: number, quantity: number) => {
  store.addProductToCart(id, quantity);
};

watch([page, limit, priceFrom, priceTo, sortBy, order], () => {
  loadProducts();
});
loadProducts();
</script>

<style lang="scss" scoped>
@import "../assets/style/main";
.top {
  &__title {
    text-align: center;
    margin-bottom: 50px;
    letter-spacing: 16px;
    font-size: 36px;
  }
}
.show-more-btn {
  width: 30%;
  background-color: transparent;
  border: 1px solid $primary;
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 16px;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
}
.product-list {
  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    gap: 20px;
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
  box-shadow: $card_shadow;

  &__image {
    max-height: 200px;
    object-fit: contain;
    margin-bottom: 24px;
    border-radius: 20px;
    background-color: $white;
  }

  &__desc {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 20px;
    padding-right: 20px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 160%; /* 32px */
    letter-spacing: 0.6px;
  }
  &__text {
    margin-bottom: 24px;
  }
  &__price {
    color: $dark-text;
    font-weight: 700;
    margin-top: auto;
    margin-bottom: 24px;
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
$avatar-offset: 52 + 16;
@keyframes skeleton-glow {
  0% {
    background-position: -100px + $avatar-offset;
  }
  40%,
  100% {
    background-position: 160px + $avatar-offset;
  }
}
.card.skeleton {
  padding-left: 20px;
  padding-right: 20px;
}
.skeleton {
  &-image {
    animation: skeleton-glow 1.6s infinite linear;
    background-image: $skeleton-gradient;
    height: 200px;
    margin-bottom: 24px;
    border-radius: 20px;
  }
  &-desc {
    display: flex;
    flex-direction: column;
  }
  &-title {
    height: 16px;
    animation: skeleton-glow 1.6s linear infinite;
    background-image: $skeleton-gradient;
    margin-bottom: 24px;
    border-radius: 10px;
  }
  &-text {
    height: 16px;
    margin-bottom: 24px;
    animation: skeleton-glow 1.6s linear infinite;
    background-image: $skeleton-gradient;
    border-radius: 10px;
  }
  &-price {
    height: 16px;
    margin-bottom: 24px;
    animation: skeleton-glow 1.6s linear infinite;
    background-image: $skeleton-gradient;
    border-radius: 10px;
  }
  &-btn {
    height: 16px;
    margin-bottom: 24px;
    animation: skeleton-glow 1.6s linear infinite;
    background-image: $skeleton-gradient;
    border-radius: 10px;
  }
}

@media (max-width: 1780px) {
  .product-list {
    &__list {
      grid-template: repeat(2, 1fr) / repeat(3, 1fr);
    }
  }
}
@media (max-width: 1366px) {
  .product-list {
    &__list {
      grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    }
  }
}

@media (max-width: 1024px) {
  .product-list {
    &__container {
      flex-direction: column;
    }
    &__content {
      width: 100%;
    }

    &__list {
      display: grid;
      grid-template: repeat(2, 1fr) / repeat(3, 1fr);
      justify-content: space-between;
    }
  }
  .card {
    padding-bottom: 30px;
    padding-top: 10px;
    width: 250px;

    &__image {
      height: 150px;
      margin-bottom: 24px;
    }

    &__desc {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      line-height: 160%; /* 32px */
      letter-spacing: 0.6px;
    }

    &__text {
      margin-bottom: 24px;
      padding-left: 15px;
    }

    &__btn {
      justify-content: center;
      padding: 5px 7px;
    }
  }
}

@media (max-width: 768px) {
  .product-list {
    &__container {
      flex-direction: column;
    }

    &__list {
      display: grid;
      grid-template: repeat(2, 1fr) / repeat(2, 1fr);
      gap: 20px;
    }
  }
  .card {
    padding-bottom: 30px;
    padding-top: 10px;
    width: 250px;

    &__image {
      height: 150px;
      margin-bottom: 24px;
    }

    &__desc {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      line-height: 160%; /* 32px */
      letter-spacing: 0.6px;
    }

    &__text {
      margin-bottom: 24px;
      padding-left: 15px;
    }

    &__btn {
      justify-content: center;
      padding: 5px 7px;
    }
  }
}

@media (max-width: 576px) {
  .show-more-btn {
    width: 90%;
  }
  .product-list {
    &__container {
      flex-direction: column;
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr;
      margin-right: auto;
      margin-left: auto;
      width: 100%;
    }
  }
  .card {
    padding: 10px 30px 30px 30px;
    width: 100%;

    &__image {
      height: 150px;
      margin-bottom: 24px;
    }

    &__desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      font-size: 14px;
      font-weight: 600;
      line-height: 160%; /* 32px */
      letter-spacing: 0.6px;
    }

    &__text {
      margin-bottom: 24px;
      padding: 0;
    }

    &__btn {
      justify-content: center;
      padding: 5px 7px;
      width: 100%;
    }
  }
  .top__title {
    letter-spacing: 8px;
    font-size: 24px;
  }
}

@media (max-width: 320px) {
}
</style>

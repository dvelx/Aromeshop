<template>
  <div class="product-page__container container">
    <div class="product-page__left">
      <img
        :src="product.image_url"
        :alt="product.title"
        class="product-page__image"
      />
      <img
        :src="product.image_url"
        :alt="product.title"
        class="product-page__image"
      />
      <img
        :src="product.image_url"
        :alt="product.title"
        class="product-page__image"
      />
      <img
        :src="product.image_url"
        :alt="product.title"
        class="product-page__image"
      />
    </div>
    <div class="product-page__right">
      <h1 class="product-page__title">{{ product.title }}</h1>
      <span class="product-page__price"
        >{{ numberFormatter(product.price) }} ₽</span
      >

      <p class="product-page__description">{{ product.description }}</p>
      <div class="product-page__btn-block">
        <BaseCounter v-model:amount="productAmount" />
        <button class="product-page__btn-add" @click="addCart()">
          Добавить в корзину
        </button>
      </div>
      <!--      <div class="product-page__right-accordion accordion">-->
      <!--        <div v-for="(question, index) in questions" :key="question.title">-->
      <!--          <button class="accordion__btn" @click="() => handleAccordion(index)">-->
      <!--            {{ question.title }}-->
      <!--          </button>-->
      <!--          <Collapse :when="questions[index].isExpanded"  class="collapse">-->
      <!--            <p>-->
      <!--              {{ question.answer }}-->
      <!--            </p>-->
      <!--          </Collapse>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
    <PopularProducts />
</template>

<script setup lang="ts">
// import { Collapse } from 'vue-collapsed'
import PopularProducts from "@/components/PopularProducts.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import BaseCounter from "@/components/BaseCounter.vue";
import { cartStore } from "@/store/cartStore.ts";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Product from "@/types/Product.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";

const route = useRoute();
const store = cartStore();

const loader = ref(false);
const product = ref({} as Product);
const productAmount = ref<number>(1);
const productSlug = computed(() => {
  return String(route.params.slug);
});
const addCart = () => {
  store.addProductToCart(product.value.id, productAmount.value);
};

const loadProduct = () => {
  loader.value = true;
  apiDataService
    .getById(productSlug.value)
    .then((res: ResponseData) => (product.value = res.data))
    .then(() => (loader.value = false));
};
watch([productSlug], () => {
  loadProduct();
});
loadProduct();

// const questions = reactive([
//   {
//     title: 'Описание',
//     answer: 'Описание выбранного ароматизатора',
//     isExpanded: true // Initial value
//   },
//   {
//     title: 'Состав продукта',
//     answer: 'Какие ароматы присутствуют',
//     isExpanded: false
//   },
//   {
//     title: 'Question three',
//     answer: 'Answer three',
//     isExpanded: false
//   }
// ])
//
// function handleAccordion(selectedIndex: number) {
//   questions.forEach((_, index) => {
//     questions[index].isExpanded = index === selectedIndex ? !questions[index].isExpanded : false
//   })
// }
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";

.product-page {
  &__container {
    display: flex;
    flex-direction: row;
    gap: 60px;
    margin-bottom: 50px;
  }
  &__left {
    display: grid;
    width: 50%;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
  &__image {
    border: 1px solid $primary;
    border-radius: 10px;
    background-color: transparent;
  }

  &__right {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  &__title {
    margin-bottom: 30px;
  }
  &__price {
    position: absolute;
    top: 0;
    right: 0;
  }
  &__description {
    margin-bottom: 30px;
  }

  &__btn-block {
    display: flex;
    flex-direction: row;
  }

  &__btn-add {
    border: none;
    border-radius: 100px;
    padding: 15px 40px;
    background-color: $dark-text;
    color: $white;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.34px;
    margin-left: auto;
    transition: all 0.4s ease-in-out;
  }
  &__btn-add:hover {
    background-color: $primary;
    color: $dark-text;
  }
}

.accordion {
  width: 100%;
  align-self: end;

  &__btn {
    text-align: start;
    padding: 15px 40px;
    width: 100%;
    border-bottom: 1px solid $primary;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
  }
}
.collapse {
  transition: height 600ms cubic-bezier(0.3, 0, 0.6, 1);
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .product-page {
    &__container {
      flex-direction: column-reverse;
    }
    &__right {
      width: 100%;
    }
    &__left {
      width: 100%;
    }
    &__image {
      max-height: 200px;
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

<template>
  <div v-if="!loading" class="product-page__container container">
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
    </div>
    <div class="product-page__right">
      <h1 class="product-page__title">{{ product.title }}</h1>
      <span class="product-page__price">{{ product.price }}</span>

      <p class="product-page__description">{{ product.description }}</p>
      <div class="product-page__btn-block">
        <BaseCounter v-model:amount="productAmount" />
        <button
          class="product-page__btn-add"
          @click="
            addCart(
              product.id,
              productAmount,
              product.title,
              product.price,
              product.image_url,
            )
          "
        >
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
  <div class="container">
    <PopularProducts />
  </div>
</template>

<script setup lang="ts">
// import { Collapse } from 'vue-collapsed'
import PopularProducts from "@/components/PopularProducts.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../constans/api.ts";
import BaseCounter from "@/components/BaseCounter.vue";
import { cartStore } from "@/store/cartStore.ts";

const route = useRoute();
const store = cartStore();

const product = ref<IProduct>({});
const loading = ref<boolean>(false);
const productAmount = ref<number>(1);
const addCart = (
  id: number,
  amount: number,
  title: string,
  price: number,
  img: string,
) => {
  store.addProductToCart(id, amount, title, price, img);
};

interface IProduct {
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
const loadProductById = (): object => {
  loading.value = true;
  return axios
    .get(API_URL + "/product/?id=" + route.query.id)
    .then((res) => {
      const data = res.data;
      product.value = Object.assign(data, (item: IProduct) => {
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
    })
    .then(() => (loading.value = false))
    .catch(console.log);
};
loadProductById();

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
    background-color: $primary;
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
    transition: all .4s ease-in-out;
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
</style>

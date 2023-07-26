<template>
  <div class="product-page__container container">
    <div class="product-page__left">
      <img :src="product.image" :alt="product.title" class="product-page__image">
      <img src="../../src/assets/images/JNIKIBX001V00.webp" alt="#" class="product-page__image">
      <img src="../../src/assets/images/JNIKIBX001V00.webp" alt="#" class="product-page__image">
      <img src="../../src/assets/images/JNIKIBX001V00.webp" alt="#" class="product-page__image">
    </div>
    <div class="product-page__right">
      <h1 class="product-page__title">{{ product.title }}</h1>
      <div class="product-page__btn-block">
        <button class="product-page__btn-add">Добавить в корзину</button>
      </div>
      <div class="product-page__right-accordion accordion">
        <div v-for="(question, index) in questions" :key="question.title">
          <button class="accordion__btn" @click="() => handleAccordion(index)">
            {{ question.title }}
          </button>
          <Collapse :when="questions[index].isExpanded"  class="collapse">
            <p>
              {{ question.answer }}
            </p>
          </Collapse>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <PopularProducts />
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { Collapse } from 'vue-collapsed'
import PopularProducts from "../components/PopularProducts.vue";
import axios from "axios";
import {API_URL} from "../constans/api.ts";
import {useRoute} from "vue-router";


const route = useRoute()

const product = ref(null)


const loadProductsId = () => {
  product.value = null
   axios.get(API_URL + '/product/?id=' + route.query.id)
    .then(res => product.value = res.data)
}
loadProductsId()


const questions = reactive([
  {
    title: 'Описание',
    answer: 'Описание выбранного ароматизатора',
    isExpanded: true // Initial value
  },
  {
    title: 'Состав продукта',
    answer: 'Какие ароматы присутствуют',
    isExpanded: false
  },
  {
    title: 'Question three',
    answer: 'Answer three',
    isExpanded: false
  }
])

function handleAccordion(selectedIndex: number) {
  questions.forEach((_, index) => {
    questions[index].isExpanded = index === selectedIndex ? !questions[index].isExpanded : false
  })
}

</script>

<style lang="scss" scoped>

@import "src/assets/style/main";

.product-page {

  &__container {
    margin-top: 200px;
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
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
  }
  &__image {
    border: 1px solid $primary;
    border-radius: 10px;
    background-color: $primary;
  }

  &__right {
    display: flex;
    flex-direction: column;
    width: 50%;
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

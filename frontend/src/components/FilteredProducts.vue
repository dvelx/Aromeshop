<template>
  <div class="filter">
    <h2 class="filter__title">Фильтровать</h2>
    
    <fieldset class="form__block">
      <div class="form__legend sort__btn-open" @click="openSort">Сортировать &#8593 &#8595</div>
      <transition name="sort">
        <label v-show="openSortBlock" class="form__label form__label-select sort-products">
          <div class="sort__btn" @click="sorted('price', 'desc')">Сначала дороже</div>
          <div class="sort__btn" @click="sorted('price', 'asc')">Сначала дешевле</div>
          <div class="sort__btn" @click="sorted('name', 'asc')">По названию &#8593</div>
          <div class="sort__btn" @click="sorted('name', 'desc')">По названию &#8595</div>
        </label>
      </transition>
    </fieldset>
    <form
      action="#"
      class="filter__form form"
      method="get"
      @submit.prevent="submit()"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceFrom"
            class="form__input"
            type="text"
            name="min-price"
            autocomplete="off"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceTo"
            class="form__input"
            type="text"
            name="max-price"
            autocomplete="off"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category">
            <option value="0">Все категории</option>
            <option v-for="item of categories" :key="item.id" :value="item.id">
              {{ item.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li v-for="item of brands" :key="item.id" class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" />
              <span class="check-list__desc">{{ item.title }}</span>
            </label>
          </li>
        </ul>
      </fieldset>
      

      <button class="filter__submit" type="submit">Применить</button>
    </form>
  </div>
  <button class="filter-mobile__btn-open" @click="openMobileFilter()">
    Фильтры
  </button>
  <transition name="slide">
    <div v-if="openFilter" class="filter-mobile">
      <h2 class="filter__title">Фильтровать</h2>
      <button class="filter-mobile__btn-close" @click="closeFilter"></button>
      <fieldset class="form__block">
        <div class="form__legend " @click="openSort">Сортировать &#8593 &#8595</div>
        <transition name="sort">
          <label v-show="openSortBlock" class="form__label form__label-select sort-products">
            <div class="sort__btn" @click="sorted('price', 'desc')">Сначала дороже</div>
            <div class="sort__btn" @click="sorted('price', 'asc')">Сначала дешевле</div>
            <div class="sort__btn" @click="sorted('name', 'asc')">По названию &#8593</div>
            <div class="sort__btn" @click="sorted('name', 'desc')">По названию &#8595</div>
          </label>
        </transition>
      </fieldset>
      <form
        action="#"
        class="filter__form form"
        method="get"
        @submit.prevent="submit()"
      >
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price">
            <input
              v-model.number="currentPriceFrom"
              class="form__input"
              type="text"
              name="min-price"
              autocomplete="off"
            />
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price">
            <input
              v-model.number="currentPriceTo"
              class="form__input"
              type="text"
              name="max-price"
              autocomplete="off"
            />
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>
          <label class="form__label form__label--select">
            <select class="form__select" name="category">
              <option value="0">Все категории</option>
              <option
                v-for="item of categories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Коллекция</legend>
          <ul class="check-list">
            <li v-for="item of brands" :key="item.id" class="check-list__item">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" />
                <span class="check-list__desc">{{ item.title }}</span>
              </label>
            </li>
          </ul>
        </fieldset>

        <button class="filter__submit" type="submit" @click="closeFilter">
          Применить
        </button>
      </form>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Categories from "@/types/Categories.ts";
import Brands from "@/types/Brands.ts";

defineProps<{
  priceFrom: number;
  priceTo: number;
  sortBy: string;
  order: string
}>();

const emits = defineEmits<{
  (e: "update:priceFrom", priceFrom: number): void;
  (e: "update:priceTo", priceTo: number): void;
  (e: "update:sortBy", sortBy: string): void;
  (e: "update:order", order: string): void
}>();

const openFilter = ref(false);
const currentPriceFrom = ref(0);
const currentPriceTo = ref(0);
const categories = ref({} as Categories[]);
const brands = ref({} as Brands[]);
const openSortBlock = ref(false)
const openSort = () => {
  openSortBlock.value = !openSortBlock.value
}
const sorted = (sortBy: string, order: string) => {
  emits("update:order", order);
  emits("update:sortBy", sortBy);
  closeFilter()
}

const loadCategories = () => {
  apiDataService
    .getCategories()
    .then((res: ResponseData) => (categories.value = res.data));
};
const loadBrands = () => {
  apiDataService
    .getBrands()
    .then((res: ResponseData) => (brands.value = res.data));
};

const openMobileFilter = () => {
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.screenY}px`;
  openFilter.value = true;
};
const closeFilter = () => {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  openFilter.value = false;
};

const submit = () => {
  emits("update:priceFrom", currentPriceFrom.value);
  emits("update:priceTo", currentPriceTo.value);
  openFilter.value = false;
};

onMounted(() => {
  loadCategories();
  loadBrands();
});
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";

.filter-mobile__btn-open {
  display: none;
}
.filter {
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid $primary;
  border-radius: 20px;
  min-width: 300px;
  padding: 20px;

  &__title {
    margin-bottom: 20px;
    color: $dark-text;
  }
  &__submit {
    padding: 10px 30px;
    border: 1px solid $primary;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    color: $dark-text;
  }
  &__submit:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
.sort__btn,
.sort__btn-open {
  cursor: pointer;
}
.sort__btn {
  margin-bottom: 10px;
}
.sort-enter-active,
.sort-leave-active {
  transition: all 0.5s ease-in-out;
}

.sort-enter-from,
.sort-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
.form {
  &__block {
    position: relative;
    border: 0;
    margin: 0 0 35px;
    border-bottom: 1px solid $primary;
    padding: 0 0 10px 0;
  }
  
  &__legend {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1;
    color: $primary;
  }
  &__label {
    position: relative;
    display: block;
    color: #222;
  }
  &__label:not(:last-child) {
    margin-bottom: 25px;
  }
  &__label--price::after {
    content: "₽";
    position: absolute;
    top: 32px;
    right: 20px;
    font-size: 16px;
    line-height: 1;
    color: #222;
  }
  &__input {
    padding: 28px 45px 13px 20px;
    width: 100%;
    height: 65px;
    border-radius: 1px;
    border: 1px solid transparent;
    background-color: $background;
    filter: brightness(97%);
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    color: #222;
    font-size: 16px;
    font-family: inherit;
    line-height: 1;
  }

  &__input:focus,
  &__input:hover {
    outline: 0;
    border-color: $primary;
  }
  &__value {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 12px;
    line-height: 1;
    color: #737373;
    font-weight: 300;
  }
  &__label--select::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 14px;
    height: 7px;
    background-image: url(../assets/images/svg/icon-arrow-bottom.svg);
    background-repeat: no-repeat;
    background-size: contain;
  }
  &__select {
    width: 100%;
    height: 52px;
    border-radius: 0;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 11px 35px 11px 18px;
    color: #222;
    font-size: 16px;
    font-family: inherit;
    line-height: 1;
    outline: 1px solid $primary;
    background-color: transparent;
  }
}

.check-list {
  margin: 0;
  padding: 0;
  list-style: none;

  &__item:not(:last-child) {
    margin-bottom: 13px;
  }
  &__label {
    display: block;
    cursor: pointer;
  }

  &__desc {
    position: relative;
    display: block;
    padding-left: 27px;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 16px;
    line-height: 1;
  }
  &__desc::after,
  &__desc::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &__desc::before {
    left: 0;
    width: 12px;
    height: 12px;
    background-color: $white;
    border: 1px solid $dark_text;
  }
  &__desc::after {
    opacity: 0;
    left: 4px;
    width: 6px;
    height: 6px;
    background-color: $primary;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &__desc span {
    color: $dark_text;
  }

  &__label:focus &__desc::after,
  &__label:hover &__desc::after {
    opacity: 0.3;
  }

  &__check:checked ~ &__desc::after {
    opacity: 1;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  
  .filter {
    display: none;
  }
  .filter-mobile__btn-open {
    display: block;
    width: 100%;
    margin-bottom: 40px;
    padding: 10px;
    background-color: $background;
    filter: brightness(95%);
    font-size: 16px;
    letter-spacing: 3px;
  }

  .filter-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: $background;
    z-index: 1000;
    padding: 50px;
    overflow: scroll;
  }
  .filter-mobile__btn-close {
    width: 54px;
    height: 54px;
    position: absolute;
    top: 15px;
    right: 15px;

    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: $dark_text;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  .sort__btn {
    margin-bottom: 5px;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.6s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  .sort-enter-active,
  .sort-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .sort-enter-from,
  .sort-leave-to {
    transform: translateY(-15px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

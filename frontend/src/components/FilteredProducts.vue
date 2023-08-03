<template>
  <div class="filter">
    <h2 class="filter__title">Фильтровать</h2>
    <form action="#" class="filter__form form" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            autocomplete="off"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
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
            <option v-for="item of categories" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" />
              <span class="check-list__desc"> название коллекции </span>
            </label>
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" />
              <span class="check-list__desc"> название коллекции </span>
            </label>
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" />
              <span class="check-list__desc"> название коллекции </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit" type="submit">Применить</button>
    </form>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import Categories from "@/types/Categories.ts";

const categories = ref({} as Categories[])

const loadCategories = () => {
  apiDataService.getCategories().then((res: ResponseData) => categories.value = res.data)
}

onMounted(loadCategories)
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.filter {
  display: flex;
  flex-direction: column;
  height: fit-content;
  border: 1px solid $primary;
  border-radius: 20px;
  min-width: 300px;
  margin-right: auto;
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
  }
  &__submit:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
.form {
  &__block {
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
    background-color: transparent;
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
    -webkit-transform: translateY(-50%);
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
    -webkit-transform: translateY(-50%);
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
</style>

<template>
  <HeaderPromotion />
  <header class="header">
    <div class="header__container container">
      <div class="logo">
        <router-link to="/">
          <img src="../../src/assets/images/svg/aroma-logo.svg" alt="logo" />
        </router-link>
      </div>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/catalog" class="nav__link"> МАГАЗИН </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/about-us" class="nav__link">
              О&nbsp;НАС
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/blog" class="nav__link"> БЛОГ </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/reviews" class="nav__link"> ОТЗЫВЫ </router-link>
          </li>
        </ul>
      </nav>
      <div class="right">
        <div class="right__top">
          <div class="right__top-action">
            <div class="right__top-search">
              <a href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                    fill="#0C0D12"
                  />
                  <path
                    d="M22 22.7499C21.81 22.7499 21.62 22.6799 21.47 22.5299L19.47 20.5299C19.18 20.2399 19.18 19.7599 19.47 19.4699C19.76 19.1799 20.24 19.1799 20.53 19.4699L22.53 21.4699C22.82 21.7599 22.82 22.2399 22.53 22.5299C22.38 22.6799 22.19 22.7499 22 22.7499Z"
                    fill="#0C0D12"
                  />
                </svg>
              </a>
            </div>
            <div class="right__top-cart">
              <router-link to="/cart" class="cart">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.62981C16.09 8.62981 15.75 8.28981 15.75 7.87981V6.49981C15.75 5.44981 15.3 4.42981 14.52 3.71981C13.73 2.99981 12.71 2.66981 11.63 2.76981C9.83 2.93981 8.25 4.77981 8.25 6.69981V7.66981C8.25 8.07981 7.91 8.41981 7.5 8.41981C7.09 8.41981 6.75 8.07981 6.75 7.66981V6.68981C6.75 3.99981 8.92 1.51981 11.49 1.26981C12.99 1.12981 14.43 1.59981 15.53 2.60981C16.62 3.59981 17.25 5.01981 17.25 6.49981V7.87981C17.25 8.28981 16.91 8.62981 16.5 8.62981Z"
                    fill="#0C0D12"
                  />
                  <path
                    d="M15 22.75H9C4.38 22.75 3.52 20.6 3.3 18.51L2.55 12.52C2.44 11.44 2.4 9.89 3.45 8.73C4.35 7.73 5.84 7.25 8 7.25H16C18.17 7.25 19.66 7.74 20.55 8.73C21.59 9.89 21.56 11.44 21.45 12.5L20.7 18.51C20.48 20.6 19.62 22.75 15 22.75ZM8 8.75C6.31 8.75 5.15 9.08 4.56 9.74C4.07 10.28 3.91 11.11 4.04 12.35L4.79 18.34C4.96 19.94 5.4 21.26 9 21.26H15C18.6 21.26 19.04 19.95 19.21 18.36L19.96 12.35C20.09 11.13 19.93 10.3 19.44 9.75C18.85 9.08 17.69 8.75 16 8.75H8Z"
                    fill="#0C0D12"
                  />
                  <path
                    d="M15.42 13.1499C14.86 13.1499 14.41 12.6999 14.41 12.1499C14.41 11.5999 14.86 11.1499 15.41 11.1499C15.96 11.1499 16.41 11.5999 16.41 12.1499C16.41 12.6999 15.97 13.1499 15.42 13.1499Z"
                    fill="#0C0D12"
                  />
                  <path
                    d="M8.42 13.1499C7.86 13.1499 7.41 12.6999 7.41 12.1499C7.41 11.5999 7.86 11.1499 8.41 11.1499C8.96 11.1499 9.41 11.5999 9.41 12.1499C9.41 12.6999 8.97 13.1499 8.42 13.1499Z"
                    fill="#0C0D12"
                  />
                </svg>
                <span class="cart__counter" aria-label="Количество товаров">{{
                  cartProductsAmount
                }}</span>
              </router-link>
            </div>
            <div class="right__burger-btn" @click="isOpenBurgerMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toggle" class="right__top-burger-menu" @click="outsideClick">
      <nav class="burger-nav">
        <ul class="burger-nav__list">
          <li class="nav__item">
            <router-link to="/catalog" class="nav__link" active-class="active" @click="isOpenBurgerMenu">
              МАГАЗИН
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/about-us" class="nav__link" active-class="active" @click="isOpenBurgerMenu">
              О&nbsp;НАС
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/blog" class="nav__link" active-class="active" @click="isOpenBurgerMenu">
              БЛОГ
            </router-link>
          </li>
          <li class="nav__item">
            <router-link to="/reviews" class="nav__link" active-class="active" @click="isOpenBurgerMenu">
              ОТЗЫВЫ
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderPromotion from "./HeaderPromotion.vue";
import { computed, ref } from "vue";
import { cartStore } from "@/store/cartStore.ts";

const store = cartStore();
const toggle = ref(false);

const cartProductsAmount = computed(() => {
  return (
    store.state.cartProduct.reduce((acc, item) => +item.quantity + acc, 0) || 0
  );
});
const isOpenBurgerMenu = () => {
  toggle.value = !toggle.value;
};
const content = ref(null)
const outsideClick = (e) => {
  if (e.target !== content.value && e.target.contains(content.value)) {
    console.log(e)
    isOpenBurgerMenu()
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.nav__link.router-link-active {
  color: rgba(201, 164, 137, 0.85);
}
.header {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 50px;
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
}
.nav {
  &__list {
    display: flex;
    flex-direction: row;
    gap: 90px;
  }

  &__link {
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.6px;
    color: $dark_text;
    position: relative;
  }
  &__link:after {
    display: block;
    position: absolute;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $primary;
    content: "";
    transition: width 0.3s ease-out;
  }
  &__link:hover:after,
  &__link:focus:after {
    width: 100%;
  }
}
.right {
  &__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &-action {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
    }
  }
  &__burger-btn{
    display: none;
  }
  
}
.logo {
  align-self: center;

  a {
    img {
      width: 200px;
    }
  }
}
.cart {
  position: relative;

  &__counter {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $primary;
    padding: 3px;
    min-width: 13px;
    height: 13px;
    border-radius: 50%;
    font-size: 7px;
    color: $white;
    text-align: center;
    line-height: 1;
  }
}
@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .nav {
    display: none;
    &__list {
      gap: 30px;
    }
  }
  .right {
    &__burger-btn {
      width: 26px;
      height: 20px;
      position: relative;
      cursor: pointer;
    }
    &__burger-btn span {
      position: absolute;
      display: block;
      background-color: $dark_text;
      height: 10%;
      width: inherit;
    }
    &__burger-btn span:nth-child(1) {
      top: 0;
    }
    &__burger-btn span:nth-child(2) {
      top: 40%;
    }
    &__burger-btn span:nth-child(3) {
      top: 80%;
    }
    &__burger-btn {
      display: block;
    }
  }
  .burger-nav {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #737373;
    border-radius: 0 0 0 20px;
    z-index: 1000;
    
    &__list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding: 40px;
      width: 300px;
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

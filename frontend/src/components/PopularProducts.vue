<template>
  <div class="popular-container container">
    <h1 class="title">Популярные ароматизаторы</h1>
    <h3 class="title-cta">
      Купи наши популярные свечи
    </h3>
      <swiper
          :modules="[Pagination, Autoplay]"
          :autoplay="{delay: 6000}"
          :slides-per-view="4"
          :space-between="50"
          :pagination="{clickable: true}"
      >
        <swiper-slide>
          <router-link to="/product">
            <div class="card">
              <img src="../../src/assets/images/JQUEEN050001.jpg" alt="" class="card__image">
              <div class="card__desc">
                <h5 class="card__title">
                  QUEEN
                </h5>
                <p class="card__price">1200 p</p>
              </div>
              <p class="card__text">
                Home fragrance
              </p>
              <button class="card__btn btn">
                В КОРЗИНУ

                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#0C0D12"/>
                  <path d="M9 12H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </router-link>
        </swiper-slide>
        <swiper-slide>
            <div class="card">
              <router-link to="/product">
                <img src="../../src/assets/images/JQUEEN050001.jpg" alt="" class="card__image">
              </router-link>
              <div class="card__desc">
                <h5 class="card__title">
                  QUEEN
                </h5>
                <p class="card__price">1200 p</p>
              </div>
              <p class="card__text">
                Home fragrance
              </p>
              <button class="card__btn btn">
                В КОРЗИНУ

                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#0C0D12"/>
                  <path d="M9 12H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="card">
              <router-link to="/product">
                <img src="../../src/assets/images/JQUEEN050001.jpg" alt="" class="card__image">
              </router-link>
              <div class="card__desc">
                <h5 class="card__title">
                  QUEEN
                </h5>
                <p class="card__price">1200 p</p>
              </div>
              <p class="card__text">
                Home fragrance
              </p>
              <button class="card__btn btn">
                В КОРЗИНУ

                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#0C0D12"/>
                  <path d="M9 12H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="card">
              <router-link to="/product">
                <img src="../../src/assets/images/JQUEEN050001.jpg" alt="" class="card__image">
              </router-link>
              <div class="card__desc">
                <h5 class="card__title">
                  QUEEN
                </h5>
                <p class="card__price">1200 p</p>
              </div>
              <p class="card__text">
                Home fragrance
              </p>
              <button class="card__btn btn">
                В КОРЗИНУ

                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#0C0D12"/>
                  <path d="M9 12H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="card">
              <router-link to="/product">
                <img src="../../src/assets/images/JQUEEN050001.jpg" alt="" class="card__image">
              </router-link>
              <div class="card__desc">
                <h5 class="card__title">
                  QUEEN
                </h5>
                <p class="card__price">1200 p</p>
              </div>
              <p class="card__text">
                Home fragrance
              </p>
              <button class="card__btn btn">
                В КОРЗИНУ

                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="#0C0D12"/>
                  <path d="M9 12H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 9V15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        </swiper-slide>
        ...
      </swiper>
    </div>



</template>

<script setup lang="ts">
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css'
import 'swiper/css/pagination';




</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.popular-container {
  margin-bottom: 30px;
}
.title {
  font-family: Zilla Slab,serif;
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
  border: 1px solid rgba(242, 242, 242, .5);
  border-radius: 10px;
  padding: 30px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(242, 242, 242, .5),
  -5px -5px 10px rgba(242, 242, 242, .5),
  5px -5px 10px rgba(242, 242, 242, .5),
  -5px 5px 10px rgba(242, 242, 242, .5);

  &__image {
    margin-bottom: 24px;
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
  }
  &__text {
    margin-bottom: 24px;
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

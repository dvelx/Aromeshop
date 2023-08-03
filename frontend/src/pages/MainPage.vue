<template>
  <MainContent />
  <PopularProducts />

  <Promotion />
  <section class="content">
    <div class="content__container container">
      <div class="content__card card">
        <img src="../assets/images/VINOVE-PARIS-collage.webp" alt="" />
      </div>
      <div class="content__card card">
        <div class="card__image"></div>
        <h2 class="card__text">
          Создайте уютную атмосферу в своем доме с ароматизаторами от нашей
          компании. Наслаждайтесь идеальной атмосферой дома каждый день с нашими
          ароматизаторами!
        </h2>
      </div>
      <div class="content__card card">
        <div class="card__image-2"></div>
        <h2 class="card__text">
          Мы предлагаем широкий выбор ароматов, от свежих цветочных до теплых и
          уютных, которые подходят для любого времени года.
        </h2>
      </div>
      <div class="content__card card">
        <img
          src="../assets/images/2022-06-22%20Mr%20&%20Mrs%20Fragrances0756.webp"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PopularProducts from "../components/PopularProducts.vue";
import Promotion from "../components/PromotionComponent.vue";
import MainContent from "../components/MainContent.vue";
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.content {
  background-color: #ecdfdb;
  padding-top: 50px;
  padding-bottom: 50px;

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}
.card {
  display: flex;
  flex-direction: column;

  &__image {
    height: 80%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../assets/images/2022-06-22 Mr & Mrs Fragrances0511.webp");
  }
  &__image-2 {
    height: 80%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../assets/images/2022-06-22 Mr & Mrs Fragrances0899.webp");
  }

  &__text {
    font-weight: 400;
    letter-spacing: 1.1px;
    margin-top: auto;
    align-self: flex-end;
  }
}

@media (max-width: 1199px) {
  .card {
    &__text {
      font-size: 13px;
    }
  }
}
</style>

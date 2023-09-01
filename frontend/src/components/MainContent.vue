<template>
  <section class="hero">
    <div class="hero__container container">
      <div class="hero__bg"></div>
      <div class="right">
        <p class="right__hashtag">#AROMAHOME_NN</p>
        <h1 class="right__main-text">
          Наслаждайтесь идеальной <span>атмосферой дома</span> каждый день с
          нашими <span>ароматизаторами!</span>
        </h1>
        <router-link to="/catalog" class="right__btn btn"
          >Смотреть товары</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.hero__container {
  display: flex;
  margin-bottom: 70px;
}
.hero__bg {
  width: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("../../src/assets/images/2022-06-22 Mr & Mrs Fragrances0862.webp");
}
.right {
  width: 50%;
  padding: 0 50px 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: end;

  &__hashtag {
    font-size: 18px;
    line-height: 29px;
    letter-spacing: 4.32px;
    margin-bottom: 110px;
    text-align: end;
  }

  &__main-text {
    font-size: 43px;
    font-weight: 600;
    letter-spacing: 1.8px;
    margin-bottom: 136px;
    text-align: end;

    & span {
      color: $primary;
    }
  }

  &__btn {
    width: 60%;
    text-align: center;
    background-color: $dark_text;
    color: $white;
    padding: 16px 40px;
    border-radius: 100px;
    font-family: "Zilla Slab", serif;
    font-size: 20px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-left: auto;
    transition: all 0.4s ease-in-out;
  }
  &__btn:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
.logo {
  width: 100px;
}

@media (max-width: 1199px) {
  .right {
    padding: 0 25px 0 25px;
    &__main-text {
      font-size: 30px;
      margin-bottom: 30px;
    }
    &__hashtag {
      margin-bottom: 20px;
    }
    &__btn {
      padding: 10px 20px;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <section class="hero">
    <div class="hero__container container">
      <div class="right">
        <p class="right__hashtag">#AROMAHOME_NN</p>
        <h1 class="right__main-text">
          Наслаждайтесь идеальной <span>атмосферой дома</span> каждый день с
          нашими <span>ароматизаторами!</span>
        </h1>
        <router-link to="/catalog" class="right__btn btn"
          >Смотреть товары <span class="right__btn-flare"></span
        ></router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.fromTo(
    ".right__main-text",
    {
      opacity: 0,
      x: "-100%",
    },
    {
      duration: 1.5,
      opacity: 1,
      x: 0,
    },
  );
});
</script>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__hashtag {
    font-size: 18px;
    line-height: 29px;
    letter-spacing: 4.32px;
    margin-bottom: 70px;
  }

  &__main-text {
    width: 50%;
    font-size: 43px;
    font-weight: 600;
    letter-spacing: 1.8px;
    margin-bottom: 80px;
    text-align: center;

    & span {
      color: $primary;
    }
  }

  &__btn {
    width: 20%;
    text-align: center;
    background-color: $primary;
    color: $white;
    padding: 16px 40px;
    border-radius: 100px;
    font-family: "Zilla Slab", serif;
    font-size: 20px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    transition: all 0.4s ease-in-out;
    position: relative;
    overflow-x: hidden;
  }
  &__btn-flare {
    position: absolute;
    top: 0;
    height: 100%;
    width: 45px;
    transform: skewX(-45deg);
    left: -150%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.4)
    );
    animation: flare 3s infinite linear;
  }
  &__btn:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
@keyframes flare {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
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
@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .right {
    &__main-text {
      width: 80%;
    }
    &__btn {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .right {
    &__main-text {
      width: 100%;
      text-align: center;
    }
  }
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

<template>
  <div class="promotion-container">
    <div class="promotion__banner">
      <div class="promotion__badge">
        <span>35%</span>
        <p>OFF</p>
      </div>
      <div class="promotion__text">
        <p>Используй свою скидку прямо сейчас</p>
      </div>
    </div>
    <button class="button promotion__btn btn">ПОДРОБНЕЕ...</button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.promotion {
  &-container {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__banner {
    padding: 100px 80px;
    margin-bottom: 50px;
    background: url("../assets/images/adv-queen-06 (1).webp") no-repeat 100%/100%;
  }
  &__badge {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 8px;
    font-size: 80px;
    font-weight: 600;
    letter-spacing: 2.4px;
    text-align: center;
    align-items: center;
    color: $white;
  }
  &__badge span {
    background-color: $dark_text;
  }
  &__text {
    font-size: 32px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.96px;
    color: $white;
  }
  &__btn {
    border: 1px solid $primary;
    border-radius: 100px;
    padding: 16px 64px;
    font-size: 20px;
    margin: auto;
    width: 35%;
    transition: all 0.4s ease-in-out;
  }
  &__btn:hover {
    background-color: $primary;
    color: $white;
  }
}
</style>

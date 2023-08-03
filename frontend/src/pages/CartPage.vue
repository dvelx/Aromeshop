<template>
  <section class="cart">
    <div class="container cart__container">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <!--          <CartItem v-for="item in products" :key="item.productId" :item="item"/>-->
            <CartItem
              v-for="item of cartProducts"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <a class="cart__button" type="submit">
            Оформить заказ
          </a>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import CartItem from "@/components/CartItem.vue";

import { cartStore } from "@/store/cartStore.ts";
import { computed } from "vue";
import numberFormatter from "@/helpers/numberFormatter.ts";

const store = cartStore();

const cartProducts = computed(() => {
  return store.state.cartProduct;
});
const totalPrice = computed(() => {
  store.cartTotalPrice();
  return numberFormatter(store.state.totalPrice);
});
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.cart {
  &__container {
    display: flex;
    flex-direction: row;
    width: 100vw;
  }
  &__form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: 20px 40px;
    width: 100%;
  }
  &__block {
    border: 1px solid $primary;
    border-radius: 20px;
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
  }
  &__price {
    font-size: 30px;
    line-height: 48px;
    margin-bottom: 40px;
  }
  &__button {
    background-color: $dark-text;
    padding: 10px 30px;
    font-size: 20px;
    margin-top: auto;
    border-radius: 50px;
    transition: all .4s ease-in-out;
  }
  &__button:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
</style>

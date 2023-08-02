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

          <a class="cart__button button button--primary" type="submit">
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

const store = cartStore();

const cartProducts = store.state.cartProduct;
const totalPrice = computed(() => {
  return store.state.totalPrice;
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
  }
  &__price {
    font-size: 30px;
    line-height: 48px;
  }
  &__button {
    background-color: $dark-text;
    padding: 10px 30px;
    font-size: 20px;
    margin-top: auto;
    border-radius: 50px;
  }
}
</style>

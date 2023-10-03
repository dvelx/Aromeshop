<template>
  <section v-if="Object.keys(cartProducts).length == 0" >
    <div class="container error-container">
      <h1 class="error-server" style="text-align: center; margin-bottom: 40px;">Ваша корзина пуста</h1>
      <router-link to="/catalog" class="right__btn btn"
      >Смотреть товары</router-link
      >
    </div>
  </section>
  <section v-else class="cart">
    <div class="container cart__container">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="item of cartProducts"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__price">
            Итого: <span>{{ numberFormatter(totalPrice) }} ₽</span>
          </p>

          <router-link v-slot="{ navigate }" to="/order">
            <button
              class="cart__button"
              type="submit"
              :disabled="cartProducts.length === 0"
              @click="navigate"
            >
              Оформить заказ
            </button>
          </router-link>
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
  return store.cartTotalPrice();
});

store.loadBasket(store.state.userAccessKey);
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.cart {
  &__container {
    display: flex;
    flex-direction: row;
  }
  &__form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: 20px 80px;
    margin-right: auto;
    margin-left: auto;
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
    color: $white;
    padding: 10px 30px;
    font-size: 20px;
    margin-top: auto;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
  }
  &__button:disabled {
    opacity: 0.6;
  }
  &__button:not([disabled]):hover {
    background-color: $primary;
    color: $dark-text;
  }
}
.error-container {
  display: flex;
  flex-direction: column;
}
.right__btn {
  margin: 0 auto 40px auto;
  width: 40%;
  text-align: center;
  background-color: $dark_text;
  color: $white;
  padding: 16px 40px;
  border-radius: 100px;
  font-family: "Zilla Slab", serif;
  font-size: 20px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: $primary;
    color: $dark-text;
  }
}
@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
  .cart {
    &__form {
      display: flex;
      flex-direction: column;
      margin-right: auto;
      margin-left: auto;
    }
  }
}

@media (max-width: 768px) {
  .cart {
    &__form {
      display: flex;
      flex-direction: column;
      margin-right: auto;
      margin-left: auto;
    }

    &__block {
      margin-bottom: 40px;
      align-items: center;
    }
  }
  .right__btn {
    width: 80%;
    color: $white;
    padding: 16px 20px;
    border-radius: 100px;
    font-size: 15px;
    
  }
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

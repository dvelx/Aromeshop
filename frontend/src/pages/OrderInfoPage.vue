<template>
  <div class="container">
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                 {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                l{{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Комментарий:
              </span>
              <span class="dictionary__value">
                {{ orderInfo.comment }}
              </span>
            </li>
            
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item of orderProduct">
              <h3 class="cart__order-title">{{ item.product.title }}</h3>
              <b class="cart__order-price">{{ numberFormatter(item.product.price) }} ₽</b>
              <span class="cart__order-span">Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p @click="console.log(orderProduct)">Доставка: <b></b></p>
            <p>Итого: <b></b> товара на сумму <b> ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { cartStore } from "@/store/cartStore.ts";
import { computed } from "vue";
import { useRoute } from "vue-router";
import numberFormatter from "../helpers/numberFormatter.ts";

const store = cartStore();
const route = useRoute();

const orderInfo = computed(() => {
  return store.state.orderInfo;
});

const orderProduct = computed(() => {
  return store.state.orderInfo.items;
});

const loadOrder = () => {
  if (store.state.orderInfo && store.state.orderInfo.id === route.params.id) {
    return;
  }
  store.loadOrderInfo(+route.params.id);
};
loadOrder()
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.cart {
  margin-bottom: 40px;
  
  &__form {
    display: grid;
    grid-template-columns: 1fr 370px;
    grid-template-rows: auto 1fr;
    gap: 20px 50px;
    align-items: flex-start;
  }
  
  &__message {
    margin: 0 0 50px;
    line-height: 24px;
    width: 75%;
    font-size: 18px;
  }
  
  &__block {
    border: 1px solid $primary;
    padding: 35px 30px;
    border-radius: 20px;
  }
  &__orders {
    padding: 0 30px 25px;
    margin: 0 -30px 25px;
    border-bottom: 1px solid $primary;
  }
  &__order {
    display: grid;
    grid-template-columns: 1fr 90px;
    gap: 5px 20px;
    
    &-title {
      font-size: 16px;
    }
    &-price {
      font-size: 16px;
      text-align: right;
    }
    &-span {
      font-size: 12px;
      opacity: .6;
    }
  }
  &__order:not(:last-child) {
    margin-bottom: 20px;
  }
}
.dictionary__item {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 20px;
}
.dictionary__item:not(:last-child) {
  margin-bottom: 30px;
}
.dictionary__key {
  opacity: .6;
}


</style>

<template>
  <li class="cart-item__wrapper">
    <div class="cart-item__image-block">
      <img :src="item.Product.image" :alt="item.Product.title" />
    </div>
    <div class="cart-item__right">
      <div class="cart-item__name-and-article-block">
        <h3 class="cart-item__title">{{ item.Product.title }}</h3>
        <span class="cart-item__code"> Артикул: {{ item.Product.id }} </span>
      </div>
      <div class="cart-item__quantity-price">
        <div class="cart-item__actions-container">
          <BaseCounter
            v-model:amount="productQuantity"
            class="cart-item__counter"
          />
          <button
            class="cart-item__action-del"
            style="cursor: pointer"
            type="button"
            aria-label="Удалить товар из корзины"
            @click="deleteProduct(item.Product.id)"
          >
            Удалить
          </button>
        </div>
        <div class="cart-item__price">
          <span class="cart-item__main-value"> {{ productTotalPrice }} ₽ </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import BaseCounter from "@/components/BaseCounter.vue";
import { computed } from "vue";
import { cartStore } from "@/store/cartStore.ts";
import numberFormatter from "@/helpers/numberFormatter.ts";

const store = cartStore();

interface Props {
  item: {
    Product: {
      id: number;
      title: string;
      image: string;
      price: number;
    },
    quantity: number;
  };
}

const props = defineProps<Props>();

const productTotalPrice = computed(() => {
  return numberFormatter(props.item.quantity * props.item.Product.price);
});

const productQuantity = computed({
  get() {
    return props.item.quantity;
  },
  set(value) {
    store.updateCartProductQuantity(props.item.Product.id, value);
  },
});
const deleteProduct = (id: number) => {
  return store.deleteProduct(id);
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.cart-item {
  &__wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 1px solid $primary;
    margin-bottom: 30px;
  }
  &__image-block {
    width: 128px;
    min-width: 128px;
    height: 128px;
    overflow: hidden;
    position: relative;
    margin-right: 24px;
    padding-right: 24px;
  }
  &__right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    align-self: stretch;
  }
  &__name-and-article-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    width: 397px;
    padding: 20px 0 20px 0;
  }
  &__quantity-price {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    gap: 60px;
  }
  &__counter {
    margin-bottom: 20px;
  }
  &__action-del {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    margin-top: 20px;
    font-size: 18px;
    color: $dark_text;
  }
  &__code {
    font-size: 12px;
    color: #b9b9b9;
  }
  &__main-value {
    font-weight: 700;
    font-size: 24px;
  }
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {
}

@media (max-width: 768px) {
  .cart-item {
    &__right {
      flex-direction: column;
    }
    &__name-and-article-block {
      width: 60%;
      margin: 0;
    }
    &__quantity-price {
      flex-direction: row-reverse;
      align-items: flex-start;
      width: 100%;
      margin-top: 12px;
    }
    &__title {
      font-weight: 500;
      font-size: 18px;
    }
  }
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

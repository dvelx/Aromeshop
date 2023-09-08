<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image_url" width="120" height="120" alt="title" />
    </div>
    <h3 class="product__title">{{ item.title }}</h3>

    <span class="product__code"> Артикул: {{ item.id }} </span>
    <BaseCounter v-model:amount="productQuantity" />

    <b class="product__price"> {{ productTotalPrice }} ₽ </b>

    <button
      class="product__del button-del"
      style="cursor: pointer"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteProduct(item.id)"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17 1L1 17" stroke="#9D9D9D" stroke-width="0.8" />
        <path d="M17 17L1 0.999999" stroke="#9D9D9D" stroke-width="0.8" />
      </svg>
    </button>
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
    id: number;
    title: string;
    image_url: string;
    price: number;
    quantity: number;
  };
}

const props = defineProps<Props>();

const productTotalPrice = computed(() => {
  return numberFormatter(props.item.quantity * props.item.price);
});

const productQuantity = computed({
  get() {
    return props.item.quantity;
  },
  set(value) {
    store.updateCartProductQuantity(props.item.id, value);
  },
});
const deleteProduct = (id: number) => {
  return store.deleteProduct(id);
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/main";
.product {
  display: grid;
  grid-template-columns: 120px 280px 200px 120px 20px;
  grid-template-rows: repeat(3, min-content);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  grid-gap: 10px 20px;
  margin-bottom: 20px;

  &__pic {
    align-self: flex-start;
    grid-column: 1/2;
    grid-row: 1/4;
  }

  &__title {
    margin: 0;
    grid-column: 2/3;
    grid-row: 1/2;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  }

  &__info {
    margin: 0;
    grid-column: 2/3;
    grid-row: 2/3;
    font-size: 14px;
    line-height: 1;
    color: #737373;
  }

  &__code {
    grid-column: 2/3;
    grid-row: 2/4;
    font-size: 12px;
    color: #b9b9b9;
  }

  &__del {
    grid-column: 5/6;
    grid-row: 1/2;
  }
  &__del:hover svg path {
    stroke: black;
  }
}

@media (max-width: 1780px) {
}
@media (max-width: 1366px) {
}

@media (max-width: 1024px) {

}

@media (max-width: 768px) {
  .product {
    display: flex;
    justify-content: space-between;
    grid-gap: 10px;
    
    &__pic {
      width: 70px;
    }
    
    &__title {
      font-size: 14px;
      line-height: 1;
    }
  }
  
}

@media (max-width: 576px) {
}

@media (max-width: 320px) {
}
</style>

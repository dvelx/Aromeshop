import { defineStore } from "pinia";
import { ref } from "vue";

export const cartStore = defineStore("cartStore", () => {
  const state = ref({
    cartProduct: [] as Object[],
    totalPrice: 0 as number,
  });

  const addProductToCart = (
    productId: number,
    amount: number,
    title: string,
    price: number,
    img: string,
  ) => {
    state.value.cartProduct.push({
      id: productId,
      amount: amount,
      title: title,
      price: price,
      img: img,
    });
  };

  const cartTotalPrice = () => {
    console.log(
      state.value.cartProduct.reduce(
        (acc: number, item) => item.price * item.amount + acc,
        0,
      ),
    );
  };

  return {
    state,
    addProductToCart,
    cartTotalPrice,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

interface IItem {
  price: number;
  amount: number;
  id: number;
  title: string;
  img: string;
}
export const cartStore = defineStore("cartStore", () => {
  const state = ref({
    cartProduct: [] as IItem[],
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
    state.value.totalPrice = state.value.cartProduct.reduce(
      (acc, item) => item.price * item.amount + acc,
      0,
    );
  };
  const deleteProduct = (productId: number) => {
    state.value.cartProduct = state.value.cartProduct.filter(
      (item) => item.id !== productId,
    );
  };

  return {
    state,
    addProductToCart,
    cartTotalPrice,
    deleteProduct,
  };
});

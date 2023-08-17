import { defineStore } from "pinia";
import { ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";

interface IItem {
  price: number;
  quantity: number;
  id: number;
  title: string;
  img: string;
}
export const cartStore = defineStore("cartStore", () => {
  const state = ref({
    cartProduct: [] as IItem[],
    totalPrice: 0 as number,
    userAccessKey: null as string | null,
    cartId: 0 as number
  });

  const addProductToCart = ( productId: number, amount: number) => {
    return apiDataService.addProductToBasket(state.value.cartId, productId, amount)
  };
  const cartTotalPrice = () => {
    state.value.totalPrice = state.value.cartProduct.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0,
    );
  };
  const deleteProduct = (productId: number) => {
    state.value.cartProduct = state.value.cartProduct.filter(
      (item) => item.id !== productId,
    );
  };
  
  const updateUserAccessKey = (accessKey: string) => {
    state.value.userAccessKey = accessKey
  }
  
  const loadBasket = () => {
    apiDataService
      .getBasket()
      .then(res => {
        if (!state.value.userAccessKey) {
          localStorage.setItem('userAccessKeyAroma', res.data.user.accessKey)
          updateUserAccessKey(res.data.user.accessKey)
        }
        state.value.cartId = res.data.id
        state.value.cartProduct = res.data.items
      })
  }

  return {
    state,
    addProductToCart,
    cartTotalPrice,
    deleteProduct,
    updateUserAccessKey,
    loadBasket
  };
});

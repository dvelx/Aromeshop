import { defineStore } from "pinia";
import { computed, ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";

interface IItem {
  price: number;
  quantity: number;
  id: number;
  title: string;
  image_url: string;
}
export const cartStore = defineStore("cartStore", () => {
  const state = ref({
    cartProduct: [] as IItem[],
    totalPrice: 0 as number,
    userAccessKey: null as string | null,
    cartId: 0 as number,
  });

  const syncCart = computed(() => {
    return state.value.cartProduct;
  });

  const updateUserAccessKey = (accessKey: string) => {
    state.value.userAccessKey = accessKey;
  };
  const addProductToCart = (productId: number, amount: number) => {
    apiDataService
      .addProductToBasket(state.value.cartId, productId, amount)
      .then(() => loadBasket(state.value.userAccessKey))
  };
  const cartTotalPrice = () => {
    return syncCart.value.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0,
    );
  };
  const updateCartProductQuantity = (productId: number, amount: number) => {
    const item = syncCart.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = amount;
    }

    if (amount < 1) {
      return;
    }
    return apiDataService.changeProductQuantity(
      state.value.cartId,
      productId,
      amount,
    );
  };
  const deleteProduct = (productId: number) => {
    apiDataService
      .deleteProduct(state.value.cartId, productId)
      .then(() => loadBasket(state.value.userAccessKey));
  };
  const loadBasket = (accessKey: string | null = null) => {
    return apiDataService.getBasket(accessKey)
      .then((res) => {
      if (!state.value.userAccessKey) {
        localStorage.setItem("userAccessKeyAroma", res.data.user.accessKey);
        updateUserAccessKey(res.data.user.accessKey);
      }
      state.value.cartId = res.data.id;
      state.value.cartProduct = res.data.items;
    }, (err) => {
      console.log(err.response.data)
        state.value.userAccessKey = null
    })
  };

  return {
    state,
    addProductToCart,
    cartTotalPrice,
    deleteProduct,
    updateUserAccessKey,
    loadBasket,
    updateCartProductQuantity,
  };
});

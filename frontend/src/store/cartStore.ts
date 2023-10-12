import { defineStore } from "pinia";
import { computed, ref } from "vue";
import apiDataService from "@/services/apiDataService.ts";
import ResponseData from "@/types/ResponseData.ts";
import OrderInfo from "@/types/OrderInfo.ts";
import CartProducts from "@/types/CartProducts.ts";

export const cartStore = defineStore("cartStore", () => {
  const state = ref({
    cartProduct: [] as CartProducts[],
    totalPrice: 0 as number,
    userAccessKey: null as string | null,
    cartId: 0 as number,
    orderInfo: {} as OrderInfo,
  });

  // mutations
  const syncCart = computed(() => {
    return state.value.cartProduct;
  });
  const updateOrderInfo = (orderData: any) => {
    state.value.orderInfo = orderData;
  };
  const updateUserAccessKey = (accessKey: string) => {
    state.value.userAccessKey = accessKey;
  };
  const resetCart = () => {
    state.value.cartProduct = [];
    state.value.cartId = 0;
  };

  // getters
  const cartTotalPrice = () => {
    return syncCart.value.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0,
    );
  };
  const cartTotalQuantity = () => {
    return syncCart.value.reduce((acc, item) => item.quantity + acc, 0)
  }
  const updateCartProductQuantity = (productId: number, amount: number) => {
    const item = syncCart.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = amount;
    }

    if (amount < 1) {
      return;
    }
    return apiDataService.changeProductQuantity(
      productId,
      amount,
      state.value.userAccessKey,
    );
  };

  // actions

  const addProductToCart = (productId: number, amount: number) => {
    apiDataService
      .addProductToBasket(productId, amount, state.value.userAccessKey)
      .then(() => loadBasket(state.value.userAccessKey));
  };
  const deleteProduct = (productId: number) => {
    apiDataService
      .deleteProduct(productId, state.value.userAccessKey)
      .then(() => loadBasket(state.value.userAccessKey));
  };
  const loadBasket = (accessKey: string | null = null) => {
    apiDataService.getBasket(accessKey).then(
      (res) => {
        if (!state.value.userAccessKey) {
          localStorage.setItem("userAccessKeyAroma", res.data.user.accessKey);
          updateUserAccessKey(res.data.user.accessKey);
        }
        state.value.cartId = res.data.id;
        state.value.cartProduct = res.data.items;
      },
      (err) => {
        console.log(err.response.data);
        state.value.userAccessKey = null;
        loadBasket();
      },
    );
  };
  const loadOrderInfo = (orderId: number) => {
    apiDataService.getOrderById(orderId).then((res: ResponseData) => {
      updateOrderInfo(res.data);
    });
  };

  return {
    state,
    addProductToCart,
    cartTotalPrice,
    cartTotalQuantity,
    deleteProduct,
    updateUserAccessKey,
    loadBasket,
    updateCartProductQuantity,
    updateOrderInfo,
    resetCart,
    loadOrderInfo,
  };
});

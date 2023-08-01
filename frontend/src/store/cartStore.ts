import { defineStore } from "pinia";
import {ref} from "vue";


export const cartStore = defineStore('cartStore', () => {
  const state = ref({
    cartProduct: []
  })
  
  const addProductToCart = (productId) => {
    
  }
})

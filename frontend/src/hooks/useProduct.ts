import {ref} from "vue";
import axios from "axios";
import {API_URL} from "../constans/api.ts";


export default function () {
  const productData = ref(null)
  
  const fetchProduct = (productId: number) => {
    axios.get(API_URL + '/product/?id=' + productId)
      .then(res => {
        const product = res.data
        productData.value = Object.assign(product)
      })
  }
  
  return {
    product: productData,
    fetchProduct
  }
}

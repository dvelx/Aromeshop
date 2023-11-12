import ServerApi from './api.js'

const api = new ServerApi('http://localhost:3000')

document.addEventListener('DOMContentLoaded', async () => {
  const products = await api.getProducts()
  console.log('products: ', products)

  const brands = await api.getBrands()
  console.log('brands: ', brands)

  const categories = await api.getCategories()
  console.log('categories: ', categories)
})

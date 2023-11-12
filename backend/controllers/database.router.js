import express from 'express'

// import { getHtml, sendOrderEmail } from '../email/order-email.js'
import DatabaseController from './database.controller.js'
import checkRequestParams from '../check-request-params.js'

const router = express.Router()
router.use(express.json())

/* Получение списка категорий */
router.route('/categories').get(async (request, response) => {
  try {
    const categories = await DatabaseController.getCategories()
    response.status(200).json(categories)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Получение списка производителей */
router.route('/brands').get(async (request, response) => {
  try {
    const brands = await DatabaseController.getBrands()
    response.status(200).json(brands)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Получение списка товаров */
router.route('/products').get(async (request, response) => {
  try {
    const { limit, page, sortBy, order, priceFrom, priceTo } = request.query

    const error = await checkRequestParams({ limit, page, sortBy, order, priceFrom, priceTo })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const products = await DatabaseController.getProducts({
      limit,
      page,
      sortBy,
      order,
      priceFrom,
      priceTo
    })

    response.status(200).json(products)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Получение товара по id */
router.route('/products/:id').get(async (request, response) => {
  try {
    const productId = request.params.id

    const product = await DatabaseController.getProductById(productId)
    response.status(200).json(product)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Создание категории */
router.route('/category').post(async (request, response) => {
  try {
    const { title, image } = request.body

    const category = await DatabaseController.addCategory({ title, image })
    response.status(200).json(category)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Создание продукта */
router.route('/product').post(async (request, response) => {
  try {
    const { title, image, description, price } = request.body

    const product = await DatabaseController.addProduct({
      title,
      image,
      description,
      price
    }
    )
    response.status(200).json(product)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Создание пользователя */
router.route('/users/accessKey').get(async (request, response) => {
  try {
    const user = await DatabaseController.addUser()
    response.status(200).json(user)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Получение корзины */
router.route('/baskets').get(async (request, response) => {
  try {
    const { accessKey } = request.query

    const cart = await DatabaseController.getCart(accessKey)

    response.status(200).json(cart)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Добавление в корзину */
router.route('/baskets').post(async (request, response) => {
  try {
    const { productId, quantity } = request.body

    const { accessKey } = request.query
    const error = await checkRequestParams({ productId, quantity, accessKey })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await DatabaseController.getCart(accessKey)

    await DatabaseController.addProductToCart({
      cartId: cart.id,
      productId,
      quantity
    })

    const result = await DatabaseController.getCart(accessKey)

    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Изменение количества товара в корзине */
router.route('/baskets').put(async (request, response) => {
  try {
    const { productId, quantity } = request.body
    const { accessKey } = request.query

    const error = await checkRequestParams({ productId, quantity, accessKey })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await DatabaseController.getCart(accessKey)

    await DatabaseController.setProductQuantity({
      cartId: cart.id,
      productId,
      quantity
    })

    const result = await DatabaseController.getCart(accessKey)
    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Удаление товара из корзины */
router.route('/baskets').delete(async (request, response) => {
  try {
    const { productId } = request.body
    const { accessKey } = request.query

    const error = await checkRequestParams({ productId, accessKey })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await DatabaseController.getCart(accessKey)

    await DatabaseController.deleteProductFromCart({
      cartId: cart.id,
      productId
    })

    const result = await DatabaseController.getCart(accessKey)

    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Оформление заказа */
router.route('/orders').post(async (request, response) => {
  try {
    const { name, address, phone, email, comment } = request.body
    const { accessKey } = request.query
    const error = await checkRequestParams({ accessKey, name, address, phone, email, comment })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await DatabaseController.getCart(accessKey)

    const lastOrderId = await DatabaseController.makeOrder(
      { name, address, phone, email, comment },
      cart
    )

    const result = await DatabaseController.getOrderById(lastOrderId)

    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Получение заказа по id */
router.route('/orders/:id').get(async (request, response) => {
  try {
    const orderId = request.params.id
    const order = await DatabaseController.getOrderById(orderId)
    if (!order) {
      response.status(400).send({ error: 'Order not found!' })
      return
    }

    response.status(200).json(order)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

export default router

import express from 'express'

// import { getHtml, sendOrderEmail } from '../email/order-email.js'
import DatabaseController from '../../controllers/database.controller.js'
import checkRequestParams from '../../check-request-params.js'

import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import getBrands from './getBrands.js'
import getCategories from './getCategories.js'
import getProducts from './getProducts.js'
import getProductsById from './getProductsById.js'
import postCategory from './postCategory.js'
import postProduct from './postProduct.js'
import getBaskets from './getBaskets.js'

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'AromaHome API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'AromaHome',
        url: 'https://github.com/dvelx/Aromeshop',
        email: 'info@email.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/api/*.js']
}

const specs = swaggerJsdoc(options)

const api = express.Router()
api.use(express.json())
api.use(
  bodyParser.urlencoded({
    extended: true
  })
)

api.use(bodyParser.json())
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

api.get('/baskets', getBaskets)
api.get('/brands', getBrands)
api.get('/categories', getCategories)
api.get('/products', getProducts)
api.get('/products/:id', getProductsById)
api.post('/category', postCategory)
api.post('/product', postProduct)

/* Создание пользователя */
api.route('/users/accessKey').get(async (request, response) => {
  try {
    const user = await DatabaseController.addUser()
    response.status(200).json(user)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
})

/* Добавление в корзину */
api.route('/baskets').post(async (request, response) => {
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
api.route('/baskets').put(async (request, response) => {
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
api.route('/baskets').delete(async (request, response) => {
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
api.route('/orders').post(async (request, response) => {
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
api.route('/orders/:id').get(async (request, response) => {
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

export default api

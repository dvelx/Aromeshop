import express from 'express'

import usersRouter from '../users/index.js'

//import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '../../config.js'

import getBrands from './getBrands.js'
import getCategories from './getCategories.js'
import getProducts from './getProducts.js'
import getProductsById from './getProductsById.js'
import postCategory from './postCategory.js'
import postProduct from './postProduct.js'
import getBaskets from './getBaskets.js'
import postBaskets from './postBaskets.js'
import putBaskets from './putBaskets.js'
import deleteBaskets from './deleteBaskets.js'
import postOrders from './postOrders.js'
import getOrdersId from './getOrdersId.js'

import swaggerFile from '../../config/swagger-output.json' assert {type: 'json'}
// const options = {
//   definition: {
//     openapi: '3.1.0',
//     info: {
//       title: 'AromaHome API with Swagger',
//       version: '0.1.0',
//       description:
//         'This is a simple CRUD API application made with Express and documented with Swagger',
//       contact: {
//         name: 'Dmitriy Goff',
//         url: 'https://github.com/dvelx/Aromeshop',
//         email: 'goffdmitriy@gmail.com'
//       }
//     },
//     servers: [
//       {
//         url: `http://${config.hostname}:${config.port}`
//       }
//     ]
//   },
//   apis: ['./routes/api/*.js']
// }

// const specs = swaggerJsdoc(options)

const api = express.Router()
api.use(express.json())

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
api.use('/users', usersRouter)

api.get('/baskets', getBaskets)
api.get('/brands', getBrands)
api.get('/categories', getCategories)
api.get('/products', getProducts)
api.get('/products/:id', getProductsById)
api.get('/orders/:id', getOrdersId)
api.post('/category', postCategory)
api.post('/product', postProduct)
api.post('/baskets', postBaskets)
api.post('/orders', postOrders)
api.put('/baskets', putBaskets)
api.delete('/baskets', deleteBaskets)

export default api

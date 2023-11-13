import databaseController from '../../controllers/database.controller.js'
import checkRequestParams from '../../check-request-params.js'

export default async (request, response) => {
  try {
    const { productId, quantity } = request.body

    const { accessKey } = request.query
    const error = await checkRequestParams({ productId, quantity, accessKey })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await databaseController.getCart(accessKey)

    await databaseController.addProductToCart({
      cartId: cart.id,
      productId,
      quantity
    })

    const result = await databaseController.getCart(accessKey)

    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

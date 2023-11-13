import databaseController from '../../controllers/database.controller.js'
import checkRequestParams from '../../check-request-params.js'
// import { getHtml, sendOrderEmail } from '../email/order-email.js'

export default async (request, response) => {
  try {
    const { name, address, phone, email, comment } = request.body
    const { accessKey } = request.query
    const error = await checkRequestParams({ accessKey, name, address, phone, email, comment })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const cart = await databaseController.getCart(accessKey)

    const lastOrderId = await databaseController.makeOrder(
      { name, address, phone, email, comment },
      cart
    )

    const result = await databaseController.getOrderById(lastOrderId)

    response.status(200).json(result)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

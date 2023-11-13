import databaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
  try {
    const orderId = request.params.id
    const order = await databaseController.getOrderById(orderId)
    if (!order) {
      response.status(400).send({ error: 'Order not found!' })
      return
    }

    response.status(200).json(order)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

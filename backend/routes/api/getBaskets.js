import databaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
  try {
    const { accessKey } = request.query

    const cart = await databaseController.getCart(accessKey)

    response.status(200).json(cart)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

import DatabaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
  try {
    const productId = request.params.id

    const product = await DatabaseController.getProductById(productId)
    response.status(200).json(product)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

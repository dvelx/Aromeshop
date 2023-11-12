import DatabaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
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
}

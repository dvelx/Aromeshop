import databaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
  try {
    const { title, image } = request.body

    const category = await databaseController.addCategory({ title, image })
    response.status(200).json(category)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

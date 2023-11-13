import databaseController from '../../controllers/database.controller.js'

export default async (request, response) => {
  try {
    const user = await databaseController.addUser()
    response.status(200).json(user)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

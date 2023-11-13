import databaseController from '../../controllers/database.controller.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Идентификатор категории
 *         title:
 *           type: string
 *           description: Название категории
 *         slug:
 *           type: string
 *           description: slug для использования в URL
 *         image:
 *           type: string
 *           description: URL картинки с логотипом
 *       example:
 *         id: 1
 *         title: Для дома
 *         slug: dlja-doma
 *         image: null
 */

/**
 * @swagger
 * tags:
 *   name: categories
 *   description: list of product categories
 * /api/categories:
 *   get:
 *     summary: Lists all the categories
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: Список категорий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Внутренняя ошибка сервера
 */

export default async (request, response) => {
  try {
    const categories = await databaseController.getCategories()
    response.status(200).json(categories)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

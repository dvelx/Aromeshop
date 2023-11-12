import DatabaseController from '../../controllers/database.controller.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Идентификатор бренда
 *         title:
 *           type: string
 *           description: Название бренда
 *         slug:
 *           type: string
 *           description: slug для использования в URL
 *         image:
 *           type: string
 *           description: URL картинки с логотипом
 *         productsCount:
 *           type: number
 *           description: Количество продуктов
 *       example:
 *         id: 1
 *         title: MR&MRS FRAGRANCE
 *         slug: mrmrs-fragrance
 *         image: null
 *         productsCount: 10
 */

/**
 * @swagger
 * tags:
 *   name: brands
 *   description: list of product brands
 * /api/brands:
 *   get:
 *     summary: Lists all the brands
 *     tags: [brands]
 *     responses:
 *       200:
 *         description: Список брендов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Внутренняя ошибка сервера
 */

export default async (request, response) => {
  try {
    const brands = await DatabaseController.getBrands()
    response.status(200).json(brands)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

import DatabaseController from '../../controllers/database.controller.js'
import checkRequestParams from '../../check-request-params.js'

export default async (request, response) => {
  try {
    const { limit, page, sortBy, order, priceFrom, priceTo } = request.query

    const error = await checkRequestParams({ limit, page, sortBy, order, priceFrom, priceTo })

    if (Object.keys(error).length > 0) {
      response.status(400).send({ error })
      return
    }

    const products = await DatabaseController.getProducts({
      limit,
      page,
      sortBy,
      order,
      priceFrom,
      priceTo
    })

    response.status(200).json(products)
  } catch (e) {
    response.status(500).json({ error: 'Internal server error', message: e })
  }
}

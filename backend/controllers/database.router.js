import exprepress from "express";

import { getHtml, sendOrderEmail } from "../email/order-email.js";
import DatabaseController from "./database.controller.js";
import checkRequestParams from "../check-request-params.js";

const router = exprepress.Router();
router.use(exprepress.json());

function getRequestHostUrl(request) {
  return `${request.protocol}://${request.get("host")}/`;
}

async function sendResponse(response, data) {
  try {
    // если в ответе есть ошибка, меняем статус
    if (data?.error) response.statusCode = 400;

    response.json(data);
  } catch (error) {
    console.log(error);
  }
}

/* Получение списка категорий */
router.route("/categories").get(async (request, response) => {
  const categories = await DatabaseController.getCategories();
  sendResponse(response, categories);
});

/* Получение списка производителей */
router.route("/brands").get(async (request, response) => {
  const brands = await DatabaseController.getBrands();
  sendResponse(response, brands);
});

/* Получение списка товаров */
router.route("/products").get(async (request, response) => {

  let { limit, page, sortBy, order, priceFrom, priceTo } = request.query;

  let error = {};

  if (priceFrom && isNaN(priceFrom)) {
    error = { ...error, priceFrom: "priceFrom is not a number" };
  }
  if (priceTo && isNaN(priceTo)) {
    error = { ...error, priceTo: "priceTo is not a number" };
  }
  if (order && order != "asc" && order != "desc") {
    error = { ...error, order: "order can be only 'asc' or 'desc'" };
  }
  if (sortBy && sortBy != "price" && sortBy != "name" && sortBy != "id") {
    error = { ...error, sortBy: "order can be only 'asc' or 'desc'" };
  }

  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }

  const products = await DatabaseController.getProducts({
    limit,
    page,
    sortBy,
    order,
    priceFrom,
    priceTo,
  });
  sendResponse(response, products);
});

/* Получение товара по id */
router.route("/products/:id").get(async (request, response) => {

  const productId = request.params.id;

  const product = await DatabaseController.getProductById(productId);
  sendResponse(response, product);
});

/* Создание категории */
router.route("/category").post(async (request, response) => {
  const { title, image } = request.body;

  const category = await DatabaseController.addCategory({ title, image });
  sendResponse(response, category);
});

/* Создание продукта */
router.route("/product").post(async (request, response) => {
  const { title, image, description, price } = request.body;

  const product = await DatabaseController.addProduct(
    title,
    image,
    description,
    price
  );
  sendResponse(response, product);
});

/* Создание пользователя */
router.route("/users/accessKey").get(async (request, response) => {
  const user = await DatabaseController.addUser();
  sendResponse(response, user);
});

/* Получение корзины */
router.route("/baskets").get(async (request, response) => {
  const { accessKey } = request.query;

  const cart = await DatabaseController.getCart(accessKey);

  sendResponse(response, cart);
});

/* Добавление в корзину */
router.route("/baskets").post(async (request, response) => {
  
  const { productId, quantity } = request.body;
  
  const { accessKey } = request.query;
  const error = await checkRequestParams({productId, quantity, accessKey})

  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } 
  
  let cart = await DatabaseController.getCart(accessKey);
  
  await DatabaseController.addProductToCart({
    cartId: cart.id,
    productId,
    quantity,
  });
  
  const result = await DatabaseController.getCart(accessKey);
  
  sendResponse(response, result);
});

/* Изменение количества товара в корзине */
router.route("/baskets").put(async (request, response) => {
  const { productId, quantity } = request.body;
  const { accessKey } = request.query;

  let error = await checkRequestParams({productId, quantity, accessKey})
  
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }

  let cart = await DatabaseController.getCart(accessKey);

  await DatabaseController.setProductQuantity({
    cartId: cart.id,
    productId,
    quantity,
  });

  const result = await DatabaseController.getCart(accessKey);
  
  sendResponse(response, result);
  
});

/* Удаление товара из корзины */
router.route("/baskets").delete(async (request, response) => {
  const { productId } = request.body;
  const { accessKey } = request.query;

  const error = await checkRequestParams({productId, accessKey})
  
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }

  const cart = await DatabaseController.getCart(accessKey);

  await DatabaseController.deleteProductFromCart({
    cartId: cart.id,
    productId,
  });
  
  
  const result = await DatabaseController.getCart( accessKey);

  sendResponse(response, result);
});

/* Оформление заказа */
router.route("/orders").post(async (request, response) => {
  let { name, address, phone, email, comment } = request.body;
  const { accessKey } = request.query;
  const error = await checkRequestParams({accessKey, name, address, phone, email, comment});
  
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }
  
  const cart = await DatabaseController.getCart(accessKey);

  const lastOrderId = await DatabaseController.makeOrder(
    { name, address, phone, email, comment },
    cart
  );

  const result = await DatabaseController.getOrderById(lastOrderId);

  sendResponse(response,result);
});

/* Получение заказа по id */
router.route("/orders/:id").get(async (request, response) => {
  const orderId = request.params.id;
  const order = await DatabaseController.getOrderById(orderId);
  if (!order) {
    sendResponse(response, { error: "Order not found!" });
    return;
  }
  sendResponse(response, order);
});

export default router;

import express from "express";

import { getHtml, sendOrderEmail } from "../email/order-email.js";
import DatabaseController from "./database.controller.js";
import checkRequestParams from "../check-request-params.js";

const router = express.Router();
router.use(express.json());

/* Получение списка категорий */
router.route("/categories").get(async (request, response) => {
  const categories = await DatabaseController.getCategories();
  response.status(200).json(categories);
});

/* Получение списка производителей */
router.route("/brands").get(async (request, response) => {
  const brands = await DatabaseController.getBrands();
  response.status(200).json(brands);
});

/* Получение списка товаров */
router.route("/products").get(async (request, response) => {

  const { limit, page, sortBy, order, priceFrom, priceTo } = request.query;

  const error = await checkRequestParams({ limit, page, sortBy, order, priceFrom, priceTo });

  if (Object.keys(error).length > 0) {
    response.status(400).send({error});
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

  response.status(200).json(products);
});

/* Получение товара по id */
router.route("/products/:id").get(async (request, response) => {

  const productId = request.params.id;

  const product = await DatabaseController.getProductById(productId);
  response.status(200).json(product);
});

/* Создание категории */
router.route("/category").post(async (request, response) => {
  const { title, image } = request.body;

  const category = await DatabaseController.addCategory({ title, image });
  response.status(200).json(category);
});

/* Создание продукта */
router.route("/product").post(async (request, response) => {
  const { title, image, description, price } = request.body;

  const product = await DatabaseController.addProduct({
    title,
    image,
    description,
    price
  }
  );
  response.status(200).json(product);
});

/* Создание пользователя */
router.route("/users/accessKey").get(async (request, response) => {
  const user = await DatabaseController.addUser();
  response.status(200).json(user);
});

/* Получение корзины */
router.route("/baskets").get(async (request, response) => {
  const { accessKey } = request.query;

  const cart = await DatabaseController.getCart(accessKey);

  response.status(200).json(cart);
});

/* Добавление в корзину */
router.route("/baskets").post(async (request, response) => {
  
  const { productId, quantity } = request.body;
  
  const { accessKey } = request.query;
  const error = await checkRequestParams({productId, quantity, accessKey});

  if (Object.keys(error).length > 0) {
    response.status(400).send({error});
    return;
  } 
  
  let cart = await DatabaseController.getCart(accessKey);
  
  await DatabaseController.addProductToCart({
    cartId: cart.id,
    productId,
    quantity,
  });
  
  const result = await DatabaseController.getCart(accessKey);
  
  response.status(200).json(result);
});

/* Изменение количества товара в корзине */
router.route("/baskets").put(async (request, response) => {
  const { productId, quantity } = request.body;
  const { accessKey } = request.query;

  const error = await checkRequestParams({productId, quantity, accessKey})
  
  if (Object.keys(error).length > 0) {
    response.status(400).send({ error });
    return;
  }

  const cart = await DatabaseController.getCart(accessKey);

  await DatabaseController.setProductQuantity({
    cartId: cart.id,
    productId,
    quantity,
  });

  const result = await DatabaseController.getCart(accessKey);
  response.status(200).json(result);
  
});

/* Удаление товара из корзины */
router.route("/baskets").delete(async (request, response) => {
  const { productId } = request.body;
  const { accessKey } = request.query;

  const error = await checkRequestParams({productId, accessKey})
  
  if (Object.keys(error).length > 0) {
    response.status(400).send({ error });
    return;
  }

  const cart = await DatabaseController.getCart(accessKey);

  await DatabaseController.deleteProductFromCart({
    cartId: cart.id,
    productId,
  });
  
  
  const result = await DatabaseController.getCart( accessKey);

  response.status(200).json(result);
});

/* Оформление заказа */
router.route("/orders").post(async (request, response) => {
  const { name, address, phone, email, comment } = request.body;
  const { accessKey } = request.query;
  const error = await checkRequestParams({accessKey, name, address, phone, email, comment});
  
  if (Object.keys(error).length > 0) {
    response.status(400).send({ error });
    return;
  }
  
  const cart = await DatabaseController.getCart(accessKey);

  const lastOrderId = await DatabaseController.makeOrder(
    { name, address, phone, email, comment },
    cart
  );

  const result = await DatabaseController.getOrderById(lastOrderId);

  response.status(200).json(result);
});

/* Получение заказа по id */
router.route("/orders/:id").get(async (request, response) => {
  try {
    const orderId = request.params.id;
    const order = await DatabaseController.getOrderById(orderId);
    hjg = 6;

    if (!order) {
      response.status(400).send({ error: "Order not found!" });
      return;
    }

    response.status(200).json(order);
  }
  catch (err) {
    response.status(500).json({ error: "Internal server error", message: err });
  }
  
});

export default router;

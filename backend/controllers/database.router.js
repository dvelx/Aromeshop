import exprepress, { json, request, response } from "express";

import { getHtml, sendOrderEmail } from "../email/order-email.js";
import DatabaseController from "./database.controller.js";

const router = exprepress.Router();
router.use(exprepress.json());

function getRequestHostUrl(request) {
  return `${request.protocol}://${request.get("host")}/`;
}

async function sendResponse(response, data) {
  try {
    // const data = await data();

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
  if (!accessKey) {
    sendResponse(response, { error: "accessKey required" });
    return;
  }
  const hostname = getRequestHostUrl(request);

  let error = {};
  let result = {};
  let cart = await DatabaseController.getCart(accessKey);
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };
  if (!quantity) error = { ...error, quantity: "quantity undefined" };
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else {
    await DatabaseController.addProductToCart({
      cartId: cart.id,
      productId,
      quantity,
    });
    result = await DatabaseController.getCart(accessKey);
  }
  sendResponse(response, result);
});

/* Изменение количества товара в корзине */
router.route("/baskets").put(async (request, response) => {
  const { productId, quantity } = request.body;
  const { accessKey } = request.query;
  if (!accessKey) {
    sendResponse(response, { error: "accessKey required" });
    return;
  }
  let error = {};
  let result = {};
  const hostname = getRequestHostUrl(request);
  let cart = await DatabaseController.getCart(accessKey);
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };
  if (!quantity) error = { ...error, quantity: "quantity undefined" };
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else {
    await DatabaseController.setProductQuantity({
      cartId: cart.id,
      productId,
      quantity,
    });
    result = await DatabaseController.getCart(accessKey);
    sendResponse(response, result);
  }
});

/* Удаление товара из корзины */
router.route("/baskets").delete(async (request, response) => {
  const { productId } = request.body;
  const { accessKey } = request.query;
  if (!accessKey) {
    sendResponse(response, { error: "accessKey required" });
    return;
  }
  let error = {};
  let result = {};
  
  let cart = await DatabaseController.getCart(accessKey);
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };

  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else
    await DatabaseController.deleteProductFromCart({
      cartId: cart.id,
      productId,
    });
  result = await DatabaseController.getCart( accessKey);
  sendResponse(response, result);
});

/* Оформление заказа */
router.route("/orders").post(async (request, response) => {
  let { name, address, phone, email, comment } = request.body;
  const { accessKey } = request.query;
  const phoneRegex =
    /^(?:\+?\d{1,3})(?:\(?\d{3}\)[-\s]{0,}\d{3}[-\s]{0,}\d{2}[-\s]{0,}\d{2})$/;

  const emailRegex =
    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
  let error = {};
  if (!accessKey) {
    error = { error: "accessKey required" };
  } else {
    // check accessKey...
    if (!name) {
      error = { ...error, name: "Name required" };
    }

    if (!address) {
      error = { ...error, address: "address required" };
    }
    if (!phone) {
      error = { ...error, phone: "phone required" };
    } else if (!phoneRegex.test(phone) || phone.length > 20) {
      error = { ...error, phone: "invalid phone format" };
    }
    if (!email) {
      error = { ...error, email: "email required" };
    } else if (!emailRegex.test(email) || email.length > 50) {
      error = { ...error, email: "invalid email format" };
    }
    if (!comment) {
      comment = "";
    }
  }
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }
  
  const cart = await DatabaseController.getCart(accessKey);
  let result = {};
  let lastOrderId;

  if (cart) {
    lastOrderId = await DatabaseController.makeOrder(
      { name, address, phone, email, comment },
      cart
    );

    const items = await DatabaseController.getOrderItems(lastOrderId);

    const total = items
      .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
      .toFixed(2);
    result = { ...result, items, total };
    // sendOrderEmail({ order: result, hostname });
  } else {
    result = { error: "Wrong accessKey" };
  }
  sendResponse(response, result);
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
//   const items = await database.getOrderItems(orderId);
//   for (let i = 0; i < items.length; i++) {
//     const product = await database.getProductById(
//       items[i]["product_id"],
//       hostname
//     );
//     items[i] = { ...items[i], product };
//   }
//   const total = items
//     .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
//     .toFixed(2);

//   const result = { ...order, items, total };
//   sendResponse(response, result);
// });

export default router;

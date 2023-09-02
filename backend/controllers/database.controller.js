import exprepress, { json, request, response } from "express";
import Database from "../database.js";
import slugify from "slugify";
import { hostname } from "os";

const database = new Database();
database.connect();

const router = exprepress.Router();
router.use(exprepress.json());

// параметры для slugify
const slugParams = {
  locale: "ru",
  lower: true,
  strict: true,
};

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
  sendResponse(response, await database.getCategories());
});

/* Получение списка производителей */
router.route("/brands").get(async (request, response) => {
  sendResponse(response, await database.getBrands());
});

/* Получение списка товаров */
router.route("/products").get(async (request, response) => {
  const hostname = getRequestHostUrl(request);
  const { limit, page } = request.query;
  sendResponse(response, await database.getProducts(hostname, { limit, page }));
});

/* Получение товара по id */
router.route("/product/:id").get(async (request, response) => {
  const hostname = getRequestHostUrl(request);
  const productId = request.params.id;

  sendResponse(response, await database.getProductById(productId, hostname));
});

/* Создание категории */
router.route("/category").post(async (request, response) => {
  const { title, image } = request.body;

  sendResponse(
    response,
    await database.addCategory(title, slugify(title, slugParams), image)
  );
});

/* Создание продукта */
router.route("/product").post(async (request, response) => {
  const { title, image, description, price } = request.body;

  sendResponse(
    response,
    await database.addProduct(
      title,
      slugify(title, slugParams),
      image,
      description,
      price
    )
  );
});

/* Создание пользователя */
router.route("/users/accessKey").get(async (request, response) => {
  sendResponse(response, await database.addUser());
});

/* Получение корзины */
router.route("/baskets").get(async (request, response) => {
  const hostname = getRequestHostUrl(request);
  const { accessKey } = request.query;
  if (!accessKey) {
    sendResponse(response, { error: "accessKey required" });
    return;
  }
  let result = await database.getCart({ accessKey, hostname });
  if (!result) result = { error: "Wrong accessKey" };

  sendResponse(response, result);
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
  let cart = await database.getCart({ accessKey, hostname });
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };
  if (!quantity) error = { ...error, quantity: "quantity undefined" };
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else {
    await database.addProductToCart({ cartId: cart.id, productId, quantity });
    result = await database.getCart({ accessKey, hostname });
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
  let cart = await database.getCart({ accessKey, hostname });
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };
  if (!quantity) error = { ...error, quantity: "quantity undefined" };
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else {
    await database.setProductQuantity({
      cartId: cart.id,
      productId,
      quantity,
    });
    result = await database.getCart({ accessKey, hostname });
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
  const hostname = getRequestHostUrl(request);
  let cart = await database.getCart({ accessKey, hostname });
  if (!cart) error = { ...error, accessKey: "Wrong accessKey" };
  if (!productId) error = { ...error, productId: "productId required" };

  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  } else await database.deleteProductFromCart({ cartId: cart.id, productId });
  result = await database.getCart({ accessKey, hostname });
  sendResponse(response, result);
});

router.route("/orders").post(async (request, response) => {
  let { name, address, phone, email, comment } = request.body;
  const { accessKey } = request.query;

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
    }
    if (!email) {
      error = { ...error, email: "email required" };
    }
    if (!comment) {
      comment = "";
    }
  }
  if (Object.keys(error).length > 0) {
    sendResponse(response, { error });
    return;
  }
  const hostname = getRequestHostUrl(request);
  const cart = await database.getCart({ hostname, accessKey });
  let result = {};
  let lastOrder;

  if (cart) {
    database.db.beginTransaction();

    try {
      await database.makeOrder({
        name,
        address,
        phone,
        email,
        comment,
      });
      [lastOrder] = await database.getLastInsertedOrder();

      cart.items.forEach(async (item) => {
        const product = await database.getProductById(item.id);
        await database.addOrderItem({
          orderId: lastOrder.id,
          productId: product.id,
          productTitle: product.title,
          quantity: item.quantity,
          price: product.price,
        });
      });
      await database.deleteCartById(cart.id);
      database.db.commit();
      result = lastOrder;
    } catch (error) {
      console.log(error);
      database.db.rollback();
    }
    const items = await database.getOrderItems(lastOrder.id);
    for (let i = 0; i < items.length; i++) {
      const product = await database.getProductById(items[i]["product_id"]);
      items[i] = { ...items[i], product };
    }

    const total = items
      .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
      .toFixed(2);
    result = { ...result, items, total };
  } else {
    result = { error: "Wrong accessKey" };
  }
  sendResponse(response, result);
});

router.route("/order/:id").get(async (request, response) => {
  const orderId = request.params.id;
  const [order] = await database.getOrderById(orderId);
  const hostname = getRequestHostUrl(request);
  if (!order) {
    sendResponse(response, { error: "Order not found!" });
    return;
  }

  const items = await database.getOrderItems(orderId);
  for (let i = 0; i < items.length; i++) {
    const product = await database.getProductById(
      items[i]["product_id"],
      hostname
    );
    items[i] = { ...items[i], product };
  }
  const total = items
    .reduce((acc, item) => acc + parseFloat(item.price * item.quantity), 0)
    .toFixed(2);

  const result = { ...order, items, total };
  sendResponse(response, result);
});
export default router;

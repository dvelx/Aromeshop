import exprepress, { json, request, response } from "express";
import Database from "../database.js";
import slugify from "slugify";

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

async function sendResponse(response, callback) {
  try {
    const data = await callback();

    // если в ответе есть ошибка, меняем статус
    if (data?.error) response.statusCode = 400;

    response.json(data);
  } catch (error) {
    console.log(error);
  }
}

/* Получение списка категорий */
router.route("/categories").get((request, response) => {
  sendResponse(response, () => {
    return database.getCategories();
  });
});

/* Получение списка производителей */
router.route("/brands").get((request, response) => {
  sendResponse(response, () => {
    return database.getBrands();
  });
});

/* Получение списка товаров */
router.route("/products").get((request, response) => {
  const hostname = getRequestHostUrl(request);
  const { limit, page } = request.query;
  sendResponse(response, () => {
    return database.getProducts(hostname, { limit, page });
  });
});

/* Получение товара по id */
router.route("/product/:id").get((request, response) => {
  const hostname = getRequestHostUrl(request);
  const productId = request.params.id;
  console.log("id: ", productId);
  sendResponse(response, () => {
    return database.getProductById(productId, hostname);
  });
});

/* Создание категории */
router.route("/category").post((request, response) => {
  const { title, image } = request.body;

  sendResponse(response, () => {
    return database.addCategory(title, slugify(title, slugParams), image);
  });
});

/* Создание продукта */
router.route("/product").post((request, response) => {
  const { title, image, description, price } = request.body;

  sendResponse(response, () => {
    return database.addProduct(
      title,
      slugify(title, slugParams),
      image,
      description,
      price
    );
  });
});

/* Создание пользователя */
router.route("/users/accessKey").get(async (request, response) => {
  sendResponse(response, () => {
    return database.addUser();
  });
});

/* Получение корзины */
router.route("/baskets").get(async (request, response) => {
  sendResponse(response, () => {
    const hostname = getRequestHostUrl(request);
    const { accessKey } = request.query;
    return database.getCart({ accessKey, hostname });
  });
});

/* Добавление в корзину */
router.route("/baskets").post((request, response) => {
  sendResponse(response, () => {
    const { cartId, productId, quantity } = request.body;
    return database.addProductToCart({ cartId, productId, quantity });
  });
});

/* Изменение количества товара в корзине */
router.route("/baskets").put((request, response) => {
  const { cartId, productId, quantity } = request.body;
  if (!cartId)
    sendResponse(response, () => {
      return { error: "cartId undefined" };
    });
  else if (!productId)
    sendResponse(response, () => {
      return { error: "productId undefined" };
    });
  else if (!quantity)
    sendResponse(response, () => {
      return { error: "quantity undefined" };
    });
  else
    sendResponse(response, () => {
      return database.setProductQuantity({ cartId, productId, quantity });
    });
});

/* Удаление товара из корзины */
router.route("/baskets").delete((request, response) => {
  const { cartId, productId } = request.body;
  if (!cartId)
    sendResponse(response, () => {
      return { error: "cartId undefined" };
    });
  else if (!productId)
    sendResponse(response, () => {
      return { error: "productId undefined" };
    });
  else
    sendResponse(response, () => {
      return database.deleteProductFromCart({ cartId, productId });
    });
});

export default router;

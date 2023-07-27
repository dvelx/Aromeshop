import exprepress, { response } from "express";
import Database from "../database.js";
import slugify from "slugify";

const database = new Database();
database.connect();

const router = exprepress.Router();
router.use(exprepress.json());
router.get("/", (req, res) => {
  res.send("api...");
});

// параметры для slugify
const slugParams = {
  locale: "ru",
  lower: true,
  strict: true,
};

function getRequestHostUrl(request) {
  return `${request.protocol}://${request.get("host")}/`;
}
/* Получение списка категорий */
router.route("/categories").get((request, response) => {
  const result = database.getCategories();
  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

/* Получение списка товаров */
router.route("/products").get((request, response) => {
  const hostname = getRequestHostUrl(request);
  const result = database.getProducts(hostname);
  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

/* Получение товара по id */
router.route("/product").get((request, response) => {
  const hostname = getRequestHostUrl(request);
  const productId = request.query.id;
  const result = database.getProductById(productId, hostname);
  result.then((data) => response.json(data)).catch((err) => console.log(err));
});
/* Создание категории */
router.route("/category").post((request, response) => {
  const { title, image } = request.body;

  // запрос к БД
  const result = database.addCategory(title, slugify(title, slugParams), image);

  result
    .then((data) => {
      // если в ответе есть ошибка, меняем статус
      if (data.error) response.statusCode = 400;

      response.json(data);
    })
    .catch((err) => console.log(err));
});

/* Создание продукта */
router.route("/product").post((request, response) => {
  const { title, image, description, price } = request.body;

  // запрос к БД
  const result = database.addProduct(
    title,
    slugify(title, slugParams),
    image,
    description,
    price
  );

  result
    .then((data) => {
      // если в ответе есть ошибка, меняем статус
      if (data.error) response.statusCode = 400;

      response.json(data);
    })
    .catch((err) => console.log(err));
});

export default router;

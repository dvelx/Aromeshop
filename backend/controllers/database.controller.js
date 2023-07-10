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

/* Создание базы данных */
router.get("/createdb", (req, res) => {
  database.dropDatabase();
  database.createDatabase();
  res.send(`Database \`${database.db_name}\` created...`);
});

/* Создание таблицы `categories` */
router.get("/create_categories", (req, res) => {
  database.createCategoriesTable();
  res.send(`Table \`categories\` created...`);
});

/* Создание таблицы `products` */
router.get("/create_products", (req, res) => {
  database.createProductsTable();
  res.send(`Table \`products\` created...`);
});

/* Получение списка категорий */
router.route("/categories").get((request, response) => {
  const result = database.getCategories();
  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

/* Получение списка продуктов */
router.route("/products").get((request, response) => {
  const result = database.getProducts();
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

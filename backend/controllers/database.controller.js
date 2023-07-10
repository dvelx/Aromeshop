import exprepress, { response } from "express";
import Database from "../database.js";

const database = new Database();
database.connect();

const router = exprepress.Router();
router.use(exprepress.json());

router.get("/", (req, res) => {
  res.send("api...");
});

// Создание базы данных
router.get("/createdb", (req, res) => {
  database.dropDatabase();
  database.createDatabase();
  res.send(`Database \`${database.db_name}\` created...`);
});

// Создание таблицы `categories`
router.get("/create_categories", (req, res) => {
  database.createCategoriesTable();
  res.send(`Table \`categories\` created...`);
});

// Создание таблицы `products`
router.get("/create_products", (req, res) => {
  database.createProductsTable();
  res.send(`Table \`products\` created...`);
});

// Получение списка категорий
router.route("/categories").get((request, response) => {
  const result = database.getCategories();

  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

// Создание категории
router.route("/category").post((request, response) => {
  const { title, slug, image } = request.body;
  const result = database.addCategory(title, slug, image);

  result.then((data) => response.json(data)).catch((err) => console.log(err));
});

// В остальных случаях отправим HTML-страницу
router.get("/admin", (req, res) => {
  res.sendFile("/admin/index.html", { root: "." });
});

export default router;

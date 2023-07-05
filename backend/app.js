import express from "express";
import Database from "./database.js";

const database = new Database();
database.connect();

const app = express();

// параметры для статических файлов
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};

app.use(express.static("admin", options));

// Создание базы данных
app.get("/createdb", (req, res) => {
  database.dropDatabase();
  database.createDatabase();
  res.send(`Database \`${database.db_name}\` created...`);
});

// Создание таблицы `categories`
app.get("/create_categories", (req, res) => {
  database.createCategoriesTable();
  res.send(`Table \`categories\` created...`);
});

// Создание таблицы `products`
app.get("/create_products", (req, res) => {
  database.createProductsTable();
  res.send(`Table \`products\` created...`);
});

// В остальных случаях отправим HTML-страницу
app.get("/admin", (req, res) => {
  res.sendFile("/admin/index.html", { root: "." });
});

app.listen("3000", () => {
  console.log("Server started on port 3000 ...");
});

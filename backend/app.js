import express from "express";
import router from "./controllers/database.controller.js";

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

// подключение станической папки с админкой
app.use(express.static("admin", options));

// подключение Bootstrap
app.use("/", express.static("./node_modules/bootstrap/dist/"));
app.use("/icons", express.static("./node_modules/bootstrap-icons/"));

// подключение контроллера БД
app.use("/api/", router);

/* В остальных случаях отправим HTML-страницу */
app.get("/admin", (req, res) => {
  res.sendFile("/admin/index.html", { root: "." });
});

app.listen("3000", () => {
  console.log("Server started on port 3000 ...");
});

import express from "express";
import router from "./controllers/database.controller.js";
import Mailer from "./mail.js";

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

// подключение станической папки с картинками
app.use("/img", express.static("img"));

// подключение Bootstrap
app.use("/", express.static("./node_modules/bootstrap/dist/"));
app.use("/icons", express.static("./node_modules/bootstrap-icons/"));

// подключение контроллера БД
app.use("/api/", router);

/* В остальных случаях отправим HTML-страницу */
app.get("/admin", (req, res) => {
  res.sendFile("/admin/index.html", { root: "." });
});

// Пример отправки почты
app.get("/mail", async (req, res) => {
  const mailer = new Mailer();
  mailer
    .sendMail({
      to: "goffdmitriy@gmail.com",
      subject: '"Message from Node js"',
      text: "This message was sent from Node js server.",
      html: "This <i>message</i> was sent from <strong>Node js</strong> server.",
    })
    .then(() => {
      res.status(200);
    });
});

app.listen("3000", () => {
  console.log("Server started on port 3000 ...");
});

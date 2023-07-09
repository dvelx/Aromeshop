import express from "express";
import Database from "./database.js";
import router from "./controllers/database.controller.js";

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
app.use("/api/", router);

app.listen("3000", () => {
  console.log("Server started on port 3000 ...");
});

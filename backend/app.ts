import express from "express";
import router from "./controllers/database.controller.js";
import Mailer from "./mail.js";
import cors from "cors";
import { options } from "./static-options.js";

const app = express();

app.use(cors());

// подключение статической папки с админкой
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
      res.json({result: 'message sent'})
    });
});

// app.get("/sequelize", (req, res) => {
//   dotenv.config();
//   const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE,
//     process.env.MYSQL_USER,
//     process.env.MYSQL_PASS,
//     {
//       host: process.env.MYSQL_HOST,
//       dialect: "mysql",
//     }
//   );
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log("Connection has been established successfully.");
//       res.send("<p>OK</p>");
//       res.status(200);
//     })
//     .catch((error) => {
//       console.error("Unable to connect to the database: ", error);
//     });
// });
app.listen("3000", () => {
  console.log("Server started on port 3000 ...");
});

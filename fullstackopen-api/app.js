const config = require("./utils/config");
const notesRouter = require("./controller/note");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyPaser = require('body-parser');

// 解析application/json数据
const jsonParser = bodyPaser.json();
// 解析application/x-www-form-urlencode数据
const urlencodedParser = bodyPaser.urlencoded({extended: false})

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URL);
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
// app.use((req, res, next) => {
//     if(req.headers['content-encoding'] == 'UTF-8') {
//         delete req.headers['content-encoding']
//     }
// })
if (process.env.NODE_ENV !== "test") {
  // 再测试使用superTest的send发送数据会出现意向不到情况
  // app.use(express.static("dist"));
  // app.use(express.json());
}

app.use(jsonParser);
app.use(urlencodedParser);
app.use(middleware.requestLogger);
app.use("/api", notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

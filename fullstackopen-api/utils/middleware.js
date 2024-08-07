const logger = require("../utils/logger.js");

// 统一处理
const requestLogger = (request, response, next) => {
  logger.info("method: ", request.method);
  logger.info("path: ", request.path);
  logger.info("body", request.body);

  next();
};

// 捕捉不存的路由
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// 全局异常捕获
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "格式错误" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `mongodb field` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  return response
    .status(500)
    .send({ error: "内部处理错误: " + error.name + "_" + error.message });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};

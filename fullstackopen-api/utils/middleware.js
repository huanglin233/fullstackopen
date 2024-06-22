const logger = require('../utils/logger.js');

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
  }

  return response.status(500).send({ error: "内部处理错误: " + error.name + "_" + error.message });
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}

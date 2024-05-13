const logger = require("./utils/logger.js");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

if (process.argv.length < 3) {
  console.log("请在命令参数带上mongodb的密码");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb://fullstack:${password}@192.168.56.101/fullstack?retryWrites=true&w=majority`;

mongoose.connect(url);
logger.info('已连接mongodb数据库');

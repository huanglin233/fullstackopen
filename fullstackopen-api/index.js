const {app} = require('./controller/restful.js');
const logger = require('./utils/logger.js');
require('dotenv').config();

logger.info("nodejs后端开始启动");
const port = process.env.PORT
app.listen(port, () => {
    logger.info(`server running on port ${port}`);
});

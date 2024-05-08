const {app} = require('./controller/restful.js');
require('dotenv').config();

console.log("nodejs后端开始启动");
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

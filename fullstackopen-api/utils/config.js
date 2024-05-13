require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.DB_URL;

module.exports = {
    MONGODB_URL,
    PORT
}

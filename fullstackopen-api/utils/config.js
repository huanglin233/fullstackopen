require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL;

module.exports = {
    MONGODB_URL,
    PORT
}

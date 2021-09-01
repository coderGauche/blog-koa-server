const fs = require('fs')

const env = require('dotenv')

const path = require('path')

env.config()

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    APP_HOST,
} = process.env
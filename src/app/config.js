const fs = require('fs')

const env = require('dotenv')

const path = require('path')

env.config()

module.exports = {

    APP_PORT

} = process.env
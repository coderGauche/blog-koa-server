const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const Router = require("../router");
const errhandle = require("./errorHandle");
require('./db')
// const Logger = require("./log");
const app = new koa();
app.use(bodyparser());
// app.use(Logger());
Router(app);
app.on("error", errhandle);
module.exports = app;

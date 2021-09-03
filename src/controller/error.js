const log4js = require("koa-log4");
const configure = require("../utils/log");

log4js.configure(configure);

function formatErrorLog(ctx, error) {
  const startTime = new Date();
  let period;
  period = new Date() - startTime;
  let text = "------------数据库报错 error start 数据库报错------------";
  let method = ctx.method;
  text += `request method: ${method} \n request url: ${ctx.originalUrl} \n`;
  if ((method = "GET")) {
    text += `request data: ${JSON.stringify(ctx.query)} \n`;
  } else {
    text += `request data: ${JSON.stringify(ctx.body)} \n`;
  }
  text += `request : ${JSON.stringify(ctx.request.body)} \n`;
  text += `response result: ${JSON.stringify(ctx.response.body)} \n`;
  text += `error status:数据库报错 \n`;
  text += `response message: ${error.name} \n`;
  text += `response message: ${error.errors[0].message} \n`;
  text += `response type: ${error.errors[0].type} \n`;
  text += `response path: ${error.errors[0].path} \n`;
  text += `response original: ${error.errors[0].original} \n`;
  text += `response instance: ${JSON.stringify(error.errors[0].instance)} \n`;
  text += `response time: ${period} \n`;
  return text;
}

class routerError {
  async Error(ctx, error, next) {
    await next();
    log4js.getLogger("controllerError").info(formatErrorLog(ctx, error));
  }
}

module.exports = new routerError();

const log4js = require("koa-log4");
const configure = require("../utils/log");

log4js.configure(configure);

class CommonHandle {
  constructor() {}
  // 格式化相应日志
  static formatResLog(ctx, time) {
    let text = "------------response start------------";
    let method = ctx.method;
    text += `request method: ${method} \n request url: ${ctx.originalUrl} \n`;
    if ((method = "GET")) {
      text += `request data: ${JSON.stringify(ctx.query)} \n`;
    } else {
      text += `request data: ${JSON.stringify(ctx.body)} \n`;
    }
    text += `request : ${JSON.stringify(ctx.request.body)} \n`;
    text += `response result: ${JSON.stringify(ctx.response.body)} \n`;
    text += `response all: ${JSON.stringify(ctx)} \n`;
    text += `error status: ${ctx.response.status} \n`;
    text += `response time: ${time} \n`;
    return text;
  }
  // 格式化错误日志
  static formatErrorLog(ctx, error, time) {
    let text = "------------error start------------";
    text += this.formatResLog(ctx, time);
    text += `error content: ${JSON.stringify(error)}`;
    return text;
  }
}

class HandleLogger extends CommonHandle {
  constructor() {
    super();
  }
  // 相应日志
  static resLogger(ctx, time) {
    log4js.getLogger("access").info(this.formatResLog(ctx, time));
  }
  // 错误日志
  static errorLogger(ctx, error, time) {
    log4js.getLogger("error").info(this.formatErrorLog(ctx, error, time));
  }
}

module.exports = (options) => {
  return async (ctx, next) => { 
   
    const startTime = new Date();
    let period;
    try {
      await next() 
      if (ctx.response.status === 200) {
        console.log("参数记录");
        period = new Date() - startTime;
        // 响应日志
        HandleLogger.resLogger(ctx, period);
      } else {
        console.log("错误日志");
        period = new Date() - startTime;
        // 错误日志
        HandleLogger.errorLogger(ctx, ctx.response.message, period);
      }
      // console.log('日志',ctx);
    } catch (err) {
      console.log("err", err);
      // console.log('错误日志');
      period = new Date() - startTime;
      // 错误日志
      HandleLogger.errorLogger(ctx, err, period);
    }
  };
};

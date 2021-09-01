const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      filename: path.join('back-end/logs/', 'access.log') //生成文件名
    },
    error: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join('back-end/logs/', 'error.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    access: { appenders: [ 'access' ], level: 'info' },
    error: { appenders: [ 'error' ], level: 'info'}
  }
});


class CommonHandle {
  constructor(){}
  // 格式化相应日志
  static formatResLog(ctx,time){
    let text = '------------response start------------'
    let method = ctx.method
    text += `request method: ${method} \n request url: ${ctx.originalUrl } \n`

    if(method = 'GET'){
      text += `request data: ${JSON.stringify(ctx.query)} \n`
    }else{
      text += `request data: ${JSON.stringify(ctx.body)} \n`
    }

    text += `request : ${JSON.stringify(ctx.request.body)} \n`
    
    text += `response result: ${JSON.stringify(ctx.response.body)} \n`
 
    text += `response all: ${JSON.stringify(ctx)} \n`
 
    text += `response time: ${time} \n`
    return text
  }
  // 格式化错误日志
  static formatErrorLog(ctx,error,time){
    let text = '------------error start------------'
    text += this.formatResLog(ctx,time)
    text += `error content: ${JSON.stringify(error)}`
 
    return text
  }
}

class HandleLogger extends CommonHandle{
  constructor(){
    super()
  }
  // 相应日志
  static resLogger(ctx, time){
    log4js.getLogger('access').info(this.formatResLog(ctx,time))
  }
  // 错误日志
  static errorLogger(ctx, error, time){
    console.log('错误日志');
    log4js.getLogger('error').info(this.formatErrorLog(ctx,error,time))
  }
}



// exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志
// exports.logger = log4js.getLogger('error');  //记录所有应用级别的日志

module.exports = (options) => {
  return async (ctx,next) => {
    const startTime = new Date()
    let period;
    console.log(ctx);
    try{
      if(ctx.response.status === 200){
       
        period = new Date() - startTime
        // 响应日志
        HandleLogger.resLogger(ctx,period)
      }else{
        
        period = new Date() - startTime
        // 错误日志
        HandleLogger.errorLogger(ctx, ctx.response.message, period)
        
      }
      await next()
    }catch(err){
      console.log('err',err);
      period = new Date() - startTime
      // 错误日志
      HandleLogger.errorLogger(ctx, err, period)
    }
  }
}
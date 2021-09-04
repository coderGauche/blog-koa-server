//错误中间件的提示处理
const errorType = require('../constants/error-types')
const verifyUser = async(ctx,next)=>{
    const { username,email,code } = ctx.request.body
    // 判断各种是否存在
    if(!username){
        const error = new Error(errorType.NOTUSERNAME)
        return ctx.app.emit('error', error, ctx)
    }
    if(!email){
        const error = new Error(errorType.NOTEMAIL)
        return ctx.app.emit('error', error, ctx)
    }
    if(!code){
        const error = new Error(errorType.NOTCODE)
        return ctx.app.emit('error', error, ctx)
    }
    // console.log('中间件触发',username,email);
    await next()
}
const verifyEmail = async(ctx,net)=>{
    console.log('中间件触发',ctx.request.body);
}

module.exports = { 
    verifyUser,
    verifyEmail
}
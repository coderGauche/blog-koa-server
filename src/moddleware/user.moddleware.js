const verifyUser = async(ctx,net)=>{
    console.log('中间件触发',ctx.request.body);
}
const verifyEmail = async(ctx,net)=>{
    console.log('中间件触发',ctx.request.body);
}

module.exports = { 
    verifyUser,
    verifyEmail
}
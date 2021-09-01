const errorTypes = require('../constants/error-types')

const errorHandle = (error,ctx) =>{
    console.log('报错信息')
    let status,message
    switch (error.message) {
        case errorTypes.USERNAMEANDUSEREMAIL:
            status=400;
            message="用户名或者密码不能为空"
            break;
        default:
            status=404;
            message="NOT FOUND"
    }
    ctx.status = status
    ctx.body = message
}
module.exports=errorHandle
const errorTypes = require('../constants/error-types')

const errorHandle = (error,ctx) =>{
    console.log('报错信息',error)
    let status,message
    switch (error.message) {
        case errorTypes.NOTUSERNAME:
            status=400;
            message="用户名不能为空"
            break;
        case errorTypes.NOTEMAIL:
            status=400;
            message="邮箱不能为空"
            break;
        case errorTypes.NOTCODE:
            status=400;
            message="验证码不能为空"
            break;
        case errorTypes.NOTSENDCODE:
            status=400;
            message="您未发送验证码"
            break;
        case errorTypes.NOTOVERDUECODE:
            status=400;
            message="验证码过期"
            break;
        case errorTypes.NOTCORRECTCODE:
            status=400;
            message="验证码不正确"
            break;
        case errorTypes.NOTTIMEOUTCODE:
            status=400;
            message="验证码超时请重新获取验证码"
            break;
        case errorTypes.NOTSENDFAILUREMAIL:
            status=400;
            message="邮箱发送失败"
            break;
        default:
            status=400;
            message=error.message
    }
    ctx.status = status
    ctx.body = message
}
module.exports=errorHandle
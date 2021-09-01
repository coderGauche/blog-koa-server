const userModel = require('../model/user.model')
class userController {
    async create (ctx,next){
        const {username,email} = ctx.request.body
        try {
            await userModel.create({
                username: username,
                 email2: email,
                 avatar_url:'555555'
            }) 
            ctx.body = '测试数据库的接口'
        } catch (error) {
            // console.log(error);
        }
        
    }
    async email (ctx,next){
        ctx.body = '测试接口'
    }
}

module.exports = new userController()
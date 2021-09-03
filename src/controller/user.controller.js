const userModel = require('../model/user.model')
const {Error} = require('./error')
class userController {
    async create (ctx,next){
        const {username,email} = ctx.request.body
        try {
            await userModel.create({
                username: username,
                 email2: email,
                 avatar_url:'555555'
            }).then(res=>{
                ctx.body = '测试数据库的接口'
            }).catch(err=>{ 
                console.log('数据库',err);
                Error(ctx,err,next)
                ctx.body = err
            })
        } catch (error) {
            console.log('接口',error);
            ctx.body = error
        }
    }
    async email (ctx,next){
        ctx.body = '测试接口'
        console.log(ctx);
        
    }
}

module.exports = new userController()
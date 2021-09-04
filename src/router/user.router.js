const Router = require('koa-router')

const userRouter = new Router({prefix:'/user'})

const {
    create,
    email
} = require('../controller/user.controller')

const {
    verifyUser,
    verifyEmail
} = require('../moddleware/user.moddleware')

userRouter.post('/',verifyUser,create)
userRouter.post('/email',email)

module.exports = userRouter

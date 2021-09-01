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

userRouter.post('/',create)
userRouter.post('/email',verifyEmail,email)

module.exports = userRouter

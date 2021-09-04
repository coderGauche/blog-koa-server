// 用户信息的mysql的模型
const userModel = require('../model/user.model')
// 邮箱的mysql的模型
const emailModel = require('../model/email.model')
// 获取token生成工具函数
const { tokenChange } = require('../utils/token')
// 输出的格式
const { bodyOutPut } = require('../utils/ctxBody')
//错误提示处理
const errorType = require('../constants/error-types')
// 接口报错存日志
// const {Error} = require('./error')
//邮箱发送验证码
const nodemailer = require('nodemailer')
//邮箱配置
const Email = require('../utils/email')
// token的jwk
const jwt = require('jsonwebtoken')
//token绑定的令牌key
const {
    PRIVATE_KEY
} = require('../app/config')
const { request } = require('../app')
class userController {
    // 用户注册or登录
    async create (ctx,next){
        // 先获取用户名和邮箱
       const { username,email,code } = ctx.request.body
       // 获取email地址
       const url=(email.split('@'))[0]
       // 判断用户是否注册过（注册过直接返回用户信息，没注册过自动注册再返回用户信息）

       // 先通过用户名和邮箱查找他的信息
       const userName = await userModel.findOne({
           where:{
               username,
               email
           }
       })
       //命名一个user用户信息
       let userInfo = {}
       // 开始判断是否存在
       if(userName){ //用户信息存在
        userInfo = userName
       }else{  //用户信息不存在
           console.log('用户信息不存在');
           await userModel.create({
               username,
               email,   
               code,
               avatar_url:`http://q1.qlogo.cn/g?b=qq&nk=${url}&s=100`
           }).then(res=>{
              userInfo = res
           }).catch(err=>{
              ctx.body = bodyOutPut(500,err)
           })
       }
       console.log('走到了邮箱验证');
       // 判断code是否正确
       const emailInfo = await emailModel.findOne({
           where:{
               email,
               username
           }
       })
       console.log('邮箱信息',emailInfo);
       if(emailInfo){
           if(emailInfo.dataValues.code === code){
               console.log('code吻合');
               //判断过期时间
               let newdate = (Date.parse(emailInfo.dataValues.updatedAt)) + 600000 * 1000
               console.log('过期时间',new Date().getTime() - newdate);
               if(new Date().getTime() - newdate > 0){
                   const error = new Error(errorType.NOTOVERDUECODE)
                   return ctx.app.emit('error', error, ctx)
               }else{
                   console.log('全都通过了');
                   ctx.body = bodyOutPut(200,'登录成功',{user:emailInfo,token:tokenChange(emailInfo)})
               }
           }else{
               const error = new Error(errorType.NOTCORRECTCODE)
               return ctx.app.emit('error', error, ctx)
           }
       }else{
           const error = new Error(errorType.NOTSENDCODE)
           return ctx.app.emit('error', error, ctx)
       }
    }

    // 发送邮箱
    async email (ctx,next){
        const { username,email } = ctx.request.body
        if(!username){
            const error = new Error(errorType.NOTUSERNAME)
            return ctx.app.emit('error', error, ctx)
        }
        //发送端信息
        let transporter = nodemailer.createTransport({
            service: 'qq',
            port: '465', // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user: Email.smtp.user,
                pass: Email.smtp.pass
            }
        });
        // console.log('邮箱transporter',transporter);
        console.log('邮箱配置',Email);
        //接受端信息
        let ko = {
            code: Email.smtp.code(),
            expire: Email.smtp.expire(),
            email,
            username
        }
        //邮件信息
        let mailOptions = {
            from: `《GAUCHE测试网站》<${Email.smtp.user}>`,
            to: ko.email,
            subject: 'GAUCHE测试网站验证码',
            html: `${ko.username}您好，您正在《GAUCHE测试网站》注册，验证码是：${ko.code}`
        };
        //发送邮件
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                const err = new Error(errorType.NOTSENDFAILUREMAIL)
                return ctx.app.emit('error', err, ctx)
            } else {
                const getEmail = await emailModel.findOne({
                    where: {
                        email: ko.email,
                        username: ko.username
                    }
                })
                if(getEmail){
                    console.log('更新');
                    await emailModel.update({
                        code: ko.code,
                        expire: ko.expire,
                        email: ko.email,
                        username: ko.username
                    }, {
                        where: {
                            id: getEmail.dataValues.id
                        }
                    })
                }else{
                    console.log('新增');
                    await emailModel.create({
                        code: ko.code,
                         expire: ko.expire,
                         email: ko.email,
                         username: ko.username
                     })
                }
            }
        });
        
        ctx.body = bodyOutPut('200','验证码发送成功')
    }
}

module.exports = new userController()
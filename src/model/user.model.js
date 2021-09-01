const sequelize =require('../app/db')
const {Sequelize}=require('sequelize')

const user = sequelize.define(
    'user',
    {
        id:{
            type:Sequelize.INTEGER, //数据类型
            allowNull:false, //是否为null
            primaryKey:true, //是否为主键
            autoIncrement:true, //是否为自增长
        },
        username:{
            type:Sequelize.STRING(100),
            allowNull:false,
            defaultValue:false //默认值
        },
        email:{
            type:Sequelize.STRING(100),
            allowNull:false,
            defaultValue:false, //默认值
            validate:{
                isEmail: true,  
            }
        },
        avatar_url:{
            type:Sequelize.STRING(200),
            allowNull:false,
            defaultValue:false //默认值
        }
    },
    {
        tableName: 'user',
        createdAt: true,
        updatedAt: true, 
        sequelize
    }
);
user.sync({
    force:false
})

module.exports=user

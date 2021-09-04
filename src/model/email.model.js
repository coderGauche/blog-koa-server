const sequelize =require('../app/db')
const {Sequelize}=require('sequelize')

const email = sequelize.define(
    'email',
    {
        //id自增长
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
        expire:{
            type:Sequelize.STRING(100),
            allowNull:false,
            defaultValue:false //默认值
        },
        code:{
            type:Sequelize.STRING(100),
            allowNull:false,
            defaultValue:false //默认值
        }
    }, {
        tableName: 'email',
        createdAt: true,
        updatedAt: true, 
        sequelize
    }
);
email.sync({
    force:false
})

module.exports=email

const {Sequelize,DataTypes,Model}=require('sequelize')

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
}=require('../app/config')

const sequelize= new Sequelize(MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD,{
    host:MYSQL_HOST,
    dialect:'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    //解决中文输入问题
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    },
    timezone:"+08:00",
    logging: false, //防止控制台输出
})

sequelize.authenticate().then(()=>{
    console.log('连接成功');
}).catch((err)=>{
    console.log('连接失败');
    console.log(err);
})

module.exports=sequelize
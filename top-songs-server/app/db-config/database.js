const Sequelize = require('sequelize');

module.exports =  new Sequelize('topsongs', 'postgres', '123456',{
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialect: 'postgres',
    define: {
        timestamps: false
    }
})
const Sequelize = require('sequelize');
const db = require('../db-config/database');

const User = db.define('user', {
    user_id:{
        type: Sequelize.UUIDV4,
        primaryKey: true,
    },
    username:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
});

module.exports = User;
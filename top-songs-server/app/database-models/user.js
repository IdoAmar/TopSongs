const Sequelize = require('sequelize');
const db = require('../db-config/database');

const User = db.define('song', {
    uuid:{
        type: Sequelize.UUIDV4
    },
    username:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
})
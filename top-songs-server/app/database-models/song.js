const Sequelize = require('sequelize');
const db = require('../db-config/database');

const Song = db.define('song', {
    song_name:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    artist:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    upvotes:{
        type: Sequelize.INTEGER
    },
    creator_user_id:{
        type: Sequelize.UUIDV4
    },
});

module.exports = Song;
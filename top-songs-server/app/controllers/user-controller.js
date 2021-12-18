const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const db = require('../db-config/database');
const bcrypt = require('bcrypt');
const User = require('../database-models/user');
const { BaseError } = require('sequelize/dist');

const saltRounds = 10;

router.post('/login', async (req, res) => {
    try{
        let user = (await User.findOne({ where: {username: req.body.username} })).dataValues;
        let comparisation = await bcrypt.compare(req.body.password, user.password);
        res.sendStatus(comparisation ? 200 : 401)
    }
    catch(e){
        if(e instanceof BaseError){
            console.log("Query: ", e.sql, " failed with message : ", e.message);
        }
        else{
            console.log(e);
        }
        res.sendStatus(500);
    }
});

router.post('/create-user', async (req, res) =>{
    try{
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        await db.query('CALL create_user(:username, :password)', { replacements: {
            username: req.body.username,
            password: hash
        }})
        res.sendStatus(204);
    }
    catch(e){
        if(e instanceof BaseError){
            console.log("Query: ", e.sql, " failed with message : ", e.message);
        }
        else{
            console.log(e);
        }
        res.sendStatus(500);
    }
});

module.exports = router;
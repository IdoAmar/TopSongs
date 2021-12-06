const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const db = require('../db-config/database');


router.get('/', (req, res) => {
    res.status(500);
    res.send(`Get Users not implemented`);
});

router.get('/check-for-password/:id/:password', (req, res) => {
    res.status(500);
    res.send(`Get Users not implemented with params id = ${req.params.id} and password = ${req.params.password}`);
});

router.post('/create-user', (req, res) =>{
    db.query('CALL create_user(:username, :password)', { replacements: {
        username: req.body.username,
        password: req.body.password
    }}).then( r => {
        console.log(r);
        res.send(`Create user not implemented with body : ${JSON.stringify(req.body)}`)
    }).catch( e => {
        res.sendStatus(500);
    });
});

module.exports = router;
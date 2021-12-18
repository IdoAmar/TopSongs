const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const db = require('../db-config/database');
const util = require('util');
const { QueryTypes } = require('sequelize/dist');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!uuid.validate(userId)) {
        res.status(400);
        res.send(`user id should be a valid uuidv4`);
        return;
    }
    else {
        db.query('SELECT * FROM get_all_songs_for_user(:userId)', { replacements: {userId}, type: QueryTypes.SELECT})
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                console.log("Query: ", e.sql, " failed with message : ", e.message);
                res.sendStatus(500);
            });
    }
});

router.post('/', (req, res) => {
    db.query('CALL create_song(:userId, :songName, :artist)',{ 
        replacements: 
        {
            userId : req.body.userId,
            songName : req.body.songName,
            artist : req.body.artist
        }})
        .then(r => {
            res.sendStatus(204);
        })
        .catch(e => {
            console.log("Query: ", e.sql, " failed with message : ", e.message);
            res.sendStatus(500);
        });
   
});

router.post('/upvote', (req, res) => {
    db.query('CALL user_upvoted_a_song(:userId, :songName, :artist)',{ 
        replacements: 
        {
            userId : req.body.userId,
            songName : req.body.songName,
            artist : req.body.artist
        }})
        .then(r => {
            res.sendStatus(204);
        })
        .catch(e => {
            console.log("Query: ", e.sql, " failed with message : ", e.message);
            res.sendStatus(500);
        });
});

module.exports = router;
const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const db = require('../db-config/database');
const util = require('util');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!uuid.validate(userId)) {
        res.status(400);
        res.send(`user id should be a valid uuidv4`);
        return;
    }
    else {
        db.query('SELECT * FROM get_all_songs_for_user(:userId)', { replacements: {userId}})
            .then(r => {
                res.send(`Get all songs for user not implemented with user ${req.params.userId}`);
                console.log(r);
            })
            .catch(e => {
                console.log(e)
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
            res.send(`Create song not implemented with body : ${JSON.stringify(req.body)}`)
        })
        .catch(e => {
            console.log("Query: ", e.sql, " failed with message : ", e.message);
            res.sendStatus(500);
        });
   
});

router.post('/upvote', (req, res) => {
    res.status(500);
    res.send(`Upvote song not implemented with body : ${JSON.stringify(req.body)}`)
});

module.exports = router;
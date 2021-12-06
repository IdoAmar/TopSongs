const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
    res.status(500);
    res.send(`Get all songs for user not implemented with user ${req.params.userId}`);
});

router.post('/', (req, res) => {
    res.status(500);
    res.send(`Create song not implemented with body : ${JSON.stringify(req.body)}`)
});

router.post('/upvote', (req, res) =>{
    res.status(500);
    res.send(`Upvote song not implemented with body : ${JSON.stringify(req.body)}`)
});

module.exports = router;
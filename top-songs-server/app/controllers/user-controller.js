const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(500);
    res.send(`Get Users not implemented`);
});

router.get('/check-for-password/:id/:password', (req, res) => {
    res.status(500);
    res.send(`Get Users not implemented with params id = ${req.params.id} and password = ${req.params.password}`);
});

router.post('/create-user', (req, res) =>{
    res.status(500);
    res.send(`Create user not implemented with body : ${JSON.stringify(req.body)}`)
});

module.exports = router;
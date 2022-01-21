const express = require('express');
const router = express.Router();

// Libs
const Messages = require('../src/lib/Message');

/* GET home page. */
router.get('/list', (req, res, next) =>{
    Messages.list('@Roomm2EtbMx5O', (messages) => {
        res.json(messages);
    });
});

module.exports = router;

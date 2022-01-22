const express = require('express');
const router = express.Router();

// Libs
const Messages = require('../src/lib/Message');

/* GET home page. */
router.get('/list', (req, res, next) =>{
    Messages.list(req.query.roomId, (messages) => {   // roomId ye göre mesajları listeleyen router
        res.json(messages);
    });
});

module.exports = router;

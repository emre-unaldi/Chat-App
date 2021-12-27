const express = require('express');
const router = express.Router();

/* GET chat home page. */
router.get('/', (req, res, next) =>{
  res.render('chat');
});

module.exports = router;

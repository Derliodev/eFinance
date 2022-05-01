var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'eFinance', layout: 'layoutLogin' });
});

router.get('/registroU', function(req, res, next) {
  res.render('registroU', { title: 'eFinance', layout: 'layoutLogin' });
});

module.exports = router;

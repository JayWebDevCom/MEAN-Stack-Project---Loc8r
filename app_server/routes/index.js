var express = require('express');
var router = express.Router()
var ctrlMain = require('../controllers/main'); // jaiye 2

/* GET home page. */
var homepagecontroller = function (req, res) {
  res.render('index', {title: "Express - Jaiye"})
}

router.get('/', ctrlMain.index);

module.exports = router;

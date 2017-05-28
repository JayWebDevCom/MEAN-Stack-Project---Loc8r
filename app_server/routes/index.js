var express = require('express');
var router = express.Router()
// var ctrlMain = require('../controllers/main'); // jaiye 2

var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others')

/* GET home page. */
// var homepagecontroller = function (req, res) {
//   res.render('index', {title: "Express - Jaiye"})
// }
// router.get('/', ctrlMain.index);

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview)

/* Other pages */
router.get('/about', ctrlOthers.about)

module.exports = router;

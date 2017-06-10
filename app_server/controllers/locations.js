/* GET 'home' page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', {title: 'HomePage'})
}

/* GET 'location info' page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {title: 'Location Info'})
}

/* GET 'add review' page */
module.exports.addReview = function(req, res) {
  res.render('add-review-form', {title: 'Add Review'})
}

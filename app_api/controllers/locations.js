var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
}


module.exports.locationsListByDistance = function(req, res) {

}

module.exports.locationsCreate = function(req, res) {

}

module.exports.locationsReadOne = function(req, res) {
  Loc
  .findById(req.params.locationid)
  .exec(function(error, response){
    sendJsonResponse(res, 200, response);
  });
}

module.exports.locationsUpdateOne = function(req, res) {

}

module.exports.locationsDeleteOne = function(req, res) {

}

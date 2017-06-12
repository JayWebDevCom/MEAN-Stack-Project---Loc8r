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
  if ( req.params && req.params.locationid ) {
    Loc
    .findById(req.params.locationid)
    .exec(function(error, location){
      if (!location) {
        sendJsonResponse(res, 404, { "message" : "location id not found" });
        return;
      } else if (error) {
        sendJsonResponse(res, 404, error);
        return;
      }
      sendJsonResponse(res, 200, location);
    });
  } else {
    sendJsonResponse(res, 404, { "message" : "no location in request" });
  }
};

module.exports.locationsUpdateOne = function(req, res) {

}

module.exports.locationsDeleteOne = function(req, res) {

}

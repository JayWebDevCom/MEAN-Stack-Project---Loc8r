var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function () {
  var earthRadius = 6371; // this is in km. miles is 3959;

  var getDistanceFromRads = function (rads) {
    return parseFloat(rads * earthRadius);
  }

  var getRadsFromDistance = function (distance) {
    return parseFloat(distance / earthRadius)
  }

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  }
})();

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat)
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    num: 10
  };
  Loc.geonear(point, geoOptions, callback)
};

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

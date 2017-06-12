var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
}

module.exports.reviewReadOne = function(req, res) {
  if ( req.params && req.params.locationid && req.params.reviewid ) {
    Loc
    .findById(req.params.locationid)
    .select('name reviews')
    .exec(function(error, location){
      var response, review;
      if (!location) {
        sendJsonResponse(res, 404, { "message" : "location id not found" });
        return;
      } else if (error) {
        sendJsonResponse(res, 404, error);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        review = location.reviews.id(req.params.reviewid);
      if (!review) {
        sendJsonResponse(res, 404, { "message" : "review id not found" });
      } else {
          response = {
            location : {
              name : location.name,
              id : req.params.locationid
            },
            review : review
          };
        sendJsonResponse(res, 200, response);
        }
      } else {
        sendJsonResponse(res, 200, {"message" : "no reviews found"});
      }
    });
  } else {
    sendJsonResponse(res, 404, { "message" : "Not found, location id and review id are both required" });
  }
};

module.exports.reviewsCreate = function(req, res) {

}

module.exports.reviewUpdateOne = function(req, res) {

}

module.exports.reviewDeleteOne = function(req, res) {

}

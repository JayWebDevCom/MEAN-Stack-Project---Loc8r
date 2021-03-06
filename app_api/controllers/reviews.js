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
            location: {
              name: location.name,
              id: req.params.locationid
            },
            review: review
          };
        sendJsonResponse(res, 200, response);
        }
      } else {
        sendJsonResponse(res, 200, {
          "message" : "no reviews found"
        });
      }
    });
  } else {
    sendJsonResponse(res, 404, {
      "message" : "Not found, location id and review id are both required"
    });
  }
};

module.exports.reviewsCreate = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid){
    Loc
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (err) {
            sendJsonResponse(res, 400, err)
          } else {
            doAddReview(req, res, location)
          }
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not Found, locationid required"
  });
  }
};

var doAddReview = function (req, res, location) {
  if (!location) {
    sendJsonResponse(res, 404, {
      "message": "location not found"
    })
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location){
      var thisReview;
      if (err) {
        console.log('there is an error', err)
        sendJsonResponse(res, 400, err)
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length -1]
        sendJsonResponse(res, 201, thisReview)
      }
    });
  }
};

var updateAverageRating = function(locationid) {
  Loc
  .findById(locationid)
  .select('rating reviews')
  .exec(
    function(err, location) {
      if (!err) {
        doSetAverageRating(location);
      }
    });
};

var doSetAverageRating = function(location) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (location.reviews && location.reviews.length > 1) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal += location.reviews[i].rating
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10)
    location.rating = ratingAverage;
    location.save(function(err){
      if (err) {
        console.log(err)
      } else {
        console.log("Average Rating updated to", ratingAverage)
      }
    })
  }
}

module.exports.reviewUpdateOne = function(req, res) {
  if (!req.body.locationid || !req.body.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc.findbyId(req.body.locationid)
  .select('reviews')
  .exec(
    function(err, location) {
      var thisReview;
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "locationid not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        thisReview = location.reviews.id(req.body.reviewid);
        if (!thisReview) {
          sendJsonResponse(res, 404, {
            "message": "review not found"
          });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save(function(err, location) {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              updateAverageRating(location._id);
              sendJsonResponse(res, 200, thisReview);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "no review to update"
        });
      }
    }
  );
};

module.exports.reviewDeleteOne = function(req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc
  .findById(req.params.reviewid)
  .select(reviews)
  .exec(
    function(err, location){
      if (!location){
        sendJsonResponse(res, 404, {
          "message": "locationid not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(req.params.reviewid)) {
          sendJsonResponse(res, 404, {
            "message": "reviewid not found"
          });
        } else {
          location.reviews.id(req.params.reviewid).remove();
          location.save(function(err){
            if (err) {
              sendJsonResponse(res, 404, err)
            } else {
              updateAverageRating(location._id)
              sendJsonResponse(res, 200, null)
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "no review to delete"
        });
      }
    }
  );
};

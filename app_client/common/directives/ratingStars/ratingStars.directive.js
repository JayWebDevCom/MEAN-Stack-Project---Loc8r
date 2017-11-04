angular.module("loc8rApp").directive("ratingStars", ratingStars);

function ratingStars() {
  return {
    restrict: "EA", // only use ratingStars directive when 'rating-stars' is found in particular places
    // E - element, A - attribute, C - class, M - comment
    scope: {
      thisRating: "=rating"
    },
    templateUrl: "/common/directives/ratingStars/ratingStars.template.html"
  };
}

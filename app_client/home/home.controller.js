angular.module("loc8rApp").controller("homeCtrl", homeCtrl);

function homeCtrl($scope, loc8rData, geolocation) {
  var viewModel = this;
  viewModel.pageHeader = {
    title: "Loc8r",
    strapline: "Find a couple of places with wifi for you to work :)"
  };
  viewModel.sidebar = {
    content:
      "Looking for wifi and a seat? Loc8r helps you find places to \
     work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r \
     help you find the place you're looking for."
  };
  viewModel.message =
    "Checking your location now to retrieve the closest results";

  viewModel.getData = function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    viewModel.message = "Position determined, searching for nearby places";

    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        viewModel.message = data.length > 0 ? "" : "No locations found nearby";
        console.log(data);
        viewModel.data = { locations: data };
      })
      .error(function(e) {
        viewModel.message = "Sorry something has gone wrong";
      });
  };

  viewModel.showError = function(error) {
    viewModel.$apply(function() {
      viewModel.message = error.message;
    });
  };

  viewModel.noGeo = function() {
    viewModel.$apply(function() {
      viewModel.message = "Geolocation not supported by this browser";
    });
  };

  geolocation.getPosition(viewModel.getData, viewModel.showError, viewModel.noGeo);
}

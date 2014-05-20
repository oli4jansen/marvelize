app.factory('APIErrorHandler', function($http, $location, $route, $window, $sce, $rootScope) {

	var factory = {};

	factory.errorSwitch = function() {
		
	};

	factory.error = function(error) {
		console.log(error);
		alert('Error with code '+code+'. Status:'+status);
	};

	return factory;
});

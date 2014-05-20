app.factory('APIErrorHandler', function($http, $location, $route, $window, $sce, $rootScope) {

	var factory = {};

	factory.errorSwitch = function() {
		
	};

	factory.error = function(error) {
		console.log(error);
		alert('Error with code '+error.code+'. Status:'+error.status);
		$rootScope.navigate('');
	};

	return factory;
});

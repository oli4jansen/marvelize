app.controller("menuController", function($scope, $location, $http, $rootScope, $sce){

	$scope.navigate = function(path) {
		$location.path('/'+path);
	};

	$scope.home = function() {
		$location.path('/');
	};

	$scope.search = function() {
		$location.path('/search/characters/'+encodeURIComponent(this.query));
	};

});

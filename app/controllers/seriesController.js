app.controller("seriesController", function($scope, $location, $routeParams, APIDataFactory, parseDataFactory){

	$scope.URLParamsObject = {};

	$scope.init = function() {

		if($routeParams.characterName && $routeParams.characterID ) {
			$scope.filterTitle = 'Series with \''+$routeParams.characterName+'\'';
			$scope.URLParamsObject.characters = $routeParams.characterID;
		}

		APIDataFactory.getSeries($scope.URLParamsObject, function(error, result) {
			if(!error) {
				console.log(result.results);
				$scope.items = parseDataFactory.parse('series', result.results);
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

	/*
		Functions and vars that need to be implented for our ListView
	*/

	$scope.initialFormat = 'grid';
	$scope.items = [];
	$scope.tabs = [];
	$scope.currentTab = '';
	$scope.total = 0;

	// Function called by the ListView when a ListViewItem is clicked
	$scope.navigateToItem = function(seriesId) {
		$location.path('/series/'+seriesId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.URLParamsObject.offset = $scope.items.length;

		$scope.$apply(APIDataFactory.getSeries($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse('series', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});
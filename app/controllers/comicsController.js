app.controller("comicsController", function($scope, $routeParams, $location, APIDataFactory, parseDataFactory){

	$scope.URLParamsObject = {};

	$scope.init = function() {

		if($routeParams.seriesName && $routeParams.seriesID ) {
			$scope.filterTitle = 'Comics from \''+$routeParams.seriesName+'\'';
			$scope.URLParamsObject.series = $routeParams.seriesID;
			$scope.URLParamsObject.orderBy = 'onsaleDate';
		}

		APIDataFactory.getComics($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items = parseDataFactory.parse('comics', result.results);
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
	$scope.navigateToItem = function(comicId) {
		$location.path('/comic/'+comicId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.URLParamsObject.offset = $scope.items.length;

		$scope.$apply(APIDataFactory.getComics($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse('comics', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});

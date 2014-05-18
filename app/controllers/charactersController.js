app.controller("charactersController", function($scope, $routeParams, $location, APIDataFactory, parseDataFactory){

	$scope.init = function() {

		var URLParamsObject = {};

		if($routeParams.seriesName && $routeParams.seriesID ) {
			$scope.filterTitle = 'Characters in \''+$routeParams.seriesName+'\'';
			URLParamsObject.series = $routeParams.seriesID;
		}

		APIDataFactory.getCharacters(URLParamsObject, function(error, result) {
			if(!error) {
				console.log(result.results);
				$scope.items = parseDataFactory.parse('characters', result.results);
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
	$scope.navigateToItem = function(characterId) {
		$location.path('/character/'+characterId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.getCharacters({ offset: $scope.items.length }, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse('characters', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});

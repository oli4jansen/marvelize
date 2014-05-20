app.controller("charactersController", function($scope, $routeParams, $location, APIDataFactory, parseDataFactory){

	$scope.URLParamsObject = {};

	$scope.init = function() {

		if($routeParams.seriesName && $routeParams.seriesID ) {

			$scope.filterTitle = 'Characters in \''+$routeParams.seriesName+'\'';
			$scope.URLParamsObject.series = $routeParams.seriesID;

			$scope.backButton = {
				type: 'series',
				id: $routeParams.seriesID
			};

		}else if($routeParams.eventName && $routeParams.eventID ) {

			$scope.filterTitle = 'Characters in \''+$routeParams.eventName+'\'';
			$scope.URLParamsObject.events = $routeParams.eventID;

			$scope.backButton = {
				type: 'event',
				id: $routeParams.eventID
			};

		}

		$scope.URLParamsObject.orderBy = 'modified';

		APIDataFactory.getCharacters($scope.URLParamsObject, function(error, result) {
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
		$scope.URLParamsObject.offset = $scope.items.length;

		$scope.$apply(APIDataFactory.getCharacters($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse('characters', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});

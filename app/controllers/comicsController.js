app.controller("comicsController", function($scope, $routeParams, $location, APIDataFactory, APIDataParser){

	$scope.URLParamsObject = {};

	$scope.init = function() {

		if($routeParams.seriesName && $routeParams.seriesID ) {
			$scope.filterTitle = 'Comics from \''+$routeParams.seriesName+'\'';
			$scope.URLParamsObject.series = $routeParams.seriesID;
			$scope.URLParamsObject.orderBy = 'onsaleDate';

			$scope.backButton = {
				type: 'series',
				id: $routeParams.seriesID
			};

		}else if($routeParams.eventName && $routeParams.eventID ) {
			$scope.filterTitle = 'Comics associated with \''+$routeParams.eventName+'\'';
			$scope.URLParamsObject.events = $routeParams.eventID;
			$scope.URLParamsObject.orderBy = 'onsaleDate';

			$scope.backButton = {
				type: 'event',
				id: $routeParams.eventID
			};

		}else if($routeParams.characterName && $routeParams.characterID ) {
			$scope.filterTitle = 'Comics with \''+$routeParams.characterName+'\'';
			$scope.URLParamsObject.characters = $routeParams.characterID;
			$scope.URLParamsObject.orderBy = 'onsaleDate';

			$scope.backButton = {
				type: 'character',
				id: $routeParams.characterID
			};

		}

		APIDataFactory.getComics($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items = APIDataParser.parse('comics', result.results);
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
				$scope.items.push.apply($scope.items, APIDataParser.parse('comics', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});

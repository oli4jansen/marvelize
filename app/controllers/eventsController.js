app.controller("eventsController", function($scope, $location, $routeParams, APIDataFactory, APIDataParser){

	$scope.URLParamsObject = {};

	if($routeParams.characterName && $routeParams.characterID ) {

		$scope.filterTitle = 'Events in which \''+$routeParams.characterName+'\' appears';
		$scope.URLParamsObject.characters = $routeParams.characterID;

		$scope.backButton = {
			type: 'character',
			id: $routeParams.characterID
		};

	}else if($routeParams.seriesName && $routeParams.seriesID ) {

		$scope.filterTitle = 'Events that take place in \''+$routeParams.seriesName+'\'';
		$scope.URLParamsObject.series = $routeParams.seriesID;

		$scope.backButton = {
			type: 'series',
			id: $routeParams.seriesID
		};

	}else if($routeParams.comicName && $routeParams.comicID ) {

		$scope.filterTitle = 'Events that take place in \''+$routeParams.comicName+'\'';
		$scope.URLParamsObject.comics = $routeParams.comicID;

		$scope.backButton = {
			type: 'comic',
			id: $routeParams.comicID
		};

	}
	
	$scope.init = function() {

		if($routeParams.characterName && $routeParams.characterID ) {
			$scope.filterTitle = 'Events with \''+$routeParams.characterName+'\'';
			$scope.URLParamsObject.characters = $routeParams.characterID;
			$scope.URLParamsObject.orderBy = 'startDate';
		}

		APIDataFactory.getEvents($scope.URLParamsObject, function(error, result) {
			if(!error) {
				console.log(result.results);
				$scope.items = APIDataParser.parse('events', result.results);
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
	$scope.navigateToItem = function(eventId) {
		$location.path('/event/'+eventId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.URLParamsObject.offset = $scope.items.length;
		$scope.URLParamsObject.orderBy = 'startDate';

		$scope.$apply(APIDataFactory.getEvents($scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, APIDataParser.parse('events', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});
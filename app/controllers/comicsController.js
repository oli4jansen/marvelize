app.controller("comicsController", function($scope, $location, $routeParams, APIDataFactory, parseDataFactory){

	$scope.init = function() {

		var URLParamsObject = {};

		if($routeParams.characterName && $routeParams.characterID ) {
			$scope.filterTitle = 'Comics with \''+$routeParams.characterName+'\'';
			URLParamsObject.characters = $routeParams.characterID;
		}

		APIDataFactory.getComics(URLParamsObject, function(error, result) {
			if(!error) {
				console.log(result.results);
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
	$scope.total = 0;

	// Function called by the ListView when a ListViewItem is clicked
	$scope.navigateToItem = function(comicId) {
		$location.path('/comic/'+comicId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.getComics({ offset: $scope.items.length }, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse('comics', result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});
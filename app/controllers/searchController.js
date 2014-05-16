app.controller("searchController", function($scope, $location, $routeParams, APIDataFactory){

	$scope.query = $routeParams.query;
	$scope.queryDecoded = decodeURIComponent($scope.query);
	$scope.searchResultsEmpty = false;

	$scope.init = function() {
		APIDataFactory.search($routeParams.query, 0, function(error, result) {
			if(!error) {

				$scope.items = $scope.parseDataForListView(result.results);
				$scope.total = result.total;

				if(result.total === 0) {
					$scope.searchResultsEmpty = true;
				}
				$scope.$apply();

			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

	/*
		Functions and vars that need to be implented for our ListView
	*/

	$scope.initialFormat = 'list';
	$scope.items = [];
	$scope.total = 0;

	$scope.parseDataForListView = function(data) {

		var parsedData = [];

		data.forEach(function(item){
			parsedData.push({
				id: item.id,
				title: item.name,
				image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
				description: item.comics.available+' comics available.'
			});
		});

		return parsedData;
	}

	$scope.navigateToItem = function(characterId) {
		$location.path('/character/'+characterId);
	}


	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.search($scope.query, $scope.items.length, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, $scope.parseDataForListView(result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});

app.controller("searchController", function($scope, $location, $routeParams, APIDataFactory, parseDataFactory){

	$scope.category = $routeParams.category;
	$scope.categoryList = ['characters', 'comics'];

	$scope.query = $routeParams.query;
	$scope.queryDecoded = decodeURIComponent($scope.query);
	$scope.searchResultsEmpty = false;

	$scope.init = function() {

		if($scope.categoryList.indexOf($scope.category) === -1) {
			$location.path('/');
		}

		APIDataFactory.search($scope.category, $routeParams.query, 0, function(error, result) {
			if(!error) {

				$scope.items = parseDataFactory.parse($scope.category, result.results);
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

	$scope.initialFormat = 'grid';
	$scope.items = [];
	$scope.total = 0;

	$scope.navigateToItem = function(itemId) {
		var categorySingular = $scope.category.slice(0, $scope.category.length-1);
		$location.path('/'+categorySingular+'/'+itemId);
	};


	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.search($scope.category, $scope.query, $scope.items.length, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, parseDataFactory.parse($scope.category, result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	};

	$scope.changeTab = function(tab) {
		if($scope.categoryList.indexOf(tab) > -1) {
			$location.path('/search/'+tab+'/'+$scope.query);
		}else{
			alert(tab);
		}
	};

});

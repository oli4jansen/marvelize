app.controller("searchController", function($scope, $location, $routeParams, APIDataFactory){

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

	$scope.initialFormat = 'grid';
	$scope.items = [];
	$scope.total = 0;

	$scope.parseDataForListView = function(data) {

		var parsedData = [];

		data.forEach(function(item){

			switch($scope.category) {
				case 'characters':
					var parsedItem = {
										id: item.id,
										title: item.name,
										image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
										description: item.comics.available+' comics available.'
									 };
					break;
				case 'comics':
					var parsedItem = {
										id: item.id,
										title: item.title,
										image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
										description: '$'+item.prices[0].price
									 };
					break;
				default:
					var parsedItem = {};
					break;
			}

			parsedData.push(parsedItem);
		});

		return parsedData;
	};

	$scope.navigateToItem = function(characterId) {
		$location.path('/'+$scope.category+'/'+characterId);
	};


	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.search($scope.query, $scope.items.length, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, $scope.parseDataForListView(result.results));
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

app.controller("searchController", function($scope, $location, $routeParams, $sce, APIDataFactory, parseDataFactory){

	$scope.category = $routeParams.category;
	$scope.categoryList = ['characters', 'series'];

	$scope.query = $routeParams.query;
	$scope.filterTitle = 'Searching for \''+decodeURIComponent($scope.query)+'\'.';

	$scope.filterResultsEmpty = false;

	$scope.init = function() {

		if($scope.categoryList.indexOf($scope.category) === -1) {
			$location.path('/');
		}

		APIDataFactory.search($scope.category, $routeParams.query, 0, function(error, result) {
			if(!error) {

				$scope.items = parseDataFactory.parse($scope.category, result.results);
				$scope.total = result.total;

				if(result.total === 0) {
					$scope.filterResultsEmpty = true;

					var tryOtherCat = 'Maybe try ';
					
					var index = $scope.categoryList.indexOf($scope.category);
					if($scope.categoryList[index+1]) {
						$scope.nothingFoundHint = $sce.trustAsHtml('We\'ll now search for '+$scope.categoryList[index+1]);
						$scope.navigate('search/'+$scope.categoryList[index+1]+'/'+$scope.query);
					}else{
						$scope.nothingFoundHint = $sce.trustAsHtml('Marvel restictions: your query has to be the <u>beginning of a character or series</u>.<br><br>I.e: <i>\'Iro\'</i> will find <i>\'Iron Man\'</i> but <i>\'ron Man\'</i> won\'t.');
					}
				}
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
		var categorySingular = $scope.category;
		if(categorySingular !== 'series') categorySingular = categorySingular.slice(0, categorySingular.length-1);

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

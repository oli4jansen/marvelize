app.controller("comicsController", function($scope, $location, APIDataFactory){

	$scope.init = function() {
		APIDataFactory.getComics(0, function(error, result) {
			if(!error) {
				console.log(result.results);
				$scope.items = $scope.parseDataForListView(result.results);
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

	// Parsing the data from APIDataFactory to usable data for the ListView directive
	$scope.parseDataForListView = function(data) {

		var parsedData = [];

		data.forEach(function(item){
			parsedData.push({
				id: item.id,
				title: item.title,
				image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
				description: '$'+item.prices[0].price
			});
		});

		return parsedData;
	}

	// Function called by the ListView when a ListViewItem is clicked
	$scope.navigateToItem = function(comicId) {
		$location.path('/comic/'+comicId);
	}

	$scope.getMoreItemsPlease = function() {
		$scope.$apply(APIDataFactory.getComics($scope.items.length, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, $scope.parseDataForListView(result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	}

});
/*
	Name: listController
	Description: Creates and shows lists of data. Overviews of all characters, series, comics of events but also filtered lists (like: all characters in a certain comic).

	By: Olivier Jansen
*/

app.controller("listController", function($scope, $routeParams, $location, $sce, APIDataFactory, APIDataParser, APIErrorHandler){

	$scope.URLParamsObject = {};
	$scope.allCategories = ['characters', 'series', 'comics', 'events'];
	$scope.category = $routeParams.category;
	$scope.filterResultsEmpty = false;

	$scope.init = function() {

		// Only accept categories from the allCategories array
		if($scope.allCategories.indexOf($routeParams.category) == -1) {
			$scope.navigate('');
		}

		if($routeParams.association && ($routeParams.association == 'with' || $routeParams.association == 'in')) {

			var associationWith = $routeParams.associationWith
			if($routeParams.associationWith !== 'series') associationWith = associationWith+'s';

			// New URL parameter for APIDataFactory: add ID of associated item to list of IDs of this specific category
			$scope.URLParamsObject[associationWith] = $routeParams.ID;

			// Filter title is something like 'Comics with 'Iron Man'.'
			$scope.filterTitle = $scope.category.capitalize() + ' ' + $routeParams.association + ' \'' + $routeParams.name + '\'.';
			
			// Set up a back button to the associationWith item
			$scope.backButton = {
				type: $routeParams.associationWith,
				id: $routeParams.ID
			};

		}else if($routeParams.association) {
			// If the association type is not 'with' or 'in'; just show the overview
			$scope.navigate($scope.category);
		}else if($routeParams.query) {
			switch($scope.category) {
				case 'characters':
					var fieldToQuery = 'nameStartsWith';
					break;
				case 'series':
					var fieldToQuery = 'titleStartsWith';
					break;
				case 'comics':
					var fieldToQuery = 'titleStartsWith';
					break;
				case 'events':
					var fieldToQuery = 'nameStartsWith';
					break;
				default:
					var fieldToQuery = 'title';
					break;
			}

			$scope.URLParamsObject[fieldToQuery] = $routeParams.query;
			$scope.filterTitle = 'Searching for \'' + $routeParams.query + '\'.';
		}

		$scope.URLParamsObject.orderBy = 'modified';

		APIDataFactory.getList($scope.category, $scope.URLParamsObject, function(error, result) {
			if(!error) {
				console.log(result.results);
				$scope.items = APIDataParser.parse($scope.category, result.results);
				$scope.total = result.total;

				if(result.total === 0) {
					$scope.filterResultsEmpty = true;
					$scope.nothingFoundHint = $sce.trustAsHtml('Marvel restictions: your query has to be the <u>beginning of a character or series</u>.<br>I.e: \'Iro\' will find \'Iron Man\' but \'ron Man\' won\'t.');
				}
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

	$scope.initialFormat = 'grid';
	$scope.items = [];
	$scope.tabs = $scope.allCategories;
	$scope.currentTab = $scope.category;
	$scope.total = 0;

	if($routeParams.association) {
		$scope.tabs = [];
		$scope.currentTab = '';
	}

	// Function called by the ListView when a ListViewItem is clicked
	$scope.navigateToItem = function(itemID) {
		var categorySingular = $scope.category;
		if(categorySingular !== 'series') categorySingular = categorySingular.slice(0, categorySingular.length-1);

		$location.path('/'+categorySingular+'/'+itemID);
	};

	$scope.getMoreItemsPlease = function() {
		$scope.URLParamsObject.offset = $scope.items.length;

		$scope.$apply(APIDataFactory.getList($scope.category, $scope.URLParamsObject, function(error, result) {
			if(!error) {
				$scope.items.push.apply($scope.items, APIDataParser.parse($scope.category, result.results));
				$scope.total = result.total;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		}));
	};

	$scope.changeTab = function(tab) {
		if($scope.tabs.indexOf(tab) > -1) {
			if($routeParams.query) {
				$scope.navigate('search/'+tab+'/'+$routeParams.query);
			}else{
				$scope.navigate(tab);
			}
		}else{
			alert(tab);
		}
	};

});
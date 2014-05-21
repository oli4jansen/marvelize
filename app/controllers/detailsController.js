app.controller("detailsController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, APIDataParser, APIErrorHandler){

	$scope.category = $routeParams.category;
	$scope.itemID = $routeParams.ID;

	$scope.itemData;

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getByID($scope.category, $scope.itemID, function(error, result) {
			if(!error) {
				$scope.itemData = result;
				$scope.itemData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.itemData.image = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;

				switch($scope.category) {
					case 'characters':
						$scope.descriptionIcon = 'person';
						$scope.lists = [
							{
								name: 'series',
								allPath: 'series/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
							}, {
								name: 'comics',
								allPath: 'comics/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
							}, {
								name: 'events',
								allPath: 'events/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
							}];
						break;

					case 'series':
						$scope.descriptionIcon = 'book';
						$scope.lists = [
							{
								name: 'characters',
								allPath: 'characters/in/series/'+$scope.itemData.title+'/'+$scope.itemData.id
							}, {
								name: 'comics',
								allPath: 'comics/in/series/'+$scope.itemData.title+'/'+$scope.itemData.id
							}, {
								name: 'events',
								allPath: 'events/in/series/'+$scope.itemData.title+'/'+$scope.itemData.id
							}];
						break;

					case 'comics':
						$scope.descriptionIcon = 'book';
						$scope.lists = [
							{
								name: 'characters',
								allPath: 'characters/in/comic/'+$scope.itemData.title+'/'+$scope.itemData.id
							}, {
								name: 'events',
								allPath: 'events/in/comic/'+$scope.itemData.title+'/'+$scope.itemData.id
							}];

						var resourceURISplit = $scope.itemData.series.resourceURI.split("/");
						$scope.seriesID = resourceURISplit[resourceURISplit.length-1];

						break;

					case 'events':
						$scope.descriptionIcon = 'book';
						$scope.lists = [
							{
								name: 'characters',
								allPath: 'characters/in/event/'+$scope.itemData.title+'/'+$scope.itemData.id
							}, {
								name: 'series',
								allPath: 'series/with/event/'+$scope.itemData.title+'/'+$scope.itemData.id
							}, {
								name: 'comics',
								allPath: 'comics/with/event/'+$scope.itemData.title+'/'+$scope.itemData.id
							}];
						break;
				}
			}else{
				APIErrorHandler.error(error);
			}
		});
	};

});
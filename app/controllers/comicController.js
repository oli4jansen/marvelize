app.controller("comicController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, APIDataParser, APIErrorHandler){

	$scope.itemID = $routeParams.ID;

	// Details.html needs:
	$scope.itemData; // Data object
	$scope.descriptionIcon = 'book'; // Description icon type

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getComic($scope.itemID, function(error, result) {
			if(!error) {
				$scope.itemData = result;
				$scope.itemData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.itemData.image = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;

				$scope.lists = [
					{
						name: 'characters',
						itemsTitleKey: 'name',
						allPath: 'characters/in/comic/'+$scope.itemData.title+'/'+$scope.itemData.id
					}, {
						name: 'events',
						itemsTitleKey: 'name',
						allPath: 'events/in/comic/'+$scope.itemData.title+'/'+$scope.itemData.id
					}]; // Array with keys from the data object to create lists for
			}else{
				APIErrorHandler.error(error);
			}
		});
	};

});
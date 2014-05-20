app.controller("characterController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, APIDataParser, APIErrorHandler){

	$scope.itemID = $routeParams.ID;

	// Details.html needs:
	$scope.itemData; // Data object
	$scope.descriptionIcon = 'person'; // Description icon type

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getCharacter($scope.itemID, function(error, result) {
			if(!error) {
				$scope.itemData = result;
				$scope.itemData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.itemData.image = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;

				$scope.lists = [
					{
						name: 'series',
						itemsTitleKey: 'name',
						allPath: 'series/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
					}, {
						name: 'comics',
						itemsTitleKey: 'name',
						allPath: 'comics/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
					}, {
						name: 'events',
						itemsTitleKey: 'name',
						allPath: 'events/with/character/'+$scope.itemData.name+'/'+$scope.itemData.id
					}]; // Array with keys from the data object to create lists for
			}else{
				APIErrorHandler.error(error);
			}
		});
	};

});
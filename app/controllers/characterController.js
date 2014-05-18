app.controller("characterController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, parseDataFactory){

	$scope.characterID = $routeParams.characterID;
	$scope.characterData;

	$scope.characterImage;

	$scope.initialFormat = 'list';
	$scope.tabs = [];
	$scope.currentTab = '';

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getCharacter($routeParams.characterID, function(error, result) {
			if(!error) {
				$scope.characterData = result;
				$scope.seriesData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.characterImage = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

});

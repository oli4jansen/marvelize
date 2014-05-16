app.controller("characterController", function($scope, $rootScope, $routeParams, APIDataFactory){

	$scope.characterID = $routeParams.characterID;
	$scope.characterData;

	$scope.characterImage;

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getCharacter($routeParams.characterID, function(error, result) {
			if(!error) {
				$scope.characterData = result;
				$scope.characterImage = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;

				$scope.characterShortComicList = result.comics.items.splice(0, 3);
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

});

app.controller("eventController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, parseDataFactory){

	$scope.eventID = $routeParams.eventID;
	$scope.eventData;

	$scope.eventImage;

	$scope.initialFormat = 'list';
	$scope.tabs = [];
	$scope.currentTab = '';

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getEvent($routeParams.eventID, function(error, result) {
			if(!error) {
				$scope.eventData = result;
				$scope.eventData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.eventImage = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;
			}else{
				alert('Error: '+JSON.stringify(error));
			}
		});
	};

});

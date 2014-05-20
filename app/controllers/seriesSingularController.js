app.controller("seriesSingularController", function($scope, $rootScope, $sce, $routeParams, APIDataFactory, APIDataParser, APIErrorHandler){

	$scope.seriesID = $routeParams.seriesID;
	$scope.seriesData;

	$scope.seriesImage;

	$scope.initialFormat = 'list';
	$scope.tabs = [];
	$scope.currentTab = '';

	$rootScope.coverActive = true;

	$scope.init = function() {
		APIDataFactory.getSeriesSingular($routeParams.seriesID, function(error, result) {
			if(!error) {
				$scope.seriesData = result;
				$scope.seriesData.descriptionHTML = $sce.trustAsHtml(result.description);
				$scope.seriesImage = result.thumbnail.path+'/landscape_incredible.'+result.thumbnail.extension;
			}else{
				APIErrorHandler.error(error);
			}
		});
	};

});

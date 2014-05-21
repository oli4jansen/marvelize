var app = angular.module('marvelize', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/views/index.html',
		controller:  'indexController'

	}).when('/search/:category/:query', {
		templateUrl: 'app/views/filtered.html',
		controller:  'listController'

	}).when('/:category', {
		templateUrl: 'app/views/simpleListView.html',
		controller:  'listController'
	}).when('/:category/:ID', {
		templateUrl: 'app/views/details.html',
		controller:  'detailsController'
	}).when('/:category/:association/:associationWith/:name/:ID', {
		templateUrl: 'app/views/filtered.html',
		controller:  'listController'

	}).otherwise(
	{
		redirectTo: '/'
	});

}).run( function($rootScope) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.coverActive = false;
		$rootScope.showMobileMenu = false;

		console.log(next);
    });
 });

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

angular.bootstrap(document.getElementById("document"), ['marvelize']);
var app = angular.module('marvelize', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/views/index.html',
		controller:  'indexController'

	}).when('/character/:ID', { // Details page for one character
		templateUrl: 'app/views/details.html',
		controller:  'characterController'
	}).when('/series/:ID', { // Details page for one series
		templateUrl: 'app/views/details.html',
		controller:  'seriesController'
	}).when('/comic/:ID', { // Details page for one comic
		templateUrl: 'app/views/details.html',
		controller:  'comicController'
	}).when('/event/:ID', { // Details page for one event
		templateUrl: 'app/views/details.html',
		controller:  'eventController'

	}).when('/search/:category/:query', {
		templateUrl: 'app/views/filtered.html',
		controller:  'listController'
	}).when('/:category', {
		templateUrl: 'app/views/simpleListView.html',
		controller:  'listController'
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
var app = angular.module('MarvelBrowser', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {

	$routeProvider.when('/', {

		templateUrl: 'app/views/index.html',
		controller:  'indexController'

	}).when('/search/:category/:query', {

		templateUrl: 'app/views/filtered.html',
		controller:  'searchController'

	}).when('/characters', {

		templateUrl: 'app/views/simpleListView.html',
		controller:  'charactersController'

	}).when('/character/:characterID', {

		templateUrl: 'app/views/character.html',
		controller:  'characterController'

	}).when('/series', {

		templateUrl: 'app/views/simpleListView.html',
		controller:  'seriesController'

	}).when('/series/with/:characterName/:characterID', {

		templateUrl: 'app/views/filtered.html',
		controller:  'seriesController'

	}).otherwise(
	{
		redirectTo: '/'
	});

}).run( function($rootScope) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.coverActive = false;
    });
 });


angular.bootstrap(document.getElementById("document"), ['MarvelBrowser']);
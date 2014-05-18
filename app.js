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

	}).when('/comics', {

		templateUrl: 'app/views/simpleListView.html',
		controller:  'comicsController'

	}).when('/comics/with/:characterName/:characterID', {

		templateUrl: 'app/views/filtered.html',
		controller:  'comicsController'

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
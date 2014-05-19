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
	}).when('/characters/in/:seriesName/:seriesID', {
		templateUrl: 'app/views/filtered.html',
		controller:  'charactersController'

	}).when('/series', {
		templateUrl: 'app/views/simpleListView.html',
		controller:  'seriesController'
	}).when('/series/:seriesID', {
		templateUrl: 'app/views/series.html',
		controller:  'seriesSingularController'
	}).when('/series/with/:characterName/:characterID', {
		templateUrl: 'app/views/filtered.html',
		controller:  'seriesController'

	}).when('/comics', {
		templateUrl: 'app/views/simpleListView.html',
		controller:  'comicsController'
	}).when('/comics/from/:seriesName/:seriesID', {
		templateUrl: 'app/views/filtered.html',
		controller:  'comicsController'

	}).otherwise(
	{
		redirectTo: '/'
	});

}).run( function($rootScope) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.coverActive = false;
		$rootScope.showMobileMenu = false;
    });
 });


angular.bootstrap(document.getElementById("document"), ['MarvelBrowser']);
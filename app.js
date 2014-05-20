var app = angular.module('marvelize', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/views/index.html',
		controller:  'indexController'

	}).when('/search/:category/:query', {
		templateUrl: 'app/views/filtered.html',
		controller:  'searchController'

	}).when('/characters', { // Characters overview
		templateUrl: 'app/views/simpleListView.html',
		controller:  'charactersController'
	}).when('/character/:ID', { // Details page for one character
		templateUrl: 'app/views/details.html',
		controller:  'characterController'
	}).when('/characters/in/series/:seriesName/:seriesID', { // All characters in a series
		templateUrl: 'app/views/filtered.html',
		controller:  'charactersController'
	}).when('/characters/in/event/:eventName/:eventID', { // All characters in an event
		templateUrl: 'app/views/filtered.html',
		controller:  'charactersController'
	}).when('/characters/in/comic/:comicName/:comicID', { // All characters in a comic
		templateUrl: 'app/views/filtered.html',
		controller:  'charactersController'

	}).when('/series', { // Series overview
		templateUrl: 'app/views/simpleListView.html',
		controller:  'seriesController'
	}).when('/series/:ID', { // Details page for one series
		templateUrl: 'app/views/details.html',
		controller:  'seriesSingularController'
	}).when('/series/with/character/:characterName/:characterID', { // All series with a character
		templateUrl: 'app/views/filtered.html',
		controller:  'seriesController'
	}).when('/series/with/event/:eventName/:eventID', { // All series with an event
		templateUrl: 'app/views/filtered.html',
		controller:  'seriesController'

	}).when('/comics', { // Comics overview
		templateUrl: 'app/views/simpleListView.html',
		controller:  'comicsController'
	}).when('/comic/:ID', { // Details page for one comic
		templateUrl: 'app/views/details.html',
		controller:  'comicController'
	}).when('/comics/in/series/:seriesName/:seriesID', { // All comics in a series
		templateUrl: 'app/views/filtered.html',
		controller:  'comicsController'
	}).when('/comics/with/event/:eventName/:eventID', { // All comics with an event
		templateUrl: 'app/views/filtered.html',
		controller:  'comicsController'
	}).when('/comics/with/character/:characterName/:characterID', { // All comics with a character
		templateUrl: 'app/views/filtered.html',
		controller:  'comicsController'

	}).when('/events', { // Events overview
		templateUrl: 'app/views/simpleListView.html',
		controller:  'eventsController'
	}).when('/event/:ID', { // Details page for one event
		templateUrl: 'app/views/details.html',
		controller:  'eventController'
	}).when('/events/with/character/:characterName/:characterID', { // All events with a cbaracter
		templateUrl: 'app/views/filtered.html',
		controller:  'eventsController'
	}).when('/events/in/series/:seriesName/:seriesID', { // All events in a series
		templateUrl: 'app/views/filtered.html',
		controller:  'eventsController'
	}).when('/events/in/comic/:comicName/:comicID', { // All events in a comic
		templateUrl: 'app/views/filtered.html',
		controller:  'eventsController'

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

angular.bootstrap(document.getElementById("document"), ['marvelize']);
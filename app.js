// Angular app aanmaken
var app = angular.module('MarvelBrowser', ['ngRoute', 'ngAnimate']).config(function($routeProvider) {

	// Routes opgeven
	$routeProvider.when('/', {
		// Route / is de index pagina

		templateUrl: 'app/views/index.html',
		controller:  'indexController'

	}).when('/search/:query', {

		templateUrl: 'app/views/search.html',
		controller:  'searchController'

	}).when('/characters', {
		// Route / is de index pagina

		templateUrl: 'app/views/simpleListView.html',
		controller:  'charactersController'

	}).when('/character/:characterID', {
		// Route / is de index pagina

		templateUrl: 'app/views/character.html',
		controller:  'characterController'

	}).when('/comics', {
		// Route / is de index pagina

		templateUrl: 'app/views/simpleListView.html',
		controller:  'comicsController'

	}).otherwise(
	{
		redirectTo: '/'
	});

});

angular.bootstrap(document.getElementById("document"), ['MarvelBrowser']);
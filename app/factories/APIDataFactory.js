app.factory('APIDataFactory', function($http, $location, $route, $window, $sce, $rootScope) {

	var publicKey = '51053776bff9f684b08a41a47734167b';
	var marvelAPIEndpoint = 'http://gateway.marvel.com:80/v1/public/';
	var factory = {};

	$rootScope.loading = false;

	factory.pathToURL = function(path) {
		if(path.indexOf('?') === -1) {
			var url = marvelAPIEndpoint+path+'?apikey='+publicKey;
		}else{
			var url = marvelAPIEndpoint+path+'&apikey='+publicKey;
		}
		console.log(url);
		return url;
	}

	factory.search = function(category, query, offset, callback) {

		$rootScope.loading = true;

		switch(category) {
			case 'characters':
				var fieldToQuery = 'nameStartsWith';
				break;
			case 'comics':
				var fieldToQuery = 'titleStartsWith';
				break;
			default:
				var fieldToQuery = 'title';
				break;
		}

		var error = '';
		$http({method: 'GET', url: factory.pathToURL(category+'?'+fieldToQuery+'='+query+'&offset='+offset) }).success(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(false, data.data);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	/*
	Comics
	*/

	factory.getComics = function(offset, callback) {

		$rootScope.loading = true;

		var error = '';

		$http({method: 'GET', url: factory.pathToURL('comics?offset='+offset) }).success(function(data, status, headers, config) {
			$rootScope.loading = false;

			callback(false, data.data);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	/*
	Characters
	*/

	factory.getCharacters = function(offset, callback) {

		$rootScope.loading = true;

		var error = '';

		$http({method: 'GET', url: factory.pathToURL('characters?offset='+offset) }).success(function(data, status, headers, config) {
			$rootScope.loading = false;

			callback(false, data.data);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	factory.getCharacter = function(id, callback) {
		
		$rootScope.loading = true;

		var error = '';
		$http({method: 'GET', url: factory.pathToURL('characters/'+id) }).success(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(false, data.data.results[0]);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	return factory;
});

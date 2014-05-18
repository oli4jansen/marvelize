app.factory('APIDataFactory', function($http, $location, $route, $window, $sce, $rootScope) {

	var publicKey = '51053776bff9f684b08a41a47734167b';
	var marvelAPIEndpoint = 'http://gateway.marvel.com:80/v1/public/';
	var factory = {};

	$rootScope.loading = false;

	/*
	Utility functions
	*/

	factory.pathToURL = function(path) {
		var glue = '?';
		if(path.indexOf('?') > -1) glue = '&';

		var url = marvelAPIEndpoint+path+glue+'apikey='+publicKey+'&limit=50';
		console.log(url);
		return url;
	}

	factory.objectToURLParams = function(object) {

		var URLParams = '';
		var i = 0;
		var glue = '?';

		for(key in object) {
			URLParams = URLParams + glue + key + '=' + object[key];
			if(glue == '?') glue = '&';
		}

		console.log(URLParams);
		return URLParams;
	}

	/*
	Data-getting functions
	*/

	factory.search = function(category, query, offset, callback) {

		$rootScope.loading = true;

		switch(category) {
			case 'characters':
				var fieldToQuery = 'nameStartsWith';
				break;
			case 'series':
				var fieldToQuery = 'titleStartsWith';
				break;
			default:
				var fieldToQuery = 'title';
				break;
		}

		var error = '';
		$http({method: 'GET', url: factory.pathToURL(category+'?'+fieldToQuery+'='+query+'&offset='+offset), cache: true }).success(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(false, data.data);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	/*
	Series
	*/

	factory.getSeries = function(URLParamsObject, callback) {

		$rootScope.loading = true;

		var error = '';

		var URLParams = factory.objectToURLParams(URLParamsObject);

		$http({method: 'GET', url: factory.pathToURL('series'+URLParams), cache: true }).success(function(data, status, headers, config) {
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

		$http({method: 'GET', url: factory.pathToURL('characters?offset='+offset), cache: true }).success(function(data, status, headers, config) {
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
		$http({method: 'GET', url: factory.pathToURL('characters/'+id), cache: true }).success(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(false, data.data.results[0]);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});
	};

	return factory;
});

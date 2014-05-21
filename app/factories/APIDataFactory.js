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
	};

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
	};

	/*
	General functions
	*/

	factory.getList = function(type, URLParamsObject, callback) {
		
		$rootScope.loading = true;

		var error = '';

		var URLParams = factory.objectToURLParams(URLParamsObject);

		$http({method: 'GET', url: factory.pathToURL(type+URLParams), cache: true }).success(function(data, status, headers, config) {
			$rootScope.loading = false;

			callback(false, data.data);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});

	};

	factory.getByID = function(type, id, callback) {
		
		$rootScope.loading = true;

		var error = '';
		$http({method: 'GET', url: factory.pathToURL(type+'/'+id), cache: true }).success(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(false, data.data.results[0]);
		}).error(function(data, status, headers, config) {
			$rootScope.loading = false;
			callback(data, []);
		});

	};

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
			case 'comics':
				var fieldToQuery = 'titleStartsWith';
				break;
			case 'events':
				var fieldToQuery = 'nameStartsWith';
				break;
			default:
				var fieldToQuery = 'title';
				break;
		}

		var URLParamsObject = {};
		URLParamsObject[fieldToQuery] = query;
		URLParamsObject.offset = offset;

		factory.getList(category, URLParamsObject, callback);
	};

	factory.getSeries = function(id, callback) { factory.getByID('series', id, callback); };
	factory.getCharacter = function(id, callback) { factory.getByID('characters', id, callback); };
	factory.getComic = function(id, callback) { factory.getByID('comics', id, callback) };
	factory.getEvent = function(id, callback) { factory.getByID('events', id, callback); };

	return factory;
});

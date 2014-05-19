app.factory('parseDataFactory', function() {

	var factory = {};

	factory.parse = function(type, data, parsedData) {

		var parsedData = parsedData || [];

		switch(type) {
			case 'characters':
				data.forEach(function(item){
					var parsedItem =
						{
							id: item.id,
							title: item.name,
							image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
							description: item.comics.available+' comics available.'
						};
					parsedData.push(parsedItem);
				});

				break;
			case 'series':
				data.forEach(function(item){
					var parsedItem =
						{
							id: item.id,
							title: item.title,
							image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
							description: item.comics.available+' comics available'
						};
					parsedData.push(parsedItem);
				});

				break;

			case 'comics':
				data.forEach(function(item){
					var date = new Date(item.dates[0].date);
					var parsedItem =
						{
							id: item.id,
							title: item.title,
							image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
							description: 'Released '+date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
						};
					parsedData.push(parsedItem);
				});

				break;
		}

		return parsedData;
	}

	return factory;
});
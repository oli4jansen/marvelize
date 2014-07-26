app.factory('APIDataParser', function() {

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
							description: item.comics.available+' comics available.'
						};
					if(item.thumbnail && item.thumbnail.path && item.thumbnail.extension) parsedItem.image = item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension;

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

			case 'events':
				data.forEach(function(item){
					if(item.start == item.end) {
						var description = item.start.slice(0, 10);
					}else{
						var description = item.start.slice(0, 10) +' - ' + item.end.slice(0, 10);
					}

					var parsedItem =
						{
							id: item.id,
							title: item.title,
							image: item.thumbnail.path+'/landscape_amazing.'+item.thumbnail.extension,
							description: description
						};
					parsedData.push(parsedItem);
				});

				break;
		}

		return parsedData;
	}

	return factory;
});
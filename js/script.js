$(function () {
	var apiKey = "6850d68a49eaa7bc04219a49a4b4ce68"; //api key variable

	$('form').hide(); //Hide the forms in the beginning

	//Showing and hiding the forms when clicked on the heading
	$('h2').on('click', function () {
		if ($($(this).next()).is(':visible')) {
			$('form').hide(); //Hide the forms in the beginning
			$(this).next().hide();
			$('.weather').remove();
		} else {
			$('.weather').remove();
			$('form').hide(); //Hide the forms in the beginning
			$(this).next().show();
		}
	});


	//Event handler to get the data
	$('form').on('submit', function (e) {
		console.log($(this).serializeArray());
		e.preventDefault();
		$('.weather').remove();
		var valEntered = $(this).serializeArray();


		if (valEntered[0].name === 'zip' || valEntered[0].name === 'cty') {
			console.log("Zip=" + valEntered[0].value);
			getWeatherData(valEntered[0].value);
		}

		if (valEntered[0].name === 'lat') {
			console.log("lat=" + valEntered[0].value);
			console.log("lon=" + valEntered[1].value);
			getWeatherData(valEntered[0].value, valEntered[1].value);
		}

	});

	//Function to get json data for city and zip
	function getWeatherData(valueEnt, valueEnt2) {

		console.log("value entered=" + valueEnt);

		if (valueEnt === $('#zip').val()) {
			var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?zip=' + valueEnt + ',us&appid=' + apiKey;
		}

		if (valueEnt === $('#cty').val()) {
			var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=' + valueEnt + ',us&appid=' + apiKey;
		}

		if (valueEnt === $('#lat').val()) {
			var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?lat=' + valueEnt + '&lon=' + valueEnt2 + '&appid=' + apiKey;
		}
		$.getJSON(weatherApi)
			.done(function (data) {
				addNewItem(data);
			}).fail(function () {
				$('form').append('<p> Can not load data </p>');
			});
	}


	//Function to add weather data to the page
	function addNewItem(data) {
		var item = '';
		item += '<h3>Weather info for' + ' ' + data.name + '</h3>';
		item += '<p>Current Temperature: ' + convertTemp(data.main.temp) + 'F</p>';
		item += '<p>Current Conditions: ' + data.weather[0].description + '</p>';
		item += '<p>Min Temperature: ' + convertTemp(data.main.temp_min) + '</p>';
		item += '<p>Max Temperature: ' + convertTemp(data.main.temp_max) + '</p>';
		$('form').append('<div class=weather>' + item + '</div>');
	}

	//Function to convert Temperature
	function convertTemp(temp) {
		return Math.round((temp * 1.8) - 459.67);
	}
})
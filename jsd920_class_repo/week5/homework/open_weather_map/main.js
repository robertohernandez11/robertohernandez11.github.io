/*
Open Weather Map Instructions:

1)
- Use either $.ajax or $.get to GET the current weather data for New York City
- Use the API docs to figure out how to properly structure the weatherUrl below (http://openweathermap.org/current)
	- Hint: search the docs for "city name"
- Be sure to include in the weatherUrl the option to receive data in your units of choice (imperial, metric, etc.)
	- Hint: search the docs for "units format"
- First, print the response to the console, then, using the API's response, print the following data to #nyc-weather:
	- The current "temp"
	- The current "hummidity"
	- The current wind "speed"

2)
- Add a form to to the index.html page that allows the user to enter a city and a state
- Capture this form's submit event and dynamically create the weatherUrl below from the user's input
- Print this result to the DOM

3) Bonus:
- Change the background color based on the temperature; ie colder temps should be blue, and hotter temps red

4) Intermediate Bonus:
- Implement handlebars.js templates :)

5) Legendary Bonus:
- Sign up for the flicker API: https://www.flickr.com/services/api/
- Use the flicker search photo library: https://www.flickr.com/services/api/flickr.photos.search.html
- Hint: you will have to convert the responses from the search API into images: https://www.flickr.com/services/api/misc.urls.html
- Instead of changing the background color based on temperature, change the background to first result the flicker API returns for the city
- Ex: user enters "Brooklyn" - search flicker API for "Brooklyn" and use the first image

*/
$(document).ready(function () {

    var clearInfo = document.getElementById("clear");
    $("#getTemp").click(function () {
        var city_user = $('.city').val();

        var apiKey = '&APPID=f771001bca3114e29588bb918bfb4670';
        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q= ' + city_user;

        $.ajax({
            // url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city_user + '&APPID=f771001bca3114e29588bb918bfb4670',
            url: weatherUrl + apiKey,
            type: 'GET',
            dataType: "JSON",
            success: function (response) {

                console.log(response);

                var kelvinToFarenheight = (( response.main.temp - 273.15) * 9 / 5) + 32;
                kelvinToFarenheight = kelvinToFarenheight.toString().substr(0, 4);

                $("#showTemp")[0].innerHTML += " " + kelvinToFarenheight + " F";
                $("#showHum")[0].innerHTML += " " + response.main.humidity;
                $("#showWind")[0].innerHTML += " " + response.wind.speed;

            },
            error: function (response) {
                console.log('An error occurred:');
                console.log(response);
            }
        })
    });


    clearInfo.addEventListener("click", function () {
        $("#showTemp")[0].innerHTML = "Temperature:"
        $("#showHum")[0].innerHTML = "Humidity:";
        $("#showWind")[0].innerHTML = "Wind Speed:";
    });
});



// $(document).ready(function () {
// 	$("#getTemp").click(function() {
//     	var city = $('#location').val();
//     	$('#location').val("");
//     })

//  $("#getTemp").click(function() {
//  	console.log($("#showTemp").text());
//  	if($("#showTemp").text() = "temperature") {
//  		var showTemp = "temperature"("");

//  }
 
//     })

//   var apiKey = 'f771001bca3114e29588bb918bfb4670';
//   var weatherUrl = 'api.openweathermap.org/data/2.5/weather?q={city name}';

//   $.ajax({
// 	  url: 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=f771001bca3114e29588bb918bfb4670',
// 	  type: 'GET',
// 	  dataType: "JSON",
// 	  success: function (response) {
// 	  	console.log(response);
// 	  },
// 	  error: function (xhr) {
// 	    console.log('An error occurred:');
// 		console.log(xhr);
// 	  }
// 	})
//   });



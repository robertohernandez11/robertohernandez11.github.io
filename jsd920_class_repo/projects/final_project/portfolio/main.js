$(document).ready(function() {
    var apiKey = '19ab861f15cfd2e8216a3be1ed615598';
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial&q=';

    // Problem 1
    $.get(weatherUrl + 'New York City')
        .fail(function(xhr) {
            console.log(xhr);
        })
        .done(function(response) {
            console.log(response);

            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;

            $('#nyc-weather')
                .append('<p>Temperature: ' + temp + '</p>')
                .append('<p>Humidity: ' + humidity + '</p>')
                .append('<p>Wind Speed: ' + windSpeed + '</p>')
            $("#msg")
            .append("<p>Roberto Hernandez")
            .append("<p>Front-End Web Developer")

        })
        // .fail(function (xhr) {
        //  console.log(xhr);
        // });

    // Problem 2
    $('#weather-form').submit(function(event) {
        event.preventDefault();

        // get user input
        var city = $('#city').val();
        var state = $('#state').val();

        $.ajax({
            url: weatherUrl + city + ',' + state,
            type: 'GET',
            success: function(response) {
                // pipe AJAX reponse to outside function for cleaner code
                outputWeather(response);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    })

    function outputWeather(response) {
        console.log(response);

        var city = response.name;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        // change background color
        colorBackground(temp);

        $('#weather-output')
            .empty() // be sure to clear out any data from previous searches!
            .append('<p>City: ' + city + '</p>')
            .append('<p>Temperature: ' + temp + '</p>')
            .append('<p>Humidity: ' + humidity + '</p>')
            .append('<p>Wind Speed: ' + windSpeed + '</p>')

        // Intermediate Bonus: handlebars.js
        // var template = Handlebars.compile($('#weather-template').html());

        // // create an object to pass into the template; use the variables above
        // var weatherObj = {
        //   city: city,
        //   temp: temp,
        //   humidity: humidity,
        //   windSpeed: windSpeed,
        // }

        // $('#weather-output').append(template(weatherObj));
    }


    //change background color based on temperature
    function colorBackground(temp) {
        if (temp > 70) {
            $('.container').css('background', 'red');
        } else {
            $('.container').css('background', 'blue');
        } 
    }

    $('#clickme').click(function(event) {
        event.preventDefault();
        var apiKey = '963e108b3e21fb75d02fc3f49a345f13';
        var newCity = $('#city').val();
        var newState = $('#state').val();
        var newWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + newCity + ',' + newState + '&units=imperial&appid=' + apiKey;


        function addToDOM(data) {
            $('#weather-summary2').append('<p>' + 'Here are some of the weather details in ' + newCity + ', ' + newState + ':' + '</p>');
            $('#weather-summary2').append('<li>' + 'Temp : ' + data.main.temp + ' ˚F' + '</li>');
            $('#weather-summary2').append('<li>' + 'Humidity: ' + data.main.humidity + '</li>');
            $('#weather-summary2').append('<li>' + 'Wind speed (mph): ' + data.wind.speed + '</li>');
        }

        // function changeColor(data){
        //     var temp = parseInt(data.main.temp);     
        //     // console.log(temp);
        //     if (temp < 65){
        //       $('body').css('background-color', 'blue');
        //     } else {
        //       $('body').css('background-color', 'red');
        //     }
        //     // } else if (temp <= 85){
        //     //   $('body').css('background-color', 'purple');
        //     // } else {
        //     //   $('body').css('background-color', 'red');
        //     // }
        // }


        function setPicture(data) {
            // console.log('hi');
            var apiKey = '5888f4afcee00eca4cd92576788b1498';
            var newCity = $('#city').val();
            var picUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&tags=' + newCity + '&format=json&nojsoncallback=1';
            $.ajax({
                url: picUrl,
                type: 'GET',
                success: function(data) {
                    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
                    var farmId = data.photos.photo[0].farm;
                    var serverID = data.photos.photo[0].server;
                    var id = data.photos.photo[0].id;
                    var secret = data.photos.photo[0].secret;
                    var imgUrl = 'https:' + '//' + 'farm' + farmId + '.staticflickr.com' + '/' + serverID + '/' + id + '_' + secret + '.jpg';
                    console.log(imgUrl);
                    $('body').css({ 'background-image': 'url(' + imgUrl + ')' })
                    $('body').css("color", "white")
                },
                error: function(response) {
                    console.log(response);

                }
            });
        }

        $.ajax({
            url: newWeatherUrl,
            type: 'GET',
            success: function(data) {
                setPicture(data);
                // changeColor(data);
                $('#city').val('');
                $('#state').val('');
                $('input:text:first').focus();
            }

        });

    });

});

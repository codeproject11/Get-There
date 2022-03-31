// variable to access main search form in js (to apply submit event listener to);
var inputForm = document.querySelector('#search-form');
var userInput = document.querySelector("#city");

var storeInput = function (event) {
    event.preventDefault();
    var input = document.querySelector("input[id='city']").value;
    if (input) {
        userInput.value = "";
        console.log(input);
        getCity(input);
    } else {
        alert("Please enter a city name")
    }

}

inputForm.addEventListener("submit", storeInput);
// store main div or section in variable to use in appending

// fetch apis (multiple)
var getCity = function (cityName) {
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data.length === 0) {
                        alert("Please enter a valid city name")
                    } else {
                        destinationCityWeather(data[0].lat, data[0].lon, data[0].name)
                    };
                });
            };
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
};

var destinationCityWeather = function (lat, lon, name) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data)
                    console.log(name)
                });
            };
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });

};

// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
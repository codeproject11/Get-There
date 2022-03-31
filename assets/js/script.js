// variable to access main search form in js (to apply submit event listener to);
var inputForm = document.querySelector('#search-form');
var destinationInput = document.querySelector("#destinationCity");
var currentInput = document.querySelector("#currentCity");
// openweather API = f9dcdf6690d0d22c5198371e258e8bb2
// opentrip API = 5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98

var storeInput = function (event) {
    event.preventDefault();
    var destinationCity = document.querySelector("input[id='destinationCity']").value;
    var currentCity = document.querySelector("input[id='currentCity']").value;
    if (destinationCity && currentCity) {
        destinationInput.value = "";
        currentInput.value = "";
        getCity(destinationCity, currentCity);
    } else {
        alert("Please enter a city name")
    }

}

inputForm.addEventListener("submit", storeInput);
// store main div or section in variable to use in appending

// fetch apis (multiple)
// function to use user inputted destination city and current city and generate data from API
var getCity = function (destinationCity, currentCity) {
    var destinationCityAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + destinationCity + "&limit=1&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    var currenCityAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + currentCity + "&limit=1&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    fetch(destinationCityAPIURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data.length === 0) {
                        alert("Please enter a valid city name")
                    } else {
                        weatherData(data[0].lat, data[0].lon, data[0].name)
                        // attractions(data[0].lon, data[0].lat)
                    };
                });
            };
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
    fetch(currenCityAPIURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    if (data.length === 0) {
                        alert("Please enter a valid city name")
                    } else {
                        console.log(`Current City: ${data[0].name}`)
                        console.log(`Current City Coordinates: Lat- ${data[0].lat}, Lon- ${data[0].lon}`)
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


// API to get the lat and lon from getCity() and fetch data from an API to retrieve weather information for the destination city
var weatherData = function (lat, lon, name) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(`Destination City: ${name}`)
                    console.log(data)

                });
            };
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
};


// function to find attractions at destination city. returns 10 natural attractions within a 10k radius of the coordinates of the destination city inputted
// var attractions = function (lon, lat) {
//     var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&kinds=natural&limit=10&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

//     fetch(apiURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     console.log(data)
//                 })
//             }
//         })
// }

// function to find flights from the current city to the destination city




// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
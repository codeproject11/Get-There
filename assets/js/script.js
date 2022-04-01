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
                        attractions(data[0].lon, data[0].lat)
                        restaurants(data[0].lon, data[0].lat)
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
var attractions = function (lon, lat) {
    var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&kinds=natural&limit=10&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data)
                })
            }
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
}

// function to find restaurants within a 10 km radius of the destination city coordinates
var restaurants = function (lon, lat) {
    var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&kinds=restaurants&limit=10&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data)
                })
            }
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
}
// use destination id to grab hotel data
var getHotels = function (destId) {
    // update fetch url to include check in and checkout dates as user input variables when available --> note for taimur
    fetch('https://hotels4.p.rapidapi.com/properties/list?destinationId=' + destId + '&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=BEST_SELLER&locale=en_US&currency=CAD', options)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data.data.body)
                        displayHotels(data.data.body.searchResults.results);
                    })
            } else {
                // change to modal
                alert("Enter a valid city name");
            }
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
}

var displayHotels = function (hotels) {
    mainArea.innerHTML = "";
    for (var i = 0; i < 11; i++) {

        hotelDivEl = document.createElement("div");
        hotelHeadEl = document.createElement("h2");
        hotelHeadEl.textContent = hotels[i].name;

        hotelPriceEl = document.createElement("p");

        if (hotels[i].ratePlan) {
            hotelPriceEl.textContent = hotels[i].ratePlan.price.current;
        } else {
            hotelPriceEl.textContent = "There are no pricing details for this hotel."
        }

        hotelDivEl.appendChild(hotelHeadEl);
        hotelDivEl.appendChild(hotelPriceEl);
        mainArea.appendChild(hotelDivEl);
    }
};
// add event listener to form
inputForm.addEventListener("submit", storeInput);




// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
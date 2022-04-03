// variable to access main search form in js (to apply submit event listener to);
var inputButton = document.querySelector('#search');
var hotelArea = document.querySelector('#hotel-area');

// api details for hotel api
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': '4095781a70mshead3ea36f5198b9p145325jsn70b930dd6ab8'
    }
};

// openweather API = f9dcdf6690d0d22c5198371e258e8bb2
// opentrip API = 5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98

// store user input and send into api functions
var storeInput = function (event) {
    event.preventDefault();
    var destinationCity = document.querySelector("input[id='destination']").value;
    var currentCity = document.querySelector("input[id='currentAirport']").value;

    inputButton.classList.add("is-loading");
   
    if (destinationCity && currentCity) {
        document.querySelector("input[id='destination']").value = '';
        document.querySelector("input[id='currentAirport']").value = "";
        getCity(destinationCity, currentCity);
        getCityId(destinationCity);
    } else {
        alert("Please enter a city name")
        inputButton.classList.remove("is-loading");
    }

}

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
            inputButton.classList.remove("is-loading");
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
                        inputButton.classList.remove("is-loading");
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



// uses api to get city destination id from user input and sends it to other hotels api
var getCityId = function (input) {
    fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + input + "&locale=en_US", options)
        .then(function (response) {
            if (response.status === 200) {
                response.json()
                    .then(function (data) {
                        if (data.moresuggestions !== 0) {
                            var destId = data.suggestions[0].entities[0].destinationId;
                            console.log(destId);
                            getHotels(destId);
                        } else {
                            alert('Enter a valid city name');
                            inputButton.classList.remove("is-loading");
                        }
                    })
            } else {
                // change to modal
                alert("Enter a valid city name");
                inputButton.classList.remove("is-loading");
            }
        })
        .catch(err => console.error(err));
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
                inputButton.classList.remove("is-loading");
            }
        })
}

var displayHotels = function (hotels) {
    hotelArea.innerHTML = "";
    for (var i = 0; i < 5; i++) {
        
        var hotelDivEl = document.createElement("div");
        hotelDivEl.classList = "column is-one-fifth-tablet is-half-mobile";
        var hotelHeadEl = document.createElement("h4");
        hotelHeadEl.textContent = hotels[i].name;

        var hotelPriceEl = document.createElement("p");

        if (hotels[i].ratePlan) {
            hotelPriceEl.textContent = hotels[i].ratePlan.price.current;
        } else {
            hotelPriceEl.textContent = "There are no pricing details for this hotel."
        }

        var hotelInfoArr = [
            "Address: " + hotels[i].address.streetAddress,
            "Star Rating: " + hotels[i].starRating,
            "Neighbourhood: " + hotels[i].neighbourhood
        ]

        var hotelInfoEl = document.createElement("ul");
        
        for (var x = 0; x < hotelInfoArr.length; x++) {
            var hotelInfoListEl = document.createElement("li");
            hotelInfoListEl.textContent = hotelInfoArr[x];
            hotelInfoEl.appendChild(hotelInfoListEl);
        }
        
        hotelDivEl.appendChild(hotelHeadEl);
        hotelDivEl.appendChild(hotelPriceEl);
        hotelDivEl.appendChild(hotelInfoEl);

        // use another API to get hotel first hotel photo available
        getHotelPhoto(hotels[i].id, hotelDivEl);

        hotelArea.appendChild(hotelDivEl);
        inputButton.classList.remove("is-loading");
    }
};

// get hotel photos
var getHotelPhoto = function (id, selectedDiv) {
        fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=' + id, options)
        .then(function(response) {
            response.json()
            .then(function(data) {
                hotelImgUrl = data.hotelImages[0].baseUrl.replace("_{size}", "")
                displayHotelPhoto(hotelImgUrl, selectedDiv);
            })
        })
}

// display hotel photo to div 
var displayHotelPhoto = function (hotelImgUrl, selectedDiv) {
    var hotelImgEl = document.createElement("img");
    hotelImgEl.setAttribute("src", hotelImgUrl);
    hotelImgEl.className = "hotel-img";

    selectedDiv.appendChild(hotelImgEl);
}


// add event listener to form
inputButton.addEventListener("click", storeInput);


// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
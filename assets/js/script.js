// variable to access main search form in js (to apply submit event listener to);
var inputButton = document.querySelector('#search');
var hotelArea = document.querySelector('#hotel-area');
var hotelHeader = document.querySelector('#hotel-header')
var flightArea = document.querySelector(".flights")
var restaurantArea = document.querySelector(".restaurantSection")

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
    var currentAirport = document.querySelector("#currentAirport").value;
    var destinationAirport = document.querySelector("#destinationAirport").value;
    var passengers = document.querySelector("#passengerInput").value;
    inputButton.classList.add("is-loading");

    if (destinationCity && destinationAirport && currentAirport) {
        document.querySelector("input[id='destination']").value = '';
        document.querySelector("input[id='destinationAirport']").value = "";
        document.querySelector("input[id='currentAirport']").value = "";
        document.querySelector("input[id='passengerInput']").value = "";
        getCity(destinationCity);
        flights(currentAirport, destinationAirport, passengers)
        getCityId(destinationCity);
    } else {
        alert("Please enter a city name")
        inputButton.classList.remove("is-loading");
    }

}

// function to use user inputted destination city and current city and generate data from API
var getCity = function (destinationCity) {
    var destinationCityAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + destinationCity + "&limit=1&appid=f9dcdf6690d0d22c5198371e258e8bb2";
    fetch(destinationCityAPIURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (destinationData) {
                    if (destinationData.length === 0) {
                        alert("Please enter a valid city name")
                    } else {
                        // weatherData(destinationData[0].lat, destinationData[0].lon, destinationData[0].name)
                        restaurants(destinationData[0].lon, destinationData[0].lat)
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


// // API to get the lat and lon from getCity() and fetch data from an API to retrieve weather information for the destination city
var weatherData = function (lat, lon, name) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9dcdf6690d0d22c5198371e258e8bb2";

    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(`Destination City: ${name}`)
                    for (let i = 0; i < 5; i++) {
                        console.log(`${Math.floor((data.daily[i].temp.day) - 273.15)}°C`)
                        console.log(`${(data.daily[i].pop) * 100}%`)
                        console.log(data.daily[i].weather[0].icon)
                    }

                });
            };
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
};

// function to find restaurants within a 10 km radius of the destination city coordinates
var restaurants = function (lon, lat) {
    var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&rate=3&kinds=restaurants&limit=4&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log("Restaurants to Visit")
                    displayRestaurant(data.features)
                })
            }
        })
        .catch(function (error) {
            alert("Please Try Again");
            console.log(error);
            return
        });
}


// function to display restaurant information
var displayRestaurant = function (data) {
    restaurantArea.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let restaurantDivEl = document.createElement("div")
        restaurantDivEl.setAttribute("class", "column is-4-tablet is-3-desktop")

        let restaurantCardEl = document.createElement("div")
        restaurantCardEl.setAttribute("class", "card")

        let restaurantImageDiv = document.createElement("div")
        restaurantImageDiv.setAttribute("class", "card-image has-text-centered px-6")
        let restaurantImage = document.createElement("img")
        restaurantImage.setAttribute("class", "hotel-img")
        restaurantPictures(data[i].properties.xid, restaurantImage)
        restaurantImageDiv.appendChild(restaurantImage)

        let restaurantNameDiv = document.createElement("div")
        restaurantNameDiv.setAttribute("class", "card-content")
        let restaurantNameTitle = document.createElement("p")
        restaurantNameTitle.setAttribute("class", "title is-size-5")
        restaurantNameTitle.innerHTML = data[i].properties.name
        restaurantNameDiv.appendChild(restaurantNameTitle)

        let restaurantFooterEl = document.createElement("footer")
        restaurantFooterEl.setAttribute("class", "card-footer")
        let footerEl = document.createElement("p")
        footerEl.setAttribute("class", "card-footer-item")
        let footerLink = document.createElement("a")
        restaurantLinks(data[i].properties.xid, footerLink)
        footerLink.setAttribute("class", "has-text-grey")
        footerLink.innerHTML = "View Details"
        footerEl.appendChild(footerLink)
        restaurantFooterEl.appendChild(footerEl)

        restaurantCardEl.appendChild(restaurantImageDiv)
        restaurantCardEl.appendChild(restaurantNameDiv)
        restaurantCardEl.appendChild(restaurantFooterEl)

        restaurantDivEl.appendChild(restaurantCardEl)

        restaurantArea.appendChild(restaurantDivEl)
    }
}

// // function to get images of the restaurants founds 
var restaurantPictures = function (ID, restaurantImage) {
    var apiURL = "https://api.opentripmap.com/0.1/en/places/xid/" + ID + "?apikey=5ae2e3f221c38a28845f05b6a7256fbb0a8e27011d5f47ed9b0646e7"
    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    displayImage(data, restaurantImage)
                })
            }
        })
}

// function to get a wikipedia link of the restaurant found
var restaurantLinks = function (ID, footerLink) {
    var apiURL = "https://api.opentripmap.com/0.1/en/places/xid/" + ID + "?apikey=5ae2e3f221c38a28845f05b6a7256fbb0a8e27011d5f47ed9b0646e7"
    fetch(apiURL)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    insertLink(data, footerLink)
                })
            }
        })
}

// function to display the image of the restaurant into the webpage
var displayImage = function (data, restaurantImage) {
    restaurantImage.setAttribute("src", data.preview.source)
}

// function to add source to href of restuaurant link
var insertLink = function (data, footerLink) {
    footerLink.setAttribute("href", data.wikipedia)
}

// // uses api to get city destination id from user input and sends it to other hotels api
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

// // use destination id to grab hotel data
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
    // add "top {city} deals" header to hotel area
    hotelHeader.textContent = "Top " + hotels[0].address.locality + " City Deals";

    // clear up main area of hotel display
    hotelArea.innerHTML = "";

    for (var i = 0; i < 4; i++) {
        // create main div element for card
        var hotelMasterDivEl = document.createElement("div");
        hotelMasterDivEl.classList = "column is-4-tablet is-3-desktop is-flex-wrap-wrap";

        // create card div
        var hotelDivEl = document.createElement("div");
        hotelDivEl.classList = "card";

        // create image div and add children
        var hotelImgDivEl = document.createElement("div");
        hotelImgDivEl.className = "card-image has-text-centered px-6";
        getHotelPhoto(hotels[i].id, hotelImgDivEl);


        // create div for hotel name and price
        var hotelInfoDivEl = document.createElement("div");
        hotelInfoDivEl.className = "card-content";

        var hotelHeadEl = document.createElement("p");
        hotelHeadEl.className = "title is-size-5";
        hotelHeadEl.textContent = hotels[i].name;

        var hotelPriceEl = document.createElement("p");
        if (hotels[i].ratePlan) {
            hotelPriceEl.textContent = hotels[i].ratePlan.price.current;
        } else {
            hotelPriceEl.textContent = "Pricing Unavailable"
        }

        hotelInfoDivEl.appendChild(hotelHeadEl);
        hotelInfoDivEl.appendChild(hotelPriceEl);

        // create footer for card
        var hotelFooterEl = document.createElement("div");
        hotelFooterEl.className = "card-footer";
        hotelFooterEl.innerHTML = '<p class="card-footer-item"><a href="" class="has-text-grey">View Details</a></p>';



        // var hotelInfoArr = [
        //     "Address: " + hotels[i].address.streetAddress,
        //     "Star Rating: " + hotels[i].starRating,
        //     "Neighbourhood: " + hotels[i].neighbourhood
        // ]

        // var hotelInfoEl = document.createElement("ul");

        // for (var x = 0; x < hotelInfoArr.length; x++) {
        //     var hotelInfoListEl = document.createElement("li");
        //     hotelInfoListEl.textContent = hotelInfoArr[x];
        //     hotelInfoEl.appendChild(hotelInfoListEl);
        // }

        // append to card
        hotelDivEl.appendChild(hotelImgDivEl);
        hotelDivEl.appendChild(hotelInfoDivEl);
        hotelDivEl.appendChild(hotelFooterEl);
        // hotelDivEl.appendChild(hotelInfoEl);

        // append to master div
        hotelMasterDivEl.appendChild(hotelDivEl);

        // append master div to hotel section
        hotelArea.appendChild(hotelMasterDivEl);

        inputButton.classList.remove("is-loading");
    }
};

// // get hotel photos
var getHotelPhoto = function (id, selectedDiv) {
    fetch('https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=' + id, options)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    hotelImgUrl = data.hotelImages[0].baseUrl.replace("_{size}", "")
                    displayHotelPhoto(hotelImgUrl, selectedDiv);
                })
        })
}

// // display hotel photo to div 
var displayHotelPhoto = function (hotelImgUrl, selectedDiv) {
    var hotelImgEl = document.createElement("img");
    hotelImgEl.setAttribute("src", hotelImgUrl);
    hotelImgEl.className = "hotel-img";

    selectedDiv.appendChild(hotelImgEl);
}


// // function to get IATA codes for the current city and destination city and find flights
const flightFunctionInfo = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com',
        'X-RapidAPI-Key': '4095781a70mshead3ea36f5198b9p145325jsn70b930dd6ab8'
    }
};
var flights = function (currentAirport, destinationAirport, passengers) {
    fetch("https://flight-fare-search.p.rapidapi.com/v2/flight/?from=" + currentAirport + "&to=" + destinationAirport + "&date=2022-04-04&adult=" + passengers + "&type=economy&currency=USD", flightFunctionInfo)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    flightDisplay(data)

                })
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

// function to display the flight data
var flightDisplay = function (data) {
    flightArea.innerHTML = ""
    flightArea.setAttribute("class", "my-3 py-4")
    for (let i = 0; i < 5; i++) {
        var columnEl = document.createElement("div")
        columnEl.setAttribute("class", "columns has-background-grey-dark flight-child")

        // dynamically creating the flight name div
        var flightNameEl = document.createElement("div")
        flightNameEl.setAttribute("class", "column has-text-weight-bold")
        flightNameEl.setAttribute("id", "airline")
        flightNameEl.innerHTML = data.results[i].flight_name

        // dynamically creating the departing date div
        var departingDateEl = document.createElement("div")
        departingDateEl.setAttribute("class", "column")
        departingDateEl.setAttribute("id", "depart-date")
        departingDateEl.innerHTML = data.results[i].departureAirport.time.substr(0, 10)

        // dynamically creating the flight class div
        var flightClassEl = document.createElement("div")
        flightClassEl.setAttribute("class", "column")
        flightClassEl.setAttribute("id", "class")
        flightClassEl.innerHTML = data.results[i].cabinType

        // dynamically creating the flight duration div
        var flightDurationEl = document.createElement("div")
        flightDurationEl.setAttribute("class", "column")
        flightDurationEl.setAttribute("id", "flight-hours")
        flightDurationEl.innerHTML = data.results[i].duration.text

        // dynamically creating the flight price div
        var flightPriceEl = document.createElement("div")
        flightPriceEl.setAttribute("class", "column")
        flightPriceEl.setAttribute("id", "price")
        flightPriceEl.innerHTML = "$" + Math.floor(data.results[i].totals.total) + "/Person"

        // dynamically creating the flight select button
        var selectButtonEl = document.createElement("button")
        selectButtonEl.setAttribute("class", "button is-success")
        selectButtonEl.setAttribute("id", "search")
        selectButtonEl.innerHTML = "Select"

        // Append the flight information onto the page
        columnEl.appendChild(flightNameEl)
        columnEl.appendChild(departingDateEl)
        columnEl.appendChild(flightClassEl)
        columnEl.appendChild(flightDurationEl)
        columnEl.appendChild(flightPriceEl)
        columnEl.appendChild(selectButtonEl)

        flightArea.appendChild(columnEl)
    }
}

// add event listener to form
inputButton.addEventListener("click", storeInput);


// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
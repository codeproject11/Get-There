// variable to access main search form in js (to apply submit event listener to);
var inputButton = document.querySelector('#search');
var hotelArea = document.querySelector('#hotel-area');


// openweather API = f9dcdf6690d0d22c5198371e258e8bb2
// opentrip API = 5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98

// store user input and send into api functions
var storeInput = function (event) {
    event.preventDefault();
    var destinationCity = document.querySelector("input[id='destination']").value;
    var currentAirport = document.querySelector("#currentAirport").value;
    var destinationAirport = document.querySelector("#destinationAirport").value;

    if (destinationCity && destinationAirport && currentAirport) {
        document.querySelector("input[id='destination']").value = '';
        document.querySelector("input[id='destinationAirport']").value = "";
        document.querySelector("input[id='currentAirport']").value = "";
        // getCity(destinationCity);
        flights(currentAirport, destinationAirport)
        // getCityId(destinationCity);
    } else {
        alert("Please provide Arriving and Departing Airport IATA Codes, along with your Destination City!")
    }

}

// function to use user inputted destination city and current city and generate data from API
// var getCity = function (destinationCity) {
//     var destinationCityAPIURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + destinationCity + "&limit=1&appid=f9dcdf6690d0d22c5198371e258e8bb2";
//     fetch(destinationCityAPIURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (destinationData) {
//                     if (destinationData.length === 0) {
//                         alert("Please enter a valid city name")
//                     } else {
//                         weatherData(destinationData[0].lat, destinationData[0].lon, destinationData[0].name)
//                         attractions(destinationData[0].lon, destinationData[0].lat)
//                         restaurants(destinationData[0].lon, destinationData[0].lat)
//                     };
//                 });
//             };
//         })
//         .catch(function (error) {
//             alert("Please Try Again");
//             console.log(error);
//             return
//         });
// };


// // API to get the lat and lon from getCity() and fetch data from an API to retrieve weather information for the destination city
// var weatherData = function (lat, lon, name) {
//     var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9dcdf6690d0d22c5198371e258e8bb2";

//     fetch(apiURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     console.log(`Destination City: ${name}`)
//                     for (let i = 0; i < 5; i++) {
//                         console.log(`${Math.floor((data.daily[i].temp.day) - 273.15)}°C`)
//                         console.log(`${(data.daily[i].pop) * 100}%`)
//                         console.log(data.daily[i].weather[0].icon)
//                     }

//                 });
//             };
//         })
//         .catch(function (error) {
//             alert("Please Try Again");
//             console.log(error);
//             return
//         });
// };


// // function to find attractions at destination city. returns 10 highly rated attractions within a 10k radius of the coordinates of the destination city inputted
// var attractions = function (lon, lat) {
//     var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&kinds=cultural&rate=3&limit=5&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

//     fetch(apiURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     console.log("Interesting Places to Visit")
//                     for (let i = 0; i < 4; i++) {
//                         console.log(data.features[i].properties.name)
//                         console.log(data)
//                         attractionsPictures(data.features[i].properties.xid)
//                     }
//                 })
//             }
//         })
//         .catch(function (error) {
//             alert("Please Try Again");
//             console.log(error);
//             return
//         });
// }

// // // function to find restaurants within a 10 km radius of the destination city coordinates
// var restaurants = function (lon, lat) {
//     var apiURL = "https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=" + lon + "&lat=" + lat + "&rate=3&kinds=restaurants&limit=5&apikey=5ae2e3f221c38a28845f05b69efdf761d15a073a57889029b8209b98"

//     fetch(apiURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     console.log("Restaurants to Visit")
//                     for (let i = 0; i < data.features.length; i++) {
//                         console.log(data.features[i].properties.name)
//                         attractionsPictures(data.features[i].properties.xid)

//                     }
//                 })
//             }
//         })
//         .catch(function (error) {
//             alert("Please Try Again");
//             console.log(error);
//             return
//         });
// }

// // function to get images of the attractions and restaurants founds 
// var attractionsPictures = function (ID) {
//     var apiURL = "https://api.opentripmap.com/0.1/en/places/xid/" + ID + "?apikey=5ae2e3f221c38a28845f05b6a7256fbb0a8e27011d5f47ed9b0646e7"

//     console.log(apiURL)
//     fetch(apiURL)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     console.log(data.image)
//                 })
//             }
//         })
// }


// // // api details for hotel api
// var options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
//         'X-RapidAPI-Key': 'ac9801f2b6msha969dce2a1a2b53p1c5a9bjsn3bd2a7d8c6fd'
//     }
// };



// // // uses api to get city destination id from user input and sends it to other hotels api
// var getCityId = function (input) {
//     fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + input + "&locale=en_US", options)
//         .then(function (response) {
//             if (response.status === 200) {
//                 response.json()
//                     .then(function (data) {
//                         if (data.moresuggestions !== 0) {
//                             var destId = data.suggestions[0].entities[0].destinationId;
//                             console.log(destId);
//                             getHotels(destId);
//                         } else {
//                             alert('Enter a valid city name');
//                         }
//                     })
//             } else {
//                 // change to modal
//                 alert("Enter a valid city name");
//             }
//         })
//         .catch(err => console.error(err));
// }

// // // use destination id to grab hotel data
// var getHotels = function (destId) {
//     // update fetch url to include check in and checkout dates as user input variables when available --> note for taimur
//     fetch('https://hotels4.p.rapidapi.com/properties/list?destinationId=' + destId + '&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=BEST_SELLER&locale=en_US&currency=CAD', options)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json()
//                     .then(function (data) {
//                         console.log(data.data.body)
//                         // displayHotels(data.data.body.searchResults.results);
//                     })
//             } else {
//                 // change to modal
//                 alert("Enter a valid city name");
//             }
//         })
// }

// // // function to dynamically display hotel information based upon the users destination city
// var displayHotels = function (hotels) {
//     hotelArea.innerHTML = "";
//     for (var i = 0; i < 11; i++) {

//         hotelDivEl = document.createElement("div");
//         hotelHeadEl = document.createElement("h2");
//         hotelHeadEl.textContent = hotels[i].name;

//         hotelDivEl = document.createElement("div");
//         hotelHeadEl = document.createElement("h2");
//         hotelHeadEl.textContent = hotels[i].name;

//         hotelPriceEl = document.createElement("p");

//         if (hotels[i].ratePlan) {
//             hotelPriceEl.textContent = hotels[i].ratePlan.price.current;
//         } else {
//             hotelPriceEl.textContent = "There are no pricing details for this hotel."
//         }

//         hotelDivEl.appendChild(hotelHeadEl);
//         hotelDivEl.appendChild(hotelPriceEl);
//         hotelArea.appendChild(hotelDivEl);
//     }
// };

// function to get IATA Code for nearest airport for the destination city entered by the uer
// var airportCodes = function (destinationLat, destinationLon, currentAirport) {
//     var destinationAPI = "https://airlabs.co/api/v9/nearby?lat=" + destinationLat + "&lng=" + destinationLon + "&distance=20&api_key=990f17f3-7a6f-4d62-9fc6-98f2f058c02e"
//     fetch(destinationAPI)
//         .then(function (res) {
//             if (res.ok) {
//                 res.json().then(function (data) {
//                     for (let i = 0; i < data.response.airports.length; i++) {
//                         flights(currentAirport, data.response.airports[i].iata_code)
//                     }
//                 });
//             };
//         })
//         .catch(function (error) {
//             alert("Please Try Again");
//             console.log(error);
//             return
//         });
// }


// // function to get IATA codes for the current city and destination city and find flights
const flightFunctionInfo = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com',
        'X-RapidAPI-Key': '4095781a70mshead3ea36f5198b9p145325jsn70b930dd6ab8'
    }
};
var flights = function (currentAirport, destinationAirport) {
    console.log(currentAirport)
    console.log(destinationAirport)
    fetch("https://flight-fare-search.p.rapidapi.com/v2/flight/?from=" + currentAirport + "&to=" + destinationAirport + "&date=2022-04-04&adult=1&type=economy&currency=USD", flightFunctionInfo)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    for (let i = 0; i < 4; i++) {
                        // console.log(data.results[i].flight_name);
                        // console.log(data.results[i].departureAirport.time.substr(0, 10));
                        // console.log(data.results[i].cabinType);
                        // console.log(data.results[i].duration.text);
                        // console.log("$" + data.results[i].totals.total + "/Person");
                        flightDisplay(data.results[i])
                    }
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}

// function to display the flight data
var flightDisplay = function (data) {
    var flightSectionEl = document.querySelector(".flightSection")
    var columnEl = document.createElement("div")
    columnEl.setAttribute("class", "columns")

    // dynamically creating the flight name div
    var flightNameEl = document.createElement("div")
    flightNameEl.setAttribute("class", "column")
    flightNameEl.setAttribute("id", "airline")
    flightNameEl.innerHTML = data.flight_name

    // dynamically creating the departing date div
    var departingDateEl = document.createElement("div")
    departingDateEl.setAttribute("class", "column")
    departingDateEl.setAttribute("id", "depart-date")
    departingDateEl.innerHTML = data.departureAirport.time.substr(0, 10)

    // dynamically creating the flight class div
    var flightClassEl = document.createElement("div")
    flightClassEl.setAttribute("class", "column")
    flightClassEl.setAttribute("id", "class")
    flightClassEl.innerHTML = data.cabinType

    // dynamically creating the flight duration div
    var flightDurationEl = document.createElement("div")
    flightDurationEl.setAttribute("class", "column")
    flightDurationEl.setAttribute("id", "flight-hours")
    flightDurationEl.innerHTML = data.duration.text

    // dynamically creating the flight price div
    var flightPriceEl = document.createElement("div")
    flightPriceEl.setAttribute("class", "column")
    flightPriceEl.setAttribute("id", "price")
    flightPriceEl.innerHTML = "$" + data.totals.total + "/Person"

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

    flightSectionEl.appendChild(columnEl)
}

// add event listener to form
inputButton.addEventListener("click", storeInput);





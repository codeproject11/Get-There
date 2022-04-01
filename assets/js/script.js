// variable to access main search form in js (to apply submit event listener to);
var inputButton = document.querySelector('#search');
var hotelArea = document.querySelector('#hotel-area');

// api details for hotel api
var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
        'X-RapidAPI-Key': 'ac9801f2b6msha969dce2a1a2b53p1c5a9bjsn3bd2a7d8c6fd'
    }
};

// store user input and send into api functions
var storeInput = function(event) {
    event.preventDefault();
    var input = document.querySelector("input[id='destination']").value;
    console.log(input);
    getCityId(input);
}

// uses api to get city destination id from user input and sends it to other hotels api
var getCityId = function(input) {
    fetch("https://hotels4.p.rapidapi.com/locations/search?query=" + input + "&locale=en_US", options)
        .then(function(response) {
            if(response.status === 200) {
                response.json()
                .then(function(data) {
                    if(data.moresuggestions !== 0) {
                        var destId = data.suggestions[0].entities[0].destinationId;
                        console.log(destId);
                        getHotels(destId);
                    } else {
                        alert('Enter a valid city name');
                    }
                })
            } else {
                // change to modal
                alert("Enter a valid city name");
            }
        })
        .catch(err => console.error(err));
}

// use destination id to grab hotel data
var getHotels = function (destId) {
    // update fetch url to include check in and checkout dates as user input variables when available --> note for taimur
    fetch('https://hotels4.p.rapidapi.com/properties/list?destinationId=' + destId + '&pageNumber=1&pageSize=25&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=BEST_SELLER&locale=en_US&currency=CAD', options)
        .then(function(response) {
            if(response.ok) {
                response.json()
                .then(function(data) {
                    console.log(data.data.body)
                    displayHotels(data.data.body.searchResults.results);
                })
            } else {
                // change to modal
                alert("Enter a valid city name");
            }
        })
}

var displayHotels = function (hotels) {
    hotelArea.innerHTML = "";
    for (var i = 0; i < 11; i++) {
        
        hotelDivEl = document.createElement("div");
        hotelHeadEl = document.createElement("h2");
        hotelHeadEl.textContent = hotels[i].name;

        hotelPriceEl = document.createElement("p");

        if(hotels[i].ratePlan) {
            hotelPriceEl.textContent = hotels[i].ratePlan.price.current;
        } else {
            hotelPriceEl.textContent = "There are no pricing details for this hotel."
        }

        hotelDivEl.appendChild(hotelHeadEl);
        hotelDivEl.appendChild(hotelPriceEl);
        hotelArea.appendChild(hotelDivEl);
    }
};
// add event listener to form
inputButton.addEventListener("click", storeInput);


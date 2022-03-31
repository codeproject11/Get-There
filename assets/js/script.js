// variable to access main search form in js (to apply submit event listener to);
var inputForm = document.querySelector('#search-form');

var storeInput = function(event) {
    event.preventDefault();
    var input = document.querySelector("input[id='city']").value;
    console.log(input);
}

inputForm.addEventListener("submit", storeInput);
// store main div or section in variable to use in appending

// fetch apis (multiple)

// display functions (1 for flights, 1 for weather, 1 for hotels/restaurants)
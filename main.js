/**
***
Main Variables
***
**/
let fetchedData = {};
const selectTrigger = [...document.querySelectorAll('.select_trigger')];
const selectOption = [...document.querySelectorAll('.select_box__option')];
const selectBoxes = [...document.querySelectorAll('.select_box')];
/**
***
Main Flow
***
**/
// Listen for Clicking on select box Arrow, then show/hide select box
selectTrigger.forEach(elmnt => {
    elmnt.addEventListener('click', () => {
        elmnt.parentElement.classList.toggle('select--active');
    });
});
// Listen for Clicking on select box Options, then activate clicked option and hide options
selectOption.forEach(elmnt => {
    elmnt.addEventListener('click', () => {
        const visibleArea = elmnt.parentElement.parentElement.querySelector('.select_box__visible');
        if (elmnt.getAttribute('data-select-bind') === 'time') {
            visibleArea.innerHTML = `<input type="time" />`;
        } else {
            visibleArea.innerHTML = `<span>${elmnt.getAttribute('data-select-bind')}: 4:50 AM</span>`;
        }
        // elmnt.parentElement.parentElement.parentElement.classList.remove('select--active');
    });
});
// Listen for clicking anywhere in document
document.addEventListener('click', (e) => {
    // Hide select options 
    if (!e.target.closest('.select_trigger')) {
        selectBoxes.forEach(elmnt => elmnt.parentElement.classList.remove('select--active'))
    }
});
if ('geolocation' in navigator) {
    /* geolocation is available */
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition(doSomething, showError);
} else {
    /* geolocation IS NOT available */
    console.log('geolocation IS NOT availablen');
}
/**
***
Main Function
***
**/
function doSomething(pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    fetch(`http://api.aladhan.com/v1/calendar?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(parsedData => {
            // myImage.src = URL.createObjectURL(myBlob);
            fetchedData = JSON.parse(JSON.stringify(parsedData));
            // console.log(fetchedData);
            // console.log(parsedData == fetchedData);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
}

function initTable() {

}

function saveTable() {

}

function computeDuration(from, to) {

}
var request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=3273%20NW%20Orchard%20Avenue%20Corvallis',
    json: true // tells the data coming back is JSON and will convert to object automatically
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}, Longitude: ${body.results[0].geometry.location.lng}`);
});
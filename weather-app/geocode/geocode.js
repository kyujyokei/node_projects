const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true // tells the data coming back is JSON and will convert to object automatically
    }, (error, response, body) => {
    
        if (error) {
            callback('Unable to connect to Google servers');
            // console.log('Unable to connect to Google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address');
            // console.log('Unable to find the address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}, Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
};

module.exports = {
    geocodeAddress
};

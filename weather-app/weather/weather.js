var request = require('request');

var getWeather = (lat, long, APIKey, callback) => {
    console.log(`Lat: ${lat}, Long: ${long}`);
    request({
        url: `https://api.darksky.net/forecast/${APIKey}/${lat},${long}`,
        json: true // tells the data coming back is JSON and will convert to object automatically
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to servers');
            // console.log('Unable to connect to Google servers');
        } else if (response.statusCode !== 200) {
            callback('Unable to fetch weather');
        } else{
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    getWeather
};
const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results.address,undefined,2));
        // console.log(results.latitude + " & " + results.longitude);

        var APIKey = 'efbf7800d936d735d9abdefdaad92e62';
        
        weather.getWeather(results.latitude, results.longitude, APIKey, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's ${weatherResults.temperature} degree now.`);
                console.log(`It feels like ${weatherResults.apparentTemperature} degrees.`);
            }
        });
        
    }
});


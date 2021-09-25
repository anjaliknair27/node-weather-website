const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=83aff09dc96a31dc8665821833ef44f9&query=' + latitude + ',' + longitude; 
    request({ url,json: true}, (error, { body } = {})=>{
            if (error) {
                callback('Unable to connect to forecast service!', undefined);
            } else if (body.error) {
                callback('Unable to find location!', undefined);
            } else {
                callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.");
            }
        })
}


module.exports = forecast
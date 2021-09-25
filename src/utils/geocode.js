const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5qYWxpa25haXIyNyIsImEiOiJja3R2c3Vrb3gwd2szMnFxbjNhcnNwcjB0In0.w-V6h5792DUMim2mAoRPig&limit=1'
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (body.features.length==0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                lattitude:  body.features[0].center[1],
                longitude:  body.features[0].center[0],
                placeName:  body.features[0].place_name
            })
        }

    })

}

module.exports = geoCode;


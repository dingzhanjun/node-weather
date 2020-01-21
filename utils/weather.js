const request = require('request');


function getWeather(city, callback) {
    const token = 'pk.eyJ1IjoiZGluZ3poYW5qdW4iLCJhIjoiY2s1aWRoZmtzMGNhYTNmbXhiaHB6M29lZyJ9.P5e0-jIy76GwaWiLtEAnTQ';
    request({url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?access_token=' + token, json: true}, 
        (err, res) => {
            const center = res.body.features[0].center;
            const weatherUrl = 'https://api.darksky.net/forecast/521dc06095df125bb953699bd97a3bf7/' + center[1] + ',' + center[0];
            request({url: weatherUrl, json:true}, (err, res)=> {
                callback && callback (res.body.currently);
            });       
        }
    )
}


module.exports = {
    getWeather
};
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather for',
            string: true,
            default:'Sno,Georgia,Caucasus'
        }
    })
    .help()
    .alias('help','h')
    .argv;

async function getWeather (address) {
    try{
        const encodedAddress = encodeURIComponent(address);
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD3RRUfwRBgQr7eAWO8531niGC565vZZEk`;

        return axios.get(geocodeUrl)
            .then(
            response => {
                if (response.data.status === 'ZERO_RESULTS') {
                return {error:'Unable to find address'};
                }else{
                const Location = response.data.results[0].formatted_address;
                var weatherUrl = `https://api.darksky.net/forecast/d997d41f1e4267d6bf205b1d0ed1e6c0/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}?units=si`;
                return axios.get(weatherUrl).then(
                    response => {
                    const forecast = {
                      location: Location,
                      tempo: response.data.currently.temperature,
                      weather: response.data.currently.icon,
                      time: new Date().toLocaleDateString()
                    }
                    return forecast;
                    }
                );
                }  
            }
            )
        } catch{ (err)
        console.log('Error:',err)
    }
};


module.exports = getWeather;
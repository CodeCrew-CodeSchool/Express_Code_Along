const express = require('express'); // Bring in our express module
const app = express() // Start using express
const PORT = 3001; // Port num
const weather = require('./weather.json'); // data we need
const cors = require('cors'); // security stuff
const axios = require("axios");


app.use(cors()); // all routes are open


app.get('/', (req, res) => {
    res.send('Hello Class 301'); // this is what I want to return back to my client (React App)
})

// Use the .find() method to discover which city the `lat`, `lon` and `searchQuery` information belong to.
//  If the user did not search for one of the three cities that we have information about (Seattle, Paris, or Amman), 
//  return an error.

// LAB 08

const handleWeather = async (request, response) => {
    let {lat, lon} = request.query; // ES6 Destructuring

    // equivalent to above
    // let lat = request.query.lat;
    // let lon = request.query.lon;


    try{
        let API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=8a5cd6d51ba24518bfc97cb02a696c0d&include=minutely`;
        let res = await axios.get(API);
        const weatherArray = res.data.data.map(day => new Forecast(day));
        response.status(200).send(weatherArray);
        }catch(e){
            console.log(e);
        }


}


app.get('/weather', handleWeather) // weather route

// forcast class :)
class Forecast{
    constructor(day){
        this.date = day.ob_time;
        this.description = day.weather.description;

    }
}

app.listen(PORT, () => {console.log('I am listening!')});

// LAB 07
// app.get('/weather', (request, response) => {
//     // let {searchQuery} = request.query; 
//     let cityName = request.query.cityName //my city search
//     // // console.log(cityName);
//     let lon = request.query.lon; // lon data
//     let lat = request.query.lat; // lat data
 

//     // console.log(`${cityName}: lon is: ${lon}, lat is : ${lat}`);
//     const city = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());
//     console.log(city);

//     try {
//    const weatherArray = city.data.map(day => new Forecast(day));
//    response.status(200).send(weatherArray); // send back the data here :)     
//     } catch (error) {
//         console.log(error);
//     }

// });
const express = require('express'); // Bring in our express module
const app = express() // Start using express
const PORT = 3004; // Port num
const weather = require('./weather.json'); // data we need
const cors = require('cors'); // security stuff


app.use(cors()); // all routes are open


app.get('/hello', (req, res) => {
    res.send('Hello Class 301'); // this is what I want to return back to my client (React App)
})

// Use the .find() method to discover which city the `lat`, `lon` and `searchQuery` information belong to.
//  If the user did not search for one of the three cities that we have information about (Seattle, Paris, or Amman), 
//  return an error.

app.get('/weather', (request, response) => {
    // let {searchQuery} = request.query; 
    let cityName = request.query.cityName //my city search
    // // console.log(cityName);
    let lon = request.query.lon; // lon data
    let lat = request.query.lat; // lat data
 

    // console.log(`${cityName}: lon is: ${lon}, lat is : ${lat}`);
    const city = weather.find(city => city.city_name.toLowerCase() === cityName.toLowerCase());
    console.log(city);

    try {
   const weatherArray = city.data.map(day => new Forecast(day));
   response.status(200).send(weatherArray); // send back the data here :)     
    } catch (error) {
        console.log(error);
    }

});


// class Rectangle {
//     constructor(height, width) {
//       this.height = height;
//       this.width = width;
//     }
//   }
// Create a class for `Forecast`, that has properties of `date` and `description`.

class Forecast{
    constructor(day){
        this.date = day.valid_date;
        this.description = day.weather.description;

    }
}

app.listen(PORT, () => {console.log('I am listening!')});

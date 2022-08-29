import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

      weatherData: [],
      searchString: '',
      cityName: '',
      lat: '',
      lon: '',
    }
  }

  handleMap = async () => {
    // user search goes here
    // 3rd paty api 

    const API = `https://us1.locationiq.com/v1/search?key=pk.b2116695b73495b18f3446606a5171d2&q=${this.state.searchString}&format=json`;

    try {
      let res = await axios.get(API);
      let city = res.data[0];
      // as soon as state is set, I implemented a callback func to run my weather function!
      this.setState({ cityName: city.display_name, lat: city.lat, lon: city.lon }, () => this.handleWeather(this.state.lat, this.state.lon));


    } catch (error) {
      console.error(error);
    }


  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  }

  handleWeather = async (lat, lon) => {
    // "?" == incoming parameters

    const API = `http://localhost:3001/weather?lat=${lat}&lon=${lon}`; // our weather URL with query parameters
    const res = await axios.get(API); // make our axios call

    this.setState({ weatherData: res.data[0] }, () => console.log(this.state.weatherData)); // using a callback to check for data




  }
  render() {
    return (
      <div>
        {/* This is where our weather data will appear: */}
        <h2>{this.state.weatherData.date}</h2> 
        <h3>{this.state.weatherData.description}</h3>



        <h1>{this.state.cityName}</h1>
        <input onChange={this.handleChange} type="search" placeholder='Search 4 a city' />
        <button onClick={this.handleMap}>Explore</button>
      </div>
    )
  }
}


import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
constructor(props) {
  super(props)

  this.state = {
    
     weatherData: [],
  }
}
handleMap = async () => {
  // user search goes here
  // 3rd paty api 
  let res = await axios.get('http://locationiq.com?key=37373733262317&q=Seattle&format=json');
console.log(res);
try {
  this.handleWeather('Seattle')
} catch (error) {
  console.log(error);
}


}

  handleWeather = async (cityName) => {
    // "?" == incoming parameters
    
    const API = `http://localhost:3004/weather?cityName=${cityName}`; // our weather URL with query parameters
    const res = await axios.get(API);
    this.setState({weatherData: res.data});
    
  }
  render() {
    return (
      <div>
        This is where our weather data will appear:
        {/* A request that sends to OUR server */}
        {/* axios */}
        {/* my server's localhost */}
        {/* http://localhost:3004/  this is how we talk to our backend!*/}
       {this.state.weatherData.map((day) => {
         return(
        <>
       
        <h1>{day.date}</h1>
        <h2>{day.description}</h2>
      
        </>
          )
       })}
         
      <button onClick={this.handleButton}>Get Weather</button>
      </div>
    )
  }
}


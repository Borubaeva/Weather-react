import React, { useEffect } from 'react';
import Snow from './assets/Snow.png';
import Clouds from './assets/Cloudy.png';
import Rain from './assets/Rain.png';
import Clear from './assets/Clear.png';
import axios from 'axios';
import './Weather.css'

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f631ea87daddf959f8d7a12c30009e4c';
const icons='https://openweathermap.org/img/wn/10d@2x.png'

const Weather = () => {
    const [weatherData, setWeatherData] = React.useState(null);
    const [searchCity, setSearchCity] = React.useState('');
    const [cityNotFound, setCityNotFound] = React.useState(false);

    const getWeather = async (city = 'London') => {
        try {
            const { data } = await axios.get(url + city + '&appid=' + apiKey);
            setWeatherData(data)
            setCityNotFound(false)
        } catch (error) {
            setCityNotFound(true)
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        getWeather(searchCity);
    };

    const handleChange = (event) => {
        setSearchCity(event.target.value);
    };

    if (cityNotFound) {
        return <h1>City not found</h1>;
    }

    if (weatherData === null) {
        return <h1>Loading...</h1>;
    }

    let weatherIcon;
    if (weatherData.weather[0].main === 'Clouds') {
        weatherIcon = Clouds;
    } else if (weatherData.weather[0].main === 'Rain') {
        weatherIcon = Rain;
    } else if (weatherData.weather[0].main === 'Snow') {
        weatherIcon = Snow;
    } else if (weatherData.weather[0].main === 'Clear') {
        weatherIcon = Clear;
    }  else {
        weatherIcon = icons; 
    }

    return (
        <div className="weather-container" >
            <form className="weather-form" onSubmit={handleSubmit}>
            <h1>Прогноз погоды</h1>
                <input
                    type="text"
                    value={searchCity}
                    onChange={handleChange}
                    placeholder="Search city"
                    required
                />
                <input className="weather-submit" type="submit" value="Search" />
            </form>
            <div className="weather-info">
            <div className='weather-text'>
               <h1>{weatherData.name}</h1>
               <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
               <p>{weatherData.weather[0].main}</p>
            </div>
            <div className='weather-icon'>
                <img className="weather-icon" src={weatherIcon} alt="" />
            </div>
        </div>
        </div>
    );
};

export default Weather;
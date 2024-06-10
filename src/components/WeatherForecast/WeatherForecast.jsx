import { useState, useEffect,useContext } from "react";
import { Context } from '../../Context';
import './WeatherForecast.scss'


//Boring Date formatting Function
const printTime = (utcDate) => {
    var date = new Date(utcDate * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime;
}

//Another Boring Date formatting Function
const printDayOfWeek = (utcDate) => {
    var date = new Date(utcDate * 1000);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
}


//Pretty Standard fetch function
const fetchWeatherForecast = async (apiUrl) => {
    try {
        const req = await fetch(apiUrl);
        const res = await req.json();
        return res;
    } catch (error) {
        console.error(error)
    }
}



const WeatherForecast = () => {

    const { weatherData } = useContext(Context);

    const [activeForecast, setActiveForecast] = useState(0);
    const [isHourlyActive, setIsHourlyActive] = useState(false);
    const [isDailyActive, setIsDailyActive] = useState(false);
    const [results, setResults] = useState([]);


    //Gets Forecast By Hour
    const getForecastByHour = async (lat, lon) => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric&cnt=7`;
        fetchWeatherForecast(apiUrl).then((res) => {
            
            setResults(res.list);
            setIsHourlyActive(true);
            setIsDailyActive(false);
        })
    }

    //Gets Forecast By Day
    const getForecastByDay = async (lat, lon) => {

        //it's basically the same call as getForecastByHour, but without limiting it's results. As free version of the api doesn't give forecast by day, i'm gonna print one result every seven (7x3 = 24 hours)
        //paid version of the api has a more correct way to approach this, check https://openweathermap.org/forecast16
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`;
        fetchWeatherForecast(apiUrl).then((res) => {
            setResults(res.list);
            setIsDailyActive(true);
            setIsHourlyActive(false);
        })
    }


    const handleSubmenuClick = (forecastType) => {

        //switching. Which one is active?
        if (forecastType === 0) {
            getForecastByHour(weatherData.coord.lat, weatherData.coord.lon); 
        } else if (forecastType === 1) {
            getForecastByDay(weatherData.coord.lat, weatherData.coord.lon);
        }
        setActiveForecast(forecastType);
    };

    //First Print. Hour By Default
    useEffect(() => {
        if(weatherData){
            setActiveForecast(0);
            getForecastByHour(weatherData.coord.lat, weatherData.coord.lon);
        }
    }, [weatherData]);

    return (

        <div className='weather-forecast'>
            {(isHourlyActive || isDailyActive) && (
            <>
                <div className='weather-forecast__title'>
                    Weather Forecast...
                </div>
                <ul className="weather-forecast__selector">
                    <li
                        className={`weather-forecast__selector__item ${activeForecast === 0 ? 'weather-forecast__selector__item--active' : ''}`}
                        onClick={() => handleSubmenuClick(0)}
                    > By Hour </li>
                    <li
                        className={`weather-forecast__selector__item ${activeForecast === 1 ? 'weather-forecast__selector__item--active' : ''}`}
                        onClick={() => handleSubmenuClick(1)}
                    > 5 days </li>

                </ul>
            </>
            )}
            {isHourlyActive && results.map((result, i) => (
                <div key={i} className='weather-forecast__row'>
                    <div className='weather-forecast__row__icon icon'>
                        <img src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`} alt={result.weather[0].description} />
                    </div>
                    <div className='weather-forecast__row__time-and-climate'>
                        <div className='weather-forecast__row__time'>{printTime(result.dt)}</div>
                        <div className='weather-forecast__row__climate'>{result.weather[0].main}</div>
                    </div>
                    <div className='weather-forecast__row__temperature'>{parseFloat(result.main.temp).toFixed(0)}°</div>
                </div>
            ))}

            {isDailyActive && results.map((result, i) => {
                if (i % 7 === 0) {
                    return(
                        <div key={i} className='weather-forecast__row'>
                            <div className='weather-forecast__row__icon icon'>
                                <img src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`} alt={result.weather[0].description} />
                            </div>
                            <div className='weather-forecast__row__time-and-climate'>
                                <div className='weather-forecast__row__time'>{printDayOfWeek(result.dt)}</div>
                                <div className='weather-forecast__row__climate'>{result.weather[0].main}</div>
                            </div>
                            <div className='weather-forecast__row__temperature'>{parseFloat(result.main.temp).toFixed(0)}°</div>
                        </div>
                    )
                }
            })}
                
            
        </div>
    )
}

export default WeatherForecast;
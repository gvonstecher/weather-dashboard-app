import FavoritesAdd from '../FavoritesAdd/FavoritesAdd';
import { useContext } from 'react';
import { Context } from '../../Context';
import './CurrentWeather.scss';

const CurrentWeather = () => {

    const { weatherData } = useContext(Context);

    if(!weatherData) return; //just in case...

    //Boring Date formatting data
    let date = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const printDate = date.toTimeString().substr(0, 5) + " - " + weekday[date.getDay()] + ", " + date.getDate().toString() + " " + month[date.getMonth()] + " '" + date.getFullYear().toString().substr(-2);

    //Grab icon directly from openweathermap API
    const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
    
    
    return (

        <div className='current-weather'>
            <div className='current-weather__temperature'>
                {parseFloat(weatherData?.main?.temp).toFixed(1)}°
            </div>
            <div className='current-weather__when-and-where-container'>
                <div className='current-weather__where'>
                    {weatherData?.name} 
                    <FavoritesAdd />
                </div>
                <div className='current-weather__when'>
                    {printDate}
                </div>
            </div>
            <div className='current-weather__icon icon'>
                <img src={weatherIcon} alt={weatherData?.weather[0]?.description} />
            </div>
        </div>
    )
}

export default CurrentWeather;
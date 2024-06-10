import { useContext } from 'react';
import { Context } from '../../Context';
import './WeatherDetails.scss';



const WeatherDetails = () => {
    const { weatherData } = useContext(Context);
    
    if(!weatherData) return; // just in case...

    //converts m/s to km/h
    const windsInKmH = parseFloat(weatherData?.wind?.speed * 3.6).toFixed(1);

    return (

        <div className='weather-details'>
                            <div className='weather-details__title'>
                                Weather Details...
                            </div>
                            <div className='weather-details__description'>
                                {weatherData?.weather[0]?.description}
                            </div>
                            <div className='weather-details__row'>
                                <div className='weather-details__row__name'>Temp max</div>
                                <div className='weather-details__row__value'>{parseFloat(weatherData?.main?.temp_max).toFixed(2)}°</div>
                                <div className='weather-details__row__icon icon'><i className='icon__temperature-max'></i></div>
                            </div>
                            <div className='weather-details__row'>
                                <div className='weather-details__row__name'>Temp min</div>
                                <div className='weather-details__row__value'>{parseFloat(weatherData?.main?.temp_min).toFixed(2)}°</div>
                                <div className='weather-details__row__icon icon'><i className='icon__temperature-min'></i></div>
                            </div>
                            <div className='weather-details__row'>
                                <div className='weather-details__row__name'>Humidity</div>
                                <div className='weather-details__row__value'>{weatherData?.main?.humidity}%</div>
                                <div className='weather-details__row__icon icon'><i className='icon__humidity'></i></div>
                            </div>
                            <div className='weather-details__row'>
                                <div className='weather-details__row__name'>Cloudy</div>
                                <div className='weather-details__row__value'>{weatherData?.clouds?.all}%</div>
                                <div className='weather-details__row__icon icon'><i className='icon__clouds'></i></div>
                            </div>
                            <div className='weather-details__row'>
                                <div className='weather-details__row__name'>Wind</div>
                                <div className='weather-details__row__value'>{windsInKmH} km/H</div>
                                <div className='weather-details__row__icon icon'><i className='icon__winds'></i></div>
                            </div>
                        </div>
    )
}

export default WeatherDetails;
import { useState, useEffect,useContext } from "react";
import { Context } from '../../Context';
import './Background.scss';


const Background = () => {

    const { weatherData } = useContext(Context);

    const [backgroundClass, setBackgroundClass] = useState(null);
    let background= '';
    let altText = '';


    useEffect(() => {

        //Some Sort of 'cheat', as I use image preloading to change background smoothly. 
        //Only when image is loaded I change background-class
        //Why? use classes? To make use of css transitions!
        const img = new Image();
        img.src = `/backgrounds/${background}.png`;
        img.onload = async () => setBackgroundClass(background);
    }, [weatherData] ) //only do that when weather data changes, of course


    //function to check is daytime or nighttime, using sunrise and sunset data provided by api
    //TODO: Problably should keep in mind what timezone i'm on. Tried to figure out by reading api
    //documentation but couldn't figure it out
    const isDayTime = (weatherData) =>{

        if((weatherData.dt >= weatherData.sys.sunrise) && (weatherData.dt <= weatherData.sys.sunset)) {
            return true;
         } else {
            return false;
         } 
    }

    
    if (weatherData) {
        
        //Weather condition types according to openweathermap API
        altText = weatherData.weather[0].main;
        switch (weatherData.weather[0].main) {
            case 'Thunderstorm':
                background = 'thunderstorm';
                break;
            case 'Drizzle':
            case 'Rain':
                background = 'rain';
                break;
            case 'Snow':
                background = 'snow';
                break;
            case 'Mist':
            case 'Smoke':
            case 'Haze':
            case 'Dust':
            case 'Fog':
            case 'Sand':
            case 'Ash':
            case 'Squall':
            case 'Tornado':
                background = 'mist';
                break;
            case 'Clear':
                background = (isDayTime(weatherData)) ? 'clear' : 'night-clear';
            break;
            case 'Clouds':
                background = (isDayTime(weatherData)) ? 'cloud' : 'night-cloud';
            break;
        }

    } else {
        background = 'nodata';
        altText = 'nodata background'
    }


    return (
        <div className={`background background--${backgroundClass}`}>
            
                <div className='background--blurred'></div>
        </div>
    )
}

export default Background;
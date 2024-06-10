import { useEffect, useState, } from 'react'
import { Context } from "./Context";

import SearchBar from './components/SearchBar/SearchBar'
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import Background from './components/Background/Background';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';

import './styles/app.scss'
import './styles/icons.scss'

function App() {

    const [isFetchedWeather, setisFetchedWeather] = useState(false);
    const [weatherData, setWeatherData] = useState(false);
    const [location, setLocation] = useState(false);

    ///////////////////////////////
    /*Weather Fetching handling */
    //////////////////////////////

    //just some standard fetch info function
    const fetchWeatherInfo = async (apiUrl) => {
        try {
            const req = await fetch(apiUrl);
            const res = await req.json();
            return res;
        } catch (error) {
            console.error(error)
        }
    }

    //whenever location is changed, i call the api to fetch new weather and set that info
    useEffect(() => {
        if (location) {
            const { lat, lon } = location;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`;
            fetchWeatherInfo(apiUrl).then((res) => {
                setWeatherData(res);
            })
            setisFetchedWeather(true);
        }
    }, [location]);




     ///////////////////////////////
    /*Favorite Locations handling */
    //////////////////////////////


    const [favoritesLocations, setFavoritesLocations] = useState(() => {
        // I get previous localStorage value when initialized
        const savedState = localStorage.getItem('favorites');
        return savedState ? JSON.parse(savedState) : [];
    });

    useEffect(() => {
        // Whenever favoritesLocations is modified I set that value into localstorage
        localStorage.setItem('favorites', JSON.stringify(favoritesLocations));
    }, [favoritesLocations]);


    ///////////////////////////////
    /*    Theme Handling        */
    //////////////////////////////

        const [theme, setTheme] = useState(() => {
            // I get previous localStorage value when initialized
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? JSON.parse(savedTheme) : 'theme--darkt';
        });

        useEffect(() => {
            // Every time theme changes, i set the value into localstorage
            localStorage.setItem('theme', JSON.stringify(theme));
            document.body.className = theme; // Change body classname
        }, [theme]);

        const toggleTheme = () => {
            setTheme((prevTheme) => (prevTheme === 'theme--dark' ? 'theme--light' : 'theme--dark'));
        };


        return (
            //passing all data available to context
            <Context.Provider value={{ 
                                    weatherData, setWeatherData, 
                                    location, setLocation, 
                                    favoritesLocations, setFavoritesLocations,
                                    theme, toggleTheme }}
            >
                <div className='page'>
                    <div className='page__wrapper'>
                        <header className='header'>
                            <div className='header__logo'><img src='./assets/appLogo.png' alt='weather web' /></div>
                            <SearchBar />
                        </header>
                        <main className='main'>
                            {isFetchedWeather && <CurrentWeather />}


                            <div className='weather-information'>
                                {isFetchedWeather && <WeatherDetails />}
                                {isFetchedWeather && <WeatherForecast />}
                            </div>
                        </main>
                    </div>
                    <Background />
                    <ThemeSwitch />
                </div>
            </Context.Provider>
        )
    }

    export default App

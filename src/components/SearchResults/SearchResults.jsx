import { useEffect, useState, useContext } from 'react'
import { Context } from "../../Context";

import './SearchResults.scss';

const SearchResults = ({ inputText, setInputText }) => {

    const { setLocation } = useContext(Context);
    const [locationList, setLocationList] = useState([]);


    //Debouncing strategy. Wait two seconds before making the call, 
    //and only if string has 3+ chars;
    useEffect(() => {
        if (inputText && inputText.length > 2) {
            const getData = setTimeout(() => {
                const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputText}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&limit=5`
                fetchLocations(apiUrl)
                    .then((res) => {
                        setLocationList(res);
                    })
            }, 2000)

            return () => clearTimeout(getData)
        }
    }, [inputText]);


    const fetchLocations = async (apiUrl) => {
        try {
            const req = await fetch(apiUrl);
            const res = await req.json();
            return res;
        } catch (error) {
            console.log(error)
        }

    }


    const handleLocationClick = (locationItem) => {
        setLocationList([]); //clears searchResults list
        setInputText(""); // clears input text
        setLocation(locationItem); //updates location

    }


    return (
        <ul className='search-results'>
            {locationList.map((locationItem, i) => (
                <li className="search-results__item" key={i} onClick={() => handleLocationClick(locationItem)}>{locationItem.name}, {locationItem.state}</li>
            ))}
        </ul>

    )
}

export default SearchResults;
import { useState,useEffect, useContext } from "react";
import { Context } from "../../Context";
import './FavoritesAdd.scss';

const FavoritesAdd = () => {

    const { weatherData, setFavoritesLocations } = useContext(Context);
    
    //TODO: check is location is already in favorite locations. in that case, useState should be true;
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        setIsFavorited(false);
    },[weatherData])

    const handleToggleFavorite = () => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let updatedFavorites;

        if (isFavorited) {
            // Eliminate Location from Favorites
            updatedFavorites = existingFavorites.filter(
                location => location.name !== weatherData.name || location.lat!== weatherData.coord.lat || location.lon !== weatherData.coord.lon
            );
        } else {
            // Add Location to Favorites
            const favoriteLocation = {
                name: weatherData.name,
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
            };
            updatedFavorites = [...existingFavorites, favoriteLocation];
        }

        // Updates favoritesLocations and, therefore, localstorage
        setFavoritesLocations(updatedFavorites);
        setIsFavorited(!isFavorited);
    };


    return (
        <div className="add-icon icon" onClick={handleToggleFavorite}>
            <i className={(isFavorited) ? "icon__add--added": "icon__add"}></i>
        </div>
    )
}

export default FavoritesAdd;
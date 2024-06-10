
import { useState,useContext } from "react";
import { Context } from "../../Context";
import './Favorites.scss';

const Favorites = () => {

    
    const [favoritesList, setFavoritesList] = useState(false);
    const {favoritesLocations, setFavoritesLocations, setLocation} = useContext(Context);


    const handleLocationClick = (index) => {
        if (index >= 0 && index < favoritesLocations.length) {
            let location = {};
            location.lat = favoritesLocations[index].lat;
            location.lon = favoritesLocations[index].lon;
            location.name = favoritesLocations[index].name;

            setLocation(location);
        } else {
            return null;
        }
    } 

    const handleClearList = () => {
        setFavoritesLocations([]);
        setFavoritesList(false);
    }

    return (
        <>
        <div className="add-icon icon" onClick={() =>setFavoritesList(!favoritesList)}>
            <i className={"icon__add--added"}></i>
        </div>
        {favoritesList && 
            <ul className='favorites-list'>
                {(favoritesLocations.length === 0) ? (
                    <p>No tienes ciudades favoritas.</p>
                ) : (
                    <>
                        {favoritesLocations.map((city, index) => (
                            <li className="favorites-list__item" key={index} onClick={() => handleLocationClick(index)}>
                                {city.name}
                            </li>
                        ))}
                        <li className="favorites-list__item--clear"  onClick={() => handleClearList()}>Clear Favorite Places List</li>
                    </>
                )}
            </ul>
        }
        </>
    );
};

export default Favorites;
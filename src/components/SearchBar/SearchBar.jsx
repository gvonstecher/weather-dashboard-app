import {useState } from 'react'
import SearchResults from '../SearchResults/SearchResults';
import Favorites from '../Favorites/Favorites';

import './SearchBar.scss';

const SearchBar = () => {

    
    const [inputText, setInputText] = useState("");

    const handleInput = (event) => {
        setInputText(event.target.value);
    }

    return (
        <>
            <div className='search-form'>
                <input type="text" className='search-form__input' placeholder="Search Location..." value={inputText} onChange={handleInput} />
                <div className='search-form__icon icon'>
                    <i className='icon__search'></i>
                </div>
                <Favorites />
                
            </div>
            {inputText && <SearchResults inputText={inputText} setInputText={setInputText}/>}
            
        </>
    )

}

export default SearchBar;
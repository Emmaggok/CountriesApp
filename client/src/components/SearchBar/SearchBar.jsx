import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { getSearchedCountry } from '../../Redux/actions/actions';
// Styles
import style from './SearchBar.module.css';

function SearchBar({ setShowCountry, showCountry, setShowOrder, setShowContinent, page, setPage, setShowAllCountry }) {
    const dispatch = useDispatch()

    const handlerChange = (e) => {
        let target = e.target.value
        let arr = [];
        arr.push(target)
        showCountrySearched(arr)
        dispatch(getSearchedCountry(target))
        setShowOrder(false)
        setShowContinent(false)
        setShowAllCountry(true)
        setPage({
            ...page,
            currentPage: 0,
            nextPage: 1,
            prevPage: 0
        })
    }

    const showCountrySearched = (l) => {
        if (l[0] === '') {
            setShowCountry(false)
        } else {
            setShowCountry(true)
        }
    }

    return (
        <div>
            <input type="text" placeholder='Buscar Pais'
                onChange={handlerChange} value={!showCountry ? '' : null}
                className={style.input}
            />
        </div>
    )
}

export default SearchBar
import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
// Styles
import style from '../Home/Home.module.css';

function PaisesBuscados({ page }) {

    const searchedCountry = useSelector(state => state.searchedCountry)

    return (
        <div className={style.container}>
            {
                searchedCountry[0] && searchedCountry[0].msg ? searchedCountry.map(e => (<span className={style.msg}>{e.msg}</span>))
                    : searchedCountry.slice(page.currentPage * page.limit, page.nextPage * page.limit).map((e) => (
                        <Link to={`/countryDetail/${e.id}`}>
                            <div key={e.id} className={style.country}>
                                <div>
                                    <h3>{e.name}</h3>
                                    <h3>{e.continente ? e.continente : <br />}</h3>

                                </div>
                                <img className={style.flag} src={e.flagimage} alt="..." />
                            </div>

                        </Link>
                    ))
            }
        </div>
    )
}

export default PaisesBuscados;
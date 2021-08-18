import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
// Styles
import style from './ActivityFilter.module.css'

function ActivityFilter() {

    const activitiesByCountry = useSelector(state => state.activitiesByCountry)
    const allCountries = useSelector(state => state.allCountries)

    let activities = activitiesByCountry.map(e => {
        return e.name
    })
    const filterActivities = new Set(activities);
    let resultActivities = [...filterActivities];
    // console.log(resultActivities)

    let countries = activitiesByCountry.map(e => e.countries)
    // console.log(countries) // array con array de paises

    let countryNames = [];
    countries.map(e => e.map(e => countryNames.push(e.name)))  // unico array con todos los nombres

    // onsole.log(countryNames)

    const filterCountryNames = new Set(countryNames);
    let resultCountries = [...filterCountryNames]; // array sin duplicados

    // console.log(resultCountries)

    let countriesArr = []
    for (let i = 0; i < resultCountries.length; i++) {
        let count = allCountries.filter(e => e.name === resultCountries[i])
        countriesArr.push(count)
    }
   
    // console.log(countriesArr)

    return (
        <div className={style.container}>

            <h1>Actividad Turistica: {resultActivities[0] && resultActivities}</h1>
            <h2>{resultActivities[0] ? 'Paises donde se realiza:' : null}</h2>
         
            {
                countriesArr.map(e => e.map(e => (
                    <div className={style.countries} key={e.id}>
                        <Link to={`/countryDetail/${e.id}`}>
                            <h4>{e.name}</h4>
                        </Link>
                    </div>
                )))
            }
        </div>
    )
}

export default ActivityFilter;
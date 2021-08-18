import axios from 'axios';

export function getAllCountries() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/countries')
            .then(res => dispatch({
                type: 'GET_ALLCOUNTRIES', payload: res.data
            }))
    }
}

export const getSearchedCountry = (country) => {
    return async function (dispatch) {
        try {
            if (country) {
                const res = await axios.get(`http://localhost:3001/countries?name=${country}`)
                dispatch({
                    type: 'GET_COUNTRYBYNAME',
                    payload: res.data
                })
            } else {
                console.log('No hay Pais')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        const res = await axios.get('http://localhost:3001/activity')
        dispatch({
            type: 'GET_ACTIVITIES',
            payload: res.data.response
        })
    }
}

export const getCountryById = (id) => {
    return async function (dispatch) {
        const res = await axios.get(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: 'GET_COUNTRYBYID',
            payload: res.data.response
        })
    }
}

export const getContinents = (target, allCoun) => {
    return function (dispatch) {
        let filter = allCoun.filter(e => e.continente === target)
        dispatch({
            type: 'GET_CONTINENTES',
            payload: filter
        })
    }
}

export const getActivitiesByCountry = (target, allCoun) => {
    return function (dispatch) {
        let filter = allCoun.filter(e => e.name === target)
        dispatch({
            type: 'GET_ACTBYCOUN',
            payload: filter
        })
    }
}

export const order = (option, direcction, countries) => {
    return function (dispatch) {
        // console.log(option, direcction, countries)
        let countriesOrder = [...countries];
        if (option === 'Nombre' && direcction === 'Ascendente') {
            // const orderAsc = countriesOrder.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            const orderAsc = countriesOrder.sort((a, b) => (a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? 1 : a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? -1 : 0))
            // console.log(orderAsc)
            dispatch({
                type: 'ORDER',
                payload: orderAsc
            })
        } else if (option === 'Nombre' && direcction === 'Descendente') {
            // const orderDesc = countriesOrder.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            const orderDesc = countriesOrder.sort((a, b) => (a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? -1 : a.name.localeCompare(b.name) > b.name.localeCompare(a.name) ? 1 : 0))
            // console.log(orderDesc)
            dispatch({
                type: 'ORDER',
                payload: orderDesc
            })
        } else if (option === 'Poblacion' && direcction === 'Ascendente') {
            const populationAsc = countriesOrder.sort((a, b) => (a.population > b.population ? 1 : a.population < b.population ? -1 : 0))
            // console.log(populationAsc)
            dispatch({
                type: 'ORDER',
                payload: populationAsc
            })
        } else if (option === 'Poblacion' && direcction === 'Descendente') {
            const populationDesc = countriesOrder.sort((a, b) => (a.population > b.population ? -1 : a.population < b.population ? 1 : 0))
            // console.log(populationDesc)
            dispatch({
                type: 'ORDER',
                payload: populationDesc
            })
        } else {
            console.log('Seleccione bien')
        }
    }
}
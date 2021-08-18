const initialState = {
    allCountries: [],
    searchedCountry: [],
    activities: [],
    countriesByContinent: [],
    activitiesByCountry: [],
    countryById: {},
    orderFilter: [],
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'GET_ALLCOUNTRIES':
            return {
                ...state,
                allCountries: payload,
            };
        case 'GET_COUNTRYBYNAME':
            return {
                ...state,
                searchedCountry: payload,
            };
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: payload,
            };
        case 'GET_CONTINENTES':
            return {
                ...state,
                countriesByContinent: payload,
            };
        case 'GET_ACTBYCOUN':
            return {
                ...state,
                activitiesByCountry: payload,
            };
        case 'GET_COUNTRYBYID':
            return {
                ...state,
                countryById: payload,
            };
        case 'ORDER':
            return {
                ...state,
                orderFilter: payload,
            }
        default:
            return state;
    }
};

export default rootReducer;
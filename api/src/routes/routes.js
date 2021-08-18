const axios = require('axios');
const { Op } = require("sequelize");
const { Country, Activity } = require('../db');

const { paginate } = require('./pagination');

const allCountries = async (_req, _res, next) => {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all')
        const paises = response.data;

        paises.map(async e => {
            try {
                const result = await Country.findOrCreate({
                    where: {
                        id: e.alpha3Code,
                        name: e.name,
                        flagimage: e.flag,
                        continente: e.region,
                        capital: e.capital,
                        subRegion: e.subregion,
                        area: e.area,
                        population: e.population
                    }
                })
                return result
            } catch (error) {
                console.log(error)
            }

        })

    } catch (error) {
        next(error);
    }
}

const countries = async (req, res, next) => {
    const { name, page } = req.query

    if (name && !page) {
        try {
            const country = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            if (country[0]) {
                res.json(country);
            } else {
                res.json([{ msg: 'El Pais no Existe' }])
            }
        } catch (error) {
            next(error)
        }
    } else if (page) {
        paginate(page, 10)
            .then(r => res.json(r))
            .catch(error => next(error))
    } else {
        Country.findAll()
            .then(r => res.json(r))
            .catch(error => next(error))
    }
}

const countriesById = (req, res, next) => {
    const { idPais } = req.params;
    Country.findOne({
        where: { id: idPais },
        include: [Activity]
    })
        .then(response => res.json({ response }))
        .catch(error => next(error))
}

const getActivities = (_req, res, next) => {
    Activity.findAll({
        include: [Country]
    })
        .then(response => res.json({ response }))
        .catch(error => next(error))
}

const createActivity = async (req, res, next) => {
    const { name, dificulty, duration, season, countryId } = req.body
    // console.log(name, dificulty, duration, season, countryId)
    try {
        const activity = await Activity.create({ name, dificulty, duration, season })
        let idPaises;
        if (Array.isArray(countryId)) {
            idPaises = await Promise.all(countryId.map(value => Country.findByPk(value)))
        } else {
            idPaises = await Promise.all(Country.findByPk(countryId))
        }

        await activity.setCountries(idPaises); // seteamos la relacion de la actividad recien creada con los paises pasados por body

        res.json({ msg: 'Actividad Agregada' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    allCountries,
    countries,
    countriesById,
    createActivity,
    getActivities
}
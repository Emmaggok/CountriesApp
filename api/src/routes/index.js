const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { countries, countriesById, createActivity, allCountries, getActivities } = require('./routes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', countries)
router.get('/countries/:idPais', countriesById)
router.get('/activity', getActivities)
router.post('/activity', createActivity)

allCountries();


module.exports = router;

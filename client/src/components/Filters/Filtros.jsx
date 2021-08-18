import React, { useEffect, useState } from 'react';

// Styles
import style from './Filters.module.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries, getActivities, getContinents, getActivitiesByCountry, order } from '../../Redux/actions/actions';

function Filtros({ showAll, setShowOrder, setShowCountry, setShowContinent, setShowActivityFilter, watcherFunction, showOrder, showByContinent, showActivityFilter, showAllCountry, setShowAllCountry, showCountry }) {

    const allCountries = useSelector(state => state.allCountries)
    const activities = useSelector(state => state.activities)
    const countriesByContinent = useSelector(state => state.countriesByContinent)

    // console.log(allCountries)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());
    }, [dispatch])

    const [reset, setReset] = useState({
        continent: 'Empty',
        activity: ''
    })
    console.log('reset', reset)

    // Order Filters
    const [orderFilter, setOrderFilter] = useState({
        name: false,
        option1: '',
        option2: '',
        conti: ''
    })
    const { option1, option2 } = orderFilter
    console.log(orderFilter)

    const handlerOptionContinent = (e) => {
        let target = e.target.value;
        // console.log(target)
        if (target !== 'Empty') {
            setReset({
                ...reset,
                continent: target
            })
            setOrderFilter({
                ...orderFilter,
                conti: target
            })
            dispatch(getContinents(target, allCountries));
            watcherFunction(target)
            setShowContinent(true)
            setShowActivityFilter(false)
            setShowCountry(false)
            setShowOrder(false)
        }
    }

    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        // console.log(target)
        if (target === 'Empty' || target === 'No Activity') {
            return null
        } else {
            setReset({
                ...reset,
                activity: target
            })
            dispatch(getActivitiesByCountry(target, activities));
            setShowActivityFilter(true)
            setShowOrder(false)
            setShowContinent(false)
        }
    }

    // Sacando los repetidos
    // Continente
    let continentes = allCountries.map(e => {
        return e.continente
    })
    const continentesFiltrados = new Set(continentes);
    let resultContinentes = [...continentesFiltrados];
    // Actividad
    let actividades = activities.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];

    useEffect(() => {

        const dispatchOrder = () => {
            // console.log(option1, option2)
            if (option1 && option2 && !orderFilter.conti) {

                dispatch(order(option1, option2, allCountries))
                setShowOrder(true)
                setShowContinent(false)
                setShowCountry(false)
                setShowActivityFilter(false)
                setShowAllCountry(false)
            }
            if (option1 && option2 && orderFilter.conti) {

                dispatch(order(option1, option2, countriesByContinent))
                setShowOrder(true)
                setShowContinent(false)
                setShowCountry(false)
                setShowActivityFilter(false)
                setShowAllCountry(false)
            }
        }
        dispatchOrder()
    }, [orderFilter])

    useEffect(() => {
        const onOff = () => {
            /*    if (!showOrder && !showByContinent) {
                    setOrderFilter({
                       ...orderFilter,
                       option1: '',
                       option2: ''
   
                   }) 
                   setReset({
                       ...reset,
                       continent: 'Empty'
                   }) 
               }  */
            if (!showByContinent) {
                setReset({
                    ...reset,
                    continent: 'Empty'
                })
            }
            if (!showActivityFilter) {
                setReset({
                    ...reset,
                    activity: 'Empty'
                })
            }
            if (showActivityFilter) {
                setOrderFilter({
                    ...orderFilter,
                    option1: '',
                    option2: ''
                })
            }
        }
        onOff()
    }, [showOrder, showActivityFilter])

    useEffect(() => {
        if (!showOrder && !showByContinent) {
            setReset({
                ...reset,
                continent: 'Empty'
            })
        }
    }, [showOrder, showByContinent])

    /* useEffect(() => {
        if (!showOrder && !showByContinent) {
            setOrderFilter({
                ...orderFilter,
                option1: '',
                option2: ''
            })
        }
    }, [showOrder]) */

    useEffect(() => {
        if (showAllCountry) {
            setOrderFilter({
                ...orderFilter,
                conti: ''
            })
            setOrderFilter({
                ...orderFilter,
                option1: '',
                option2: ''
            })
        }
    }, [showAllCountry])
    console.log(showOrder, showByContinent, showActivityFilter)

    const orderHandler = (e) => {
        let target = e.target.value
        // console.log(target)
        setOrderFilter({
            ...orderFilter,
            [e.target.name]: target
        })
        watcherFunction(target)
    }

    const [showSelectOp, setShowSelectOp] = useState({
        continenyOP: false,
        activityOp: false
    })

    const showSelect = (e) => {
        let target = e.target.name
        if (target === 'Name Population') {
            setOrderFilter({
                ...orderFilter,
                name: !orderFilter.name
            })
        }
        if (target === 'Continent Select') {
            setShowSelectOp({
                ...showSelectOp,
                continenyOP: !showSelectOp.continenyOP
            })
        }
        if (target === 'Activity Select') {
            setShowSelectOp({
                ...showSelectOp,
                activityOp: !showSelectOp.activityOp
            })
        }
    }

    //---
    return (

        <div className={style.container}>

            <div className={style.showAll}>
                <button className={style.showAllButton} onClick={showAll}>Mostrar Todos Los Paises</button>
            </div>

            <div>
                <button className={style.filterButtons} type='button' name='Name Population' onClick={showSelect}>Bucar Por Nombre y Poblacion</button>

                <div onChange={orderHandler} hidden={orderFilter.name ? false : true}>
                    <select className={style.select} name='option1' value={orderFilter.option1}>
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Nombre">Nombre</option>
                        <option className={style.options} value="Poblacion">Poblacion</option>
                    </select>
                    <select className={style.select} name='option2' value={orderFilter.option2}>
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Ascendente">Ascendente</option>
                        <option className={style.options} value="Descendente">Descendente</option>
                    </select>
                </div>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showSelect} name='Continent Select'>Buscar Por Contienente</button>
                <div >
                    <select className={style.selectWidth} onChange={handlerOptionContinent} hidden={showSelectOp.continenyOP ? false : true} value={reset.continent}>
                        <option value='Empty'>Seleccionar</option>
                        {
                            resultContinentes.map((e, i) => (
                                <option key={i} className={style.options} value={e}>{e}</option>
                            ))

                        }
                    </select>
                </div>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showSelect} name='Activity Select'>Buscar Por Actividad Turistica</button>
                <div hidden={showSelectOp.activityOp ? false : true}>
                    <select className={style.selectWidth} onChange={handlerOptionActivity} value={reset.activity}>
                        <option value='Empty'>Seleccionar</option>
                        {
                            resultActividades[0] ? resultActividades.map(e => (

                                <option className={style.options} value={e}>{e}</option>
                            )) : <option value='No Activity'> No Hay Actividades </option>

                        }
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Filtros;
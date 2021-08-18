import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
// Styles
import style from '../Home/Home.module.css';

function OrderFilter({ page, setPage, watcher }) {

    const orderFilter = useSelector(state => state.orderFilter);
    // console.log(orderFilter)
    // console.log('Order Filter', watcher.orders)
  
    useEffect(() => {
        const changePages = () => {
            setPage({
                ...page,
                currentPage: 0,
                nextPage: 1,
                prevPage: 0,
                totalPages: Math.ceil(orderFilter.length / 10)
            })
        }
        changePages()
    }, [watcher.orders])

    return (
        <div className={style.container}>
            {
                orderFilter[0] && orderFilter.slice(page.currentPage * page.limit, page.nextPage * page.limit).map(e => (
                    <Link to={`/countryDetail/${e.id}`}>
                        <div key={e.id} className={style.country}>
                            <div >
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

export default OrderFilter;
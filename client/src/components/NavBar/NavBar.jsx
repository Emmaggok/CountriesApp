import React from 'react'
import { Link } from 'react-router-dom';

// Styles
import styles from './NavBar.module.css';
// Icons
import { GiWorld } from "react-icons/gi";

function NavBar({ showFilters, showAll }) {
    return (
        <>
            <div className={styles.navbar}>
                <Link to='/home' className={styles.home}><span onClick={showAll}><GiWorld /></span></Link>
                <button className={styles.filters} onClick={showFilters}>Filtros</button>
                <Link className={styles.linkNav} to='/postactivity'>Crear Actividad Turistica</Link>
            </div>
        </>
    )
}

export default NavBar;
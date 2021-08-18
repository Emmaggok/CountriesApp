import React from 'react'
import { Link } from 'react-router-dom';

// Styles
import styles from '../NavBar/NavBar.module.css';
// Icons
import { GiWorld } from "react-icons/gi";

function NavBarDetail() {
    return (
        <>
            <div className={styles.navbar}>
                <Link to='/home' className={styles.home}> <GiWorld /> </Link>
                <span className={styles.navbarDetail}>Detalles del Pais</span>
                <Link className={styles.linkNav} to='/postactivity'>Crear Actividad Turistica</Link>
            </div>
        </>
    )
}

export default NavBarDetail;
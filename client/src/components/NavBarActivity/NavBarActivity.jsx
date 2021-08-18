import React from 'react';
import { Link } from 'react-router-dom'

// Styles
import styles from './NavBarActivity.module.css';
// Icons
import { GiWorld } from "react-icons/gi";

function NavBarActivity() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.home} to='/home'> <GiWorld /> </Link>
            <h3 className={styles.title}>Crear Actividad Turistica</h3>
        </div>
    )
}

export default NavBarActivity;
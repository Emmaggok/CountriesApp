import React from 'react';
import style from '../App.module.css';

import { Link } from 'react-router-dom';


function Enter() {
    return (
        <div className={style.container}>
            <Link className={style.enter} to='/home'> INGRESAR </Link>
        </div>
    )
}

export default Enter
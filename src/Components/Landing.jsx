import React from "react";
import {Link} from 'react-router-dom';
import Style from './Styles/Landing.module.css';

export default function landing(){
    return(
        <div className={Style.all}>
            <div className={Style.about}>
                <h1>WELCOME TO MY INDIVIDUAL PROJECT</h1>
                <h2>Gonzalo Torres Grau</h2>
                <Link to='/countries'>
                        <label id='home'><button id='home' className={Style.btn}>NEW WORLD</button></label>
                </Link>
            </div>
        </div>
    )
}
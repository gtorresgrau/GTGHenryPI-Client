import React from "react"
import Style from './Styles/Error404.module.css'
import { Link } from "react-router-dom";

export default function Error404(){
    return(
        <div className={Style.container}>
            <div className={Style.Error404}>
                <h1>404</h1>
                <p>PAGE NOT FOUNT</p>
                <div className={Style.backContain}>
                <Link to='/countries'>
                    <button className={Style.back} >BACK</button>
                </Link>
            </div>
            </div>
        </div>
    )
}
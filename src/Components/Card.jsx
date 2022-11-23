import React from "react";
import Style from './Styles/Card.module.css'

export default function Card({ flags , name, continents, population   }) {
   return (
    <div className={Style.card} key={name}>
        <img src={flags} alt={name} className={Style.flag}/>
        <h2 className={Style.hname}>{name}</h2>
        <h2 className={Style.hname} >{continents}</h2>
        <h3 className={Style.hname} >Population :{population}</h3>
    </div>
  );
};
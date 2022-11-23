import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCountries, getActivities, filterByContinent, sortAz, sortPop, getCountActivities } from "../Actions/index.js";

import Nav from "./Nav.jsx";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import Style from './Styles/Home.module.css'


export default function Home (){
    const dispatch = useDispatch();
    //const{id} = useParams ();
    const allCountries = useSelector((state)=> state.countries);
    const activities = useSelector((state) => state.activities);

    const filterCont = document.getElementById('filterCont')
    const filterAct = document.getElementById('filterAct')

    

    const [page, setPage] = useState(1);
    const [countriesPage] = useState(10);
    const [, setOrden] = useState(1);
                        
    let indexLastCountry =  page * countriesPage;
    let indexFirstCountry = indexLastCountry - countriesPage
    
     if(page === 1){
        indexLastCountry = 9;
        indexFirstCountry = 0;
     }else{
        indexLastCountry = indexLastCountry -1;
        indexFirstCountry = indexFirstCountry -1;
     };
    
    const actualyCountries = allCountries.slice(indexFirstCountry, indexLastCountry); // 0 a 10

    useEffect(()=>{
        dispatch(getActivities());
    },[dispatch]);
    
    useEffect(()=>{
        dispatch(getCountActivities());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch]);

    function handlerFilterContinent(e){
        setPage(1);
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
        filterAct.value='All';
    }
    
    function handlerActivities(e){
        e.preventDefault();
        dispatch(getActivities(e.target.value))
        dispatch(getCountActivities(e.target.value))
        filterCont.value='world';
    }

    function handlerFilter(e){
      dispatch(sortAz(e.target.value))
      
      setOrden(e.target.value)
      setPage(1);
    }

    function handlerFilterPop(e){
      dispatch(sortPop(e.target.value))
      setOrden(e.target.value)
      setPage(1);
    }

    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <div className={Style.navigate}>
                    <Nav setPage={setPage} className={Style.nav}/>
                </div>
                <form id='Filtros' className={Style.filters}>
                    <div className={Style.sort}>
                        <div className={Style.az}>
                            <p>Sort by Name</p>
                            <label htmlFor='az'>
                            <input name='sortName' id='az' value='az' type='radio' className='input-radio' onChange={e=>handlerFilter(e)}/>A-Z</label>
                            <label htmlFor="za">
                            <input name='sortName' id='za' value='za' type='radio' className='input-radio' onChange={e=>handlerFilter(e)}/>Z-A</label>
                        </div>
                        <div className={Style.mm}>
                            <p>Sort by Population</p>
                            <label htmlFor='+a-'>
                            <input name='sortPop' id='+a-' value='+a-' type='radio' className='input-radio' onChange={e=>handlerFilterPop(e)}/> Mayor a Menor </label>
                            <label htmlFor='-a+'>
                            <input name='sortPop' id='-a+' value='-a+' type='radio' className='input-radio' onChange={e=>handlerFilterPop(e)}/> Menor a Mayor </label>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <div className={Style.cont}>
                            <p>Filter by Continent</p>
                            <select onChange={e=>handlerFilterContinent(e)} defaultValue='world' id='filterCont'>
                                <option value='world' >All Continents</option>
                                <option value='Antarctica'>Antartica</option>
                                <option value='Africa'>Africa</option>
                                <option value='Asia'>Asia</option>
                                <option value='Europe'>Europe</option>
                                <option value='Oceania'>Oceania</option>
                                <option value='South America'>South America</option>
                                <option value='North America'>North America</option>
                            </select>
                        </div>
                        <div className={Style.act}>
                            <p>Filter by Activity</p>
                            <select onChange={handlerActivities} defaultValue='All' id='filterAct'>
                                <option disabled value='All'>All Activities</option>
                                {activities.map((e)=>(
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className={Style.paginado}>
            <Paginado 
                    countriesPage={countriesPage}
                    allPages={allCountries.length}
                    page={page}
                    setPage={setPage}
            />
            </div>
            <div className={Style.cards}>
                { actualyCountries?.map((e)=>{
                    return(
                            <div key={e.id} className={Style.oneCountry} >
                                <Link to={`/countries/${e.id}`}>
                                    <Card flags={e.flags} name={e.name} continents={e.continents} population={e.population} key={e.id}/>
                                </Link>
                            </div>
                            )
                })}
            </div>
        </div>
    )
};
import React from "react";
import {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { addActivity, getActivities, filterByContinent} from "../Actions/index.js";
import Style from './Styles/NewActivity.module.css'


export default function CreateActivity(){
    const dispatch = useDispatch();
    const countriesId = useSelector((state) => state.countries)
    //console.log('countid: ',countriesId)
    
    const form = document.getElementById('newActiviy')
    const btn = document.getElementById('btn')

    const datos = {
        name:'', 
        difficulty:'', 
        duration:'', 
        season:'',
        countriesId:[],
    };   

    const [input, setInput] = useState(datos)
    const [errores, setErrores] = useState({});

    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch]);

    function validate(input){
        let errores = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if(!input.name.trim()){ 
            errores.name = 'Name is Required'
        }else if(!regexName.test(input.name.trim())){
            errores.name = 'Name only accept leters and spaces';
        };
        if(!input.duration) errores.duration = 'Duration is Required';
        if(!input.difficulty) errores.difficulty = 'Difficulty is Required, only acept number from 1 to 5';
        if(!input.season || input.season === 'Not') errores.season = 'Season is Required';
        if(!input.countriesId.length || input.countriesId === 'Not') errores.countriesId = 'The activity must be developed in a country';
        return errores;
    }


    function handlerOnChange(e){
        let valor = e.target.value
        if(e.target.name === 'name'){
            valor = valor.charAt(0).toUpperCase()
            + valor.slice(1)}
        setInput({
            ...input,
            [e.target.name]: valor
        })
        setErrores(validate({
           ...input,
           [e.target.name]: valor
        }));
    };
   
    function handlerFilterContinent(e){
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
      }
    
    function handlerSelect(e){
        if(!input.countriesId.includes(e.target.value)){
        setInput({
            ...input,
            countriesId: [...input.countriesId, e.target.value ]
        })
        setErrores(validate({
            ...input,
            countriesId: e.target.value
         }));
        }else{alert('The Country was already selected')}
    };

    function handleDelete(el){
        setInput({
            ...input,
            countriesId: input.countriesId.filter((country) => country !== el)
        })
    };

    function handlerSubmit(e){
        e.preventDefault();
        if(Object.keys(errores).length === 0 ){
                console.log(input)
                dispatch(addActivity(input))
                alert('Activity created succesfully')
                setInput({
                    name: '', 
                    difficulty:'', 
                    duration:'', 
                    season:'',
                    countriesId:[],
                })
                form.reset();
                btn.disabled = true;     
        }else{
            btn.disabled = true;
            alert('The activity was not created, the form contains errors.')
        }
    };

return (
    <div className={Style.general}>
        <Link to='/countries'>
            <button className={Style.back}>Back</button>
        </Link>
    <div className={Style.container}>
        <header className={Style.header}>
            <h1>Create a new Tourist Activity</h1>
            <p>Complete all required fields</p>
        </header>
        <form onSubmit={handlerSubmit} id='newActiviy' className={Style.newActiviy}>
            <div className={Style.groups}>
                <input type='text' className={Style.input} name='name' placeholder=" " value={input.name} onChange={handlerOnChange} autoComplete='off'/>
                <label htmlFor='name' className={Style.label}>Name</label>
                {errores.name && (<p className='errores'>{errores.name}</p>)}
            </div>
            <div className={Style.groups}>
                <input type='number' className={Style.input} name='difficulty' placeholder=' ' value={input.difficulty} onChange={handlerOnChange}  autoComplete='off' min='1' max='5'/>
                <label htmlFor='difficulty' className={Style.label}>Difficulty 1-5</label>
                {errores.difficulty && (<p className='errores'>{errores.difficulty}</p>)}
            </div>
            <div className={Style.groups}>
                <input type='number' className={Style.input} placeholder=' ' name='duration' value={input.duration} onChange={handlerOnChange}  autoComplete='off' min='1' max='12'/>
                <label htmlFor='duration' className={Style.label}>Duration</label>
                {errores.duration && (<p className='errores'>{errores.duration}</p>)}
            </div>
            <div className={Style.groups}>
                <select name='season'className={Style.input} onChange={handlerOnChange} defaultValue='Not'>
                        <option value="Not">Select a Season</option>
                        <option value="SUMMER">Summer</option>
                        <option value="FALL">Fall</option>
                        <option value="WINTER">Winter</option>
                        <option value="SPRING">Spring</option>
                        <option value="ALL SEASON">All Season</option>
                </select>
                {errores.season && (<p className='errores'>{errores.season}</p>)}
            </div>
            <div className={Style.groups}>
                <label htmlFor='filterCont'></label>
                <select className={Style.input} onChange={e=>handlerFilterContinent(e)} defaultValue='world'>
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
            <div className={Style.groups}>
                    <label htmlFor='addCount'></label>
                    <select className={Style.input} onChange={handlerSelect} name='countriesId' id='countrisId' defaultValue='Select'>
                        <option disabled value='Select'>Select a Country</option>
                        {countriesId.map((e)=>(<option key={e.id} value={e.id}>{e.name}</option> ))}
                    </select>
                    {errores.countriesId && (<p className='errores'>{errores.countriesId}</p>)}
            </div>
            <div className={Style.submit}>
                <button className={Style.btnSubmit} type="Submit" id ='btn' disabled={!input.name || !input.duration || !input.difficulty || !input.season || !input.countriesId.length}>CREATE</button>
            </div>
        </form>
        <div className={Style.canceled}>
            <Link to='/countries'>
                <button className={Style.cancel}>CANCEL</button>
            </Link>
        </div>
        <div className={Style.selected}>
                <label className={Style.count}>Selected Countries: </label>
                    <div className={Style.footer}>
                        { input.countriesId.map (el =>
                            <div key={el}>
                                <p>{el}</p> 
                                <button className={Style.cancel} onClick={()=>handleDelete(el)} key={el.id}>x</button>
                            </div>
                        )}
                    </div>
        </div>
    </div>
    </div>
)
};

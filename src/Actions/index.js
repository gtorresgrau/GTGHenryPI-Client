import axios from 'axios';

import { 
    GET_COUNTRIES,
    GET_AZ,
    GET_POP,
    GET_DETAILS, 
    GET_COUNTRY, 
    GET_CONTINENT,
    GET_ACTIVITIES,
    GET_COUNTBYACT,
  } from './ActionsType.js';


//

export function getCountries(){
    return async function(dispatch){
        try{
            let allcountries = await axios(`/countries`);
            //console.log(allcountries.data)
                return dispatch({
                    type: GET_COUNTRIES,
                    payload: allcountries.data
                })
        }
        catch(e){
            window.location.href = "/countries/";
            alert(`Something happened when fetching the data from the Server, try to refresh the web`)
        }
    }
}
//-----------------------------------------------------------------------------
        
export function sortAz(payload){
    return{
        type: GET_AZ,
        payload
    }
};

export function sortPop(payload){
    return{
        type: GET_POP,
        payload
    }
};

//---------------------------------------------------------------------------------------------

export function getCountriesByName(name){
    return async function(dispatch){
        try{
            let getCountry = await axios(`/countries?name=${name}`);
                return dispatch({
                    type: GET_COUNTRY,
                    payload: getCountry.data
                })
        }
        catch(e){
            window.location.href = "/countries/";
            console.log(`There are no Countries with the combination of Characters entered: ${name}`)
            alert(`There are no Countries with the combination of Characters entered: ${name}`)
        }
    }
};

export function filterByContinent(payload){
    return async function(dispatch){
        if(payload === 'world') { var urlBack = `/countries`}
        else{ urlBack = `/countries/continent/${payload}`}
        try{                
            let getContinent = await axios(urlBack);
                return dispatch({
                    type: GET_CONTINENT,
                    payload: getContinent.data
                })
            
            }
            catch(e){
                window.location.href = "/countries/";
                console.log(`Something happened when filtering by continent: ${payload}`)
                alert(`Something happened when filtering by continent: ${payload}`)
            }
    }
};

//--------------------------------------------------------------------------------------------------

export function getActivities(){
    return async function(dispatch){
        const activities = await axios(`/activities`);
        return dispatch({
            type: GET_ACTIVITIES,
            payload: activities.data
        })
    }
};

export function getCountActivities(payload){
    return async function(dispatch){
        //console.log( 'payload:', payload )
        return dispatch({
            type: GET_COUNTBYACT,
            payload
        })
    }
};

export function addActivity(payload){
    return async function(){
        const add = await axios.post(`/activities`, payload)
        return add;
    }
};


//------------------------------------------------------------------------------------------
export function details(id){
    return async function(dispatch){
        try{
            const info = await axios(`/countries/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: info.data
            })
        }
        catch(e){
            window.location.href = "/countries";
            console.log(`Something happened when filtering by id: ${id}`)
            alert(`Something happened when filtering by id: ${id}`)
        }
    }
}
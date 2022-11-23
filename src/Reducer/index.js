import { 
    GET_COUNTRIES,
    GET_AZ,
    GET_POP,
    GET_DETAILS, 
    GET_COUNTRY, 
    GET_CONTINENT,
    GET_ACTIVITIES,
    ADD_ACTIVITY,
    GET_COUNTBYACT,
  } from '../Actions/ActionsType.js';

export const initialState ={
    countries: [],
    allCountries:[],
    detail: [],
    activities:[]
}

export default function rootReducer(state = initialState, action ){
    switch(action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case GET_AZ:
            let sort = action.payload === 'az'
            ?state.countries.sort((a,b) => {
                if(a.name>b.name)return 1;
                if(a.name<b.name)return -1;
                return 0})
           :state.countries.sort((a,b)=>{
                    if(a.name>b.name)return -1;
                    if(a.name<b.name)return 1;
                    return 0;})
            return{
                ...state,
                countries: sort
            }
        case GET_POP:
            let sortpop = action.payload === '+a-'
            ?state.countries.sort((a,b) => {
                if(a.population>b.population)return -1;
                if(a.population<b.population)return 1;
                return 0})
           :state.countries.sort((a,b)=>{
                if(a.population>b.population)return 1;
                if(a.population<b.population)return -1;
                return 0})
            return{
                ...state,
                countries: sortpop
            }
        case GET_COUNTRY:
            return{
                ...state,
                countries: action.payload,
            }
        case GET_CONTINENT:
            return{
                ...state,
                countries: action.payload,
            }
        case GET_ACTIVITIES:
            const actset = new Set();
            const filterAct = action.payload.reduce((acc, act) => {
                if (!actset.has(act.name)){
                    actset.add(act.name, act)
                    acc.push(act)
                    }
                return acc;
              },[]);
           return{
             ...state,
              activities: filterAct
            }
        case GET_COUNTBYACT:
            const CountriesWithActivities = [];
            state.allCountries.map(e=>{
                if(e.Activities.length){
                    e.Activities.map(el => {if(el.name === action.payload){
                      return  CountriesWithActivities.push(e)
                    } return 'ok'}) 
                } return console.log('Activities filtered')
            })
            return{
             ...state,
             countries: CountriesWithActivities
            }
        case ADD_ACTIVITY:
            return{
                ...state,
            }
        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload,
            }
        default :
                return{
                    ...state
                }
}};

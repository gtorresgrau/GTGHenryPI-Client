import {createStore, applyMiddleware, compose} from 'redux';
import thunk  from 'redux-thunk';
import rootReducer from '../Reducer';


export const store = createStore(rootReducer, compose(applyMiddleware(thunk))); 

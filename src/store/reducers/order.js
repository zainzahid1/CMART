import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    product: {},
    
};


// FETCH ORDER



const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
      
    } );
};




const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        
        default: return state;
    }
};

export default reducer;
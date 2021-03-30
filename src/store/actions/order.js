import * as actionTypes from './actionTypes';


// FETCH ORDER

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrders = () => {
    return {
        type: actionTypes.FETCH_ORDERS,
    }
};


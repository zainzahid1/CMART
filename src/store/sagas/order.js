import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';



export function* fetchOrdersSaga(action) {

    const response = yield axios.get('/AdminPortal/get_product.php')
    const fetchedOrders = [];
    for (let key in response.data) {
        fetchedOrders.push({
            ...response.data[key],
            id: key
        });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
};

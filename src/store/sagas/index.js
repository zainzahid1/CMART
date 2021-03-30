import { takeEvery,  } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';
import { fetchOrdersSaga } from './order';


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}



export function* watchOrder() {
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)

}
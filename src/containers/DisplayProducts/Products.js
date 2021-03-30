import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import classes from './Products.module.css'
import currencyFormatter from 'currency-formatter'
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Product from '../../components/Products/Product'
import Spinner from '../../components/UI/Spinner/Spinner'


const Orders = props => {

    const { onFetchOrders, } = props;
    useEffect(() => {
        onFetchOrders();
    }, [onFetchOrders,])

    if (!props.orders.length) return <Spinner />;
    return (

        <div className={classes.imggrid}>
            <Grid container fluid spacing={2}>
                {props.orders.map(order => (
                    <Grid key={order.id} item xs={12} sm={6} md={5} lg={3}>
                        <Product
                            id={order.id}
                            ProductImage={`http://localhost/CMart/AdminPortal/uploads/${order.image}`}
                            ProductName={order.name}
                            ProductPrice={currencyFormatter.format(order.price, { code: '' })}
                        />

                    </Grid>
                ))}
            </Grid>

        </div>

    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);



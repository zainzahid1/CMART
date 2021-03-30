import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import {Link} from 'react-router-dom'
import emptyCartImage from '../../assets/images/emptyOrder.png';
import './Cart.scss'


const Cart = () => {
    const { orders, totalQuantities, totalPrice,  } = useSelector(state => state.CartReducer);
    const dispatch = useDispatch();      

    const checkout = () => {
        const data = {
            customer_id: localStorage.getItem('Id'),
            netTotal: totalPrice
        }
        axios.post('/UserPortal/CartItems/checkout.php', data )
            .then((response) => {
              console.log(response.data);
            })
    }


    return (
        <div className="cart">
            <div className="container">
                <h3>Your Cart</h3><br /><br /><br />
                {orders.length > 0 ? <>
                    <div className="row">
                        <div className="col-9">
                            <div className="cart__heading">
                                <div className="row">
                                    <div className="col-2">Product</div>
                                    <div className="col-2">Name</div>
                                    <div className="col-2">Unit Price</div>
                                    <div className="col-2">Quantity</div>
                                    <div className="col-2">Total Price</div>
                                    <div className="col-2">Remove</div>
                                </div>
                            </div>
                              {orders.map(product=> (
                                <div className="row verticalAlign" key={product.id}>
                                    <div className="col-2">
                                        <div className="cart__image">
                                            <img src={`http://localhost/CMart/AdminPortal/uploads/${product.image}`} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__name">
                                            {product.name}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__price">
                                            <p>Rs {currencyFormatter.format(product.price, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="details__info cart__incDec">
                                            <div className="details__incDec">
                                                <span className="dec" onClick={() => dispatch({ type: 'DEC', payload: product.id , payload3: product.quantity  })}><BsDash /></span>
                                                <span className="quantity">{product.quantity}</span>
                                                <span className="inc" onClick={() => dispatch({ type: 'INC', payload: product.id , payload2: product.quantity })}><BsPlus /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__total text-center">
                                            <p>Rs {currencyFormatter.format(product.price * product.quantity, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__remove" onClick={() => dispatch({ type: 'REMOVE', payload: product.id })}>
                                            <RiDeleteBin6Line />
                                        </div>
                                    </div>
                                </div>
                              ))}
                        </div>
                        <div className="col-3 summary-col">
                            <div className="summary">
                                <div className="summary__heading">
                                    Summary
                            </div>
                                <div className="summary__details">
                                    <div className="row mb-10">
                                        <div className="col-6">
                                            Total Items:
                                    </div>
                                        <div className="col-6">{totalQuantities}</div>
                                    </div>
                                    <div className="row mb-10">
                                        <div className="col-6">
                                            Total Price
                                    </div>
                                        <div className="col-6">
                                            <p>Rs {currencyFormatter.format(totalPrice, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to="/checkout/"
                                   ><button style={{outline: 'none'}} className="checkout" onClick={checkout}>Checkout</button></Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <div className="divImage"> <img className="image" src={emptyCartImage} alt="empty-cart"></img></div>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};

export default connect(mapStateToProps)(Cart, axios);









/* 
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import {Link} from 'react-router-dom'
import './Cart.scss'


const Cart = () => {
    const { orders, totalQuantities, totalPrice } = useSelector(state => state.CartReducer);
    const dispatch = useDispatch();

  

    return (
        <div className="cart">
            <div className="container">
                <h3>Your Cart</h3><br /><br /><br />
                {orders.length > 0 ? <>
                    <div className="row">
                        <div className="col-9">
                            <div className="cart__heading">
                                <div className="row">
                                    <div className="col-2">Product</div>
                                    <div className="col-2">Name</div>
                                    <div className="col-2">Unit Price</div>
                                    <div className="col-2">Quantity</div>
                                    <div className="col-2">Total Price</div>
                                    <div className="col-2">Remove</div>
                                </div>
                            </div>
                            {orders.map(product => (
                                <div className="row verticalAlign" key={product.id}>
                                    <div className="col-2">
                                        <div className="cart__image">
                                            <img src={`http://localhost/CMart/AdminPortal/uploads/${product.image}`} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__name">
                                            {product.name}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__price">
                                            <p>Rs {currencyFormatter.format(product.price, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="details__info cart__incDec">
                                            <div className="details__incDec">
                                                <span className="dec" onClick={() => dispatch({ type: 'DEC', payload: product.id })}><BsDash /></span>
                                                <span className="quantity">{product.quantity}</span>
                                                <span className="inc" onClick={() => dispatch({ type: 'INC', payload: product.id })}><BsPlus /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__total text-center">
                                            <p>Rs {currencyFormatter.format(product.price * product.quantity, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__remove" onClick={() => dispatch({ type: 'REMOVE', payload: product.id })}>
                                            <RiDeleteBin6Line />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-3 summary-col">
                            <div className="summary">
                                <div className="summary__heading">
                                    Summary
                            </div>
                                <div className="summary__details">
                                    <div className="row mb-10">
                                        <div className="col-6">
                                            Total Items:
                                    </div>
                                        <div className="col-6">{totalQuantities}</div>
                                    </div>
                                    <div className="row mb-10">
                                        <div className="col-6">
                                            Total Price
                                    </div>
                                        <div className="col-6">
                                            <p>Rs {currencyFormatter.format(totalPrice, { code: '' })}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Link to="/checkout/"
                                   ><button style={{outline: 'none'}} className="checkout" >Checkout</button></Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : 'Your cart is empty!'}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};


export default connect(mapStateToProps)(Cart, axios); */
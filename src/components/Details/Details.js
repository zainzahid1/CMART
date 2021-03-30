import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import { useDispatch } from "react-redux";
import './Details.scss';


const Details = (props) => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [quantity,setQuantity] = useState(1);
  
    
    const decQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    var c = props.orders.find(product => product.id === id)
   
   if(props.orders.length === 0){
    return <Spinner/>;
   }

   const cartData = () => {
    dispatch({type: 'ADD_TO_CART', payload: {c, quantity} })
  
   }

    return (
        <div className="containerfluid">
            <div className="container mt-100 ">
                <div className="row margin_top">
                    <div className="col-6">

                        <div className="details__image">
                            <img src={`http://localhost/CMart/AdminPortal/uploads/${c.image}`} alt="" />
                        </div>
                    </div>
                    <div >
                        <div className="details__name">
                            {c.name}
                        </div>
                        <div className="details__prices">
                            <span className="details__actaul"><p>Rs. {currencyFormatter.format(c.price, { code: '' })}</p></span>

                        </div>
                        <div className="details__info">
                            <div className="details__incDec">
                                <span className="dec" onClick={decQuantity}><BsDash /></span>
                                <span className="quantity">{quantity}</span>
                                <span className="inc" onClick={() => setQuantity(quantity + 1)}><BsPlus /></span>
                                <button  style={{outline: 'none'}} className="btn-default"  onClick={cartData}>add to cart</button>
                            </div>
                        </div>
                        <div className="details__p">
                            <h4>Details</h4>
                            {c.description}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};


export default connect(mapStateToProps)(Details, axios);




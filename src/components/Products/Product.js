import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import axios from '../../axios-orders';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Product.scss';
toast.configure();


const ProductsGallery = (props) => {

    const dispatch = useDispatch();

    const [quantity] = useState(1);
    
    var c = props.orders.find(product => product.id === props.id)


    const signUpToBuy = () => {
        toast.error("Signup first to buy items, Thank you! ")
    }
    

    const addToCart = () => {
        dispatch({type: 'ADD_TO_CART', payload: {c, quantity} })
    }

    if (!props.ProductImage) return <Spinner />;
    

    return (
        <div className="container">
            <div className="cards-slider">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="card overflow">
                      <Link to={`/details/${props.id}`}><img className="card-img-top overflow" src={props.ProductImage} alt="Card images" /><br /></Link>  
                        <div className="card-body">
                            <h3 className="card-title">{props.ProductName}</h3>
                            <p className="card-text">{'Rs '+props.ProductPrice}</p>
                        </div> 
                        {localStorage.getItem('email') ?
                        <div>
                        <button style={{outline: 'none'}} type="button" className="btn btn-danger btn-lg col-md-12 rounded-0" onClick={addToCart}  >Add to cart</button>
                        
                    </div>
                     : <div> 
                         <button style={{outline: 'none'}} type="button" className="btn btn-danger btn-lg col-md-12 rounded-0" onClick={signUpToBuy} >Add to cart</button>
                         </div> 
                    }
                    </div>
                        
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};


export default connect(mapStateToProps)(ProductsGallery, axios);







/* import React from 'react';
import {Link} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux';
import { useSelector,useDispatch } from "react-redux";
import axios from '../../axios-orders';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const ProductsGallery = (props) => {


    
    const signUpToBuy = () => {
        toast.error("Signup first to buy items, Thank you! ")
    }

    const addToCart = () => {

    }

    if (!props.ProductImage) return <Spinner />;

    return (
        <div className="container">
            <div className="cards-slider">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="card overflow">
                      <Link to={`/details/${props.id}`}><img className="card-img-top overflow" src={props.ProductImage} alt="Card images" /><br /></Link>  
                        <div className="card-body">
                            <h3 className="card-title">{props.ProductName}</h3>
                            <p className="card-text">{'Rs '+props.ProductPrice}</p>
                        </div>
                        {localStorage.getItem('email') ?
                        <div>
                        <button style={{outline: 'none'}} type="button" className="btn btn-danger btn-lg col-md-12 rounded-0"  >Add to cart</button>
                    </div>
                     : <div> 
                         <button style={{outline: 'none'}} type="button" className="btn btn-danger btn-lg col-md-12 rounded-0" onClick={signUpToBuy} >Add to cart</button>
                         </div> 
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,

    };
};


export default connect(mapStateToProps)(ProductsGallery, axios); */




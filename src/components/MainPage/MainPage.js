import React,{useEffect} from 'react';
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxiliary/Auxiliary';

import Carousel from '../../components/UI/Carousel/Carousel';
import ProductHeader from '../../components/Products/ProductHeader'
import Products from '../../containers/DisplayProducts/Products'

const MainPage = props => {

    useEffect(()=>{
        axios.post('/UserPortal/user_login_google.php', {
            email: localStorage.getItem('email'),
          })
            .then((response) => {
                let backdata = response.data;
                console.log(backdata)
                if (backdata === null) {
                 return null;
                }
                else {
                  localStorage.setItem('Id',backdata.customer_id)                  
                }
    })
},[]);
 
    return (

        <Aux>
            <Carousel /><br/><br/>
            <ProductHeader/><br/><br/>
            <Products/>
        </Aux>
    );
}



export default MainPage;
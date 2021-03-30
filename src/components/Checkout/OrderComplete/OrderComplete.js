import React, { useEffect, useState } from 'react'
import axios from '../../../axios-orders';
import orderImage from '../../../assets/images/happy-shopping.jpg'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Redirect} from 'react-router-dom';
import './OrderComplete.scss';

const OrderComplete = (props) => {

    const [shippingDetails, setShippingDetails] = useState([]);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        axios.post('/UserPortal/CartItems/order_fetch.php', {
            customer_id: localStorage.getItem('Id'),
            order_no: sessionStorage.getItem('Order-No')
        })
            .then((response) => {
                setShippingDetails(response.data);
            })
    }, []);

    const goToHomePage = () => {
        sessionStorage.removeItem('Order-No');
        setRedirect(true);
    }

    if(redirect){
        return (<Redirect to={'/'} />)
    }

    return (
        <div class="container containerProperties">
            <div class="row">
                {shippingDetails.map(({ order_no, firstname, lastname, address, city, state }) => (
                    <div class="col-sm-8">
                        <h2 >
                            Your order #<span className="orderno">{order_no}</span>
                            <span> is complete!</span>
                        </h2><br/>
                        <h4 className="textInfo">
                            Thanks for shopping at CMART - We sent an email to <span className="email">{localStorage.getItem('email')}</span> with your full receipt.
                            Please check spam if the email has not arrived within 5 minutes.
                        </h4><br/><br/><br/>

                        <div class="divider bg-dark"></div>

                        <br/><br/>

                        <h4>SHIPPING TO</h4>
                        <br/><br />
                        <div>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>{' ' + firstname + ' '}{lastname}</Typography>
                                <Typography variant="h6" gutterBottom>{' ' + address}</Typography>
                                <Typography variant="h6" gutterBottom>{' ' + city}</Typography>
                                <Typography variant="h6" gutterBottom>{' ' + state}</Typography>
                            </Grid>
                        </div>
                        <br/><br /><br />
                        <button type="button" className="btn-default btn btn-lg" onClick={goToHomePage}>Shop Again</button><br /><br /><br /><br />
                    </div>
                ))}
                <div class="col-sm-4">
                    <img className="img" src={orderImage} alt="order-images"></img>
                </div>
            </div>
        </div>
    )
}


export default OrderComplete;




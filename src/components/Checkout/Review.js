import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios-orders';
import { BsGeoAlt, BsFillHouseDoorFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdLocationCity,MdPayment } from "react-icons/md";


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
    color: '#BB1F55',
    border: '3px solid #BB1F55',
    padding: '3px'
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = () => {
    const [products,setProducts] = useState([]);
    const [shippingDetails,setShippingDetails] = useState([]);
    const [netTotal,setNetTotal] = useState('');

  const classes = useStyles();

  useEffect(()=>{
    const timer = setTimeout(() => {

        axios.post('/UserPortal/CartItems/checkout_details_summary.php' , {
            customer_id: localStorage.getItem('Id'),
        } )
        .then((response) => {
            setProducts(response.data);  
        })  
        axios.post('/UserPortal/CartItems/checkout_details_summary_net_total.php' , {
            customer_id: localStorage.getItem('Id'),
        } )
        .then((response) => {
            setNetTotal(response.data);
        })  
        axios.post('/UserPortal/CartItems/checkout_details_summary_shipping.php' , {
            customer_id: localStorage.getItem('Id'),
        } )
        .then((response) => {
            setShippingDetails(response.data);
        })  
      }, 300);
      return () => clearTimeout(timer);
    
  },[]);
 

  return (
    
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Order summary
      </Typography>
     
      <List disablePadding>
      {products.map(({ name, total, quantity }) => (
          <ListItem className={classes.listItem}  key={name} >
           <ListItemText secondary={'x ' + quantity } >
                <Typography variant="h5" gutterBottom>
                  {name}  
               </Typography> 
             </ListItemText>  
              <Typography variant="h5">{'Rs. '+total}</Typography>
           </ListItem>
       
           ))}
        <ListItem className={classes.listItem}>
          <ListItemText> <Typography variant="h4" gutterBottom>Total</Typography></ListItemText>
          <Typography variant="h4" className={classes.total}>
            {netTotal.net_total +' PKR' }
          </Typography>
        </ListItem>
   
      </List>
     
      {shippingDetails.map(({ firstname, lastname, address, city, state }) => (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            Shipping
          </Typography>&nbsp;&nbsp;
          
          <Typography variant="h6" gutterBottom><FiUser />{' '+firstname + ' '}{lastname}</Typography>
          <Typography variant="h6" gutterBottom><BsGeoAlt />{' '+ address}</Typography>
          <Typography variant="h6" gutterBottom><BsFillHouseDoorFill />{' '+city}</Typography>
          <Typography variant="h6" gutterBottom><MdLocationCity />{' '+state}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            Payment details
          </Typography>&nbsp;&nbsp;
           <Grid container>
            {shippingDetails.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                {payment.payment_method === '1' ? <Typography variant="h6" gutterBottom><MdPayment/> Cash On Delivery</Typography>
                : <Typography variant="h6" gutterBottom><MdPayment/> Online Paid</Typography>}
                </Grid><br/><br/><br/><br/><br/><br/><br/>
                <Grid item xs={12} >
                 <small id="reminder"
                className="form-text text-muted float-right" style={{fontSize: '11px'}}>
                Review your order before going to place it!</small>
              </Grid>
              </React.Fragment>
            ))}
            
           </Grid>
         
        </Grid>  
      </Grid>
       ))}
    </React.Fragment>
 
  );
}

export default Review;
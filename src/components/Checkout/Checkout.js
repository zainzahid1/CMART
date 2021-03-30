import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import axios from '../../axios-orders';
import AddressForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Moment from 'moment';
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',

    },

  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
      backgroundColor: 'rgb(248, 246, 244)',

    },

  },
  stepper: {
    padding: theme.spacing(5, 0, 5),
    fontWeight: 'bold',
    backgroundColor: 'rgb(248, 246, 244)',


  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',

  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    border: "none"    
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
                  Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getStepContent(step, formValues = null, changeFormValue = null) {
  switch (step) {
  case 0:
    return <AddressForm addressValues={formValues} changeAddressValue={changeFormValue} />;
  case 1:
    return <PaymentForm paymentFormValues={formValues} changePaymentFormValue={changeFormValue}/>;
  case 2:
    return <Review />;
  default:
    throw new Error('Unknown step');
  }
}

export default function Checkout(props) {
  const classes = useStyles();
  const [addressFormValues, setAddressFormValues] = React.useState({});
  const [paymentFormValues, setPaymentFormValues] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const dispatch = useDispatch();

  
  
 // console.log('[paymentFormValues: ]', paymentFormValues)

 const orderIDHandler = () => {

    const length = 6;
    const timestamp = +new Date();
    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var ts = timestamp.toString();
    var parts = ts.split("").reverse();
    var id = "";

    for (var i = 0; i < length; ++i) {
        var index = _getRandomInt(0, parts.length - 1);
        id += parts[index];
    }
    return id;
}


  const handleNext = () => {
    setActiveStep(activeStep + 1);
    
    axios.post('/UserPortal/CartItems/checkout_details_check.php', {
        customer_id: localStorage.getItem('Id'),
    })
    .then((response) => {
    if(response.data === null)
    {
    axios.post('/UserPortal/CartItems/checkout_details.php', {
        customer_id: localStorage.getItem('Id'),
        firstname: addressFormValues.firstname,
        lastname: addressFormValues.lastname,
        address: addressFormValues.address,
        city: addressFormValues.city,
        state: addressFormValues.state
    })
    .then((response) => {
      console.log(response.data);
    })  
    
}
else{    
    axios.post('/UserPortal/CartItems/checkout_details_update.php', {
            customer_id: localStorage.getItem('Id'),
            firstname: addressFormValues.firstname,
            lastname: addressFormValues.lastname,
            address: addressFormValues.address,
            city: addressFormValues.city,
            state: addressFormValues.state,
            payment_method: paymentFormValues.checkedA
        })
        .then((response) => {
        console.log(response.data);     
        })     
    }
})
};

const placeOrder = () => {
    const orderno = orderIDHandler();
    axios.post('/UserPortal/CartItems/checkout_details_summary.php', {
        customer_id: localStorage.getItem('Id'),
    })
    .then((response) => {
    response.data.map((data)=> {
     return axios.post('/UserPortal/CartItems/order_items.php', {
            customer_id: localStorage.getItem('Id'),
            name: data.name,
            price: data.price,
            description: data.description,
            quantity: data.quantity,
            total: data.total,
            net_total: data.net_total,
            product_id: data.product_id
        })
      })
        const timer = setTimeout(() => {
       
        axios.post('/UserPortal/CartItems/place_order.php', {
            customer_id: localStorage.getItem('Id'),
            date: Moment(new Date()).format('DD/MM/yyyy'),
            time: Moment().format('h:mm:ss a'),
            order_no: orderno,
        })
        .then((response) => {
        console.log(response.data);  
        })
        
        dispatch({type: 'EMPTY'});
        setRedirect(true);
        sessionStorage.setItem('Order-No', orderno ) 
    }, 400);
      return () => clearTimeout(timer);
      
    })
   
}

  /* const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
 */
  const changeAddressFormValue = (key, value) => {
    let values = { ...addressFormValues };
    values[key] = value;
    setAddressFormValues(values);
  };
   const changePaymentFormValue = (key, value) => {
    let values = { ...paymentFormValues };
    values[key] = value;
    setPaymentFormValues(values);
  }; 

  if(redirect){
    return (window.location.href="/order-complete")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}></AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h3" align="center">
                        Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel><Typography component="h1" variant="h5" align="center">
                  {label} </Typography></StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                                    Your order number is {orderIDHandler()}. We have emailed your order 
                                     confirmation, and will
                                     send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : ( */}
            <React.Fragment>
                {
                  activeStep === 0 ? 
                    getStepContent(activeStep, addressFormValues, changeAddressFormValue)
                    : activeStep === 1 ?  getStepContent(activeStep, paymentFormValues, changePaymentFormValue)
                      : getStepContent(activeStep)
                }
                {<div className={classes.buttons}>
                {/*  { activeStep !== 0  && (
                    <Button variant="contained" style={{outline: 'none'}} 
                      className={classes.button}
                      onClick={handleBack}
                    >
                        Back
                    </Button>
                  )} */}

                    {activeStep === steps.length - 1 ? 
                     <Button style={{outline: 'none'}}
                     variant="contained"
                     color="secondary"
                     onClick={placeOrder}
                     className={classes.button}
                    
                   >
                       Place Order
                       </Button>
                     :
                  
                  <Button style={{outline: 'none'}}
                    variant="contained"
                    color="secondary"
                    onClick={handleNext}
                    className={classes.button}
                   
                  >
                      Next
                      </Button>
                   
                    }
                </div> }
            </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}


/* import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import Review from './Review';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',

        },

    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
            backgroundColor: 'rgb(248, 246, 244)',

        },

    },
    stepper: {
        padding: theme.spacing(5, 0, 5),
        fontWeight: 'bold',
        backgroundColor: 'rgb(248, 246, 244)',


    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',

    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        border: "none"    
    },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}></AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h3" align="center">
                        Checkout
          </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel><Typography component="h1" variant="h5" align="center">
                                    {label} </Typography></StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                </Typography>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                              {    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button variant="contained" style={{outline: 'none'}} onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button style={{outline: 'none'}}
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                    </div> }
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
} */
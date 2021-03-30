import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './CheckoutForm.scss';


const AddressForm = ({ addressValues, changeAddressValue }) => {


  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Customer Information
      </Typography><br /><br />

      <Grid container fluid spacing={3} >
        <Grid item xs={12} sm={6} >
          <label for="Firstname">Firstname</label>
          <input type="text" class="form-control" id="inputFirstName" placeholder="Firstname"  value={addressValues.firstname} onChange={(e) => changeAddressValue('firstname', e.target.value)} />

        </Grid>
        <Grid item xs={12} sm={6}>
          <label for="Lastname">Lastname</label>
          <input type="text" class="form-control" id="inputLastName" placeholder="Lastname" value={addressValues.lastname} onChange={(e) => changeAddressValue('lastname', e.target.value)} />

        </Grid>
        <Grid item xs={12}>
          <label for="Address">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Address" value={addressValues.address} onChange={(e) => changeAddressValue('address', e.target.value)} />

        </Grid>
        <Grid item xs={12} sm={6}>
          <label for="City">City</label>
          <input type="text" class="form-control" id="inputCity" placeholder="City" value={addressValues.city} onChange={(e) => changeAddressValue('city', e.target.value)} />

        </Grid>

        <Grid item xs={12} sm={6}>
          <label for="State">State</label>
          <input type="text" class="form-control" id="inputState" placeholder="State" value={addressValues.state} onChange={(e) => changeAddressValue('state', e.target.value)} />  
        </Grid>
        <Grid item xs={12} sm={6}>
        <small id="reminder"
                className="form-text text-muted" style={{fontSize: '12px'}}>
                Take a look at your details before going to payment!</small>
        </Grid>
      </Grid>
    
    </React.Fragment>
  );
};

export default AddressForm;



/* import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './CheckoutForm.scss'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


export default function AddressForm() {
  const useStyles = makeStyles((theme) => ({
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

const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Customer Information
      </Typography><br /><br />

      <Grid container fluid spacing={3} >
        <Grid item xs={12} sm={6} >
          <label for="Firstname">Firstname</label>
          <input type="text" class="form-control" id="inputFirstName" placeholder="Firstname" />

        </Grid>
        <Grid item xs={12} sm={6}>
          <label for="Lastname">Lastname</label>
          <input type="text" class="form-control" id="inputLastName" placeholder="Lastname" />

        </Grid>
        <Grid item xs={12}>
          <label for="Address">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="Address" />

        </Grid>
        <Grid item xs={12} sm={6}>
          <label for="City">City</label>
          <input type="text" class="form-control" id="inputCity" placeholder="City" />

        </Grid>

        <Grid item xs={12} sm={6}>
          <label for="State">State</label>

          <select id="inputState" class="form-control">
            <option>Pakistan</option>
          </select>
        </Grid>
      </Grid>
    
    </React.Fragment>
  );
}
 */




/*import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './CheckoutForm.scss'
import {Link} from 'react-router-dom'

const Checkout = (props) => {

    return (
        <div >
            <form >
            <h3>Customer Info</h3><br/>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control">
                            <option>Pakistan</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input type="checkbox" id="gridCheck" />
                        <label>Cash on delivery</label>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <Link to="/checkout/"
                    ><button className="checkout" >Place Order</button></Link>
                </div></form>

        </div>

    );
};

export default Checkout;
*/
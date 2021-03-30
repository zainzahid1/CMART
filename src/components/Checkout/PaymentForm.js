import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createStyles } from '@material-ui/core/styles';
import StripeCheckout from 'react-stripe-checkout'
import 'react-toastify/dist/ReactToastify.css';


const styles = createStyles({
    formControlLabel: {
        fontSize: '1.5rem',
        '& label': { fontSize: '5rem' }
    }
});

const handleToken = (token) => {

    console.log(token);
}

const PaymentForm = ({ paymentFormValues, changePaymentFormValue }) => {


    return (
        <React.Fragment>
          <Typography variant="h4" gutterBottom>
                    Payment method
          </Typography><br />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={paymentFormValues['checkedA']} onChange={(e) => changePaymentFormValue('checkedA', e.target.checked)} />}
                label={<Typography style={styles.formControlLabel}>Cash on 
                     delivery</Typography>}
              />
            </Grid>
            <Grid item xs={12}>
              <StripeCheckout
                stripeKey="pk_test_51I9XPQAesAg2GfzQyVB7VgP0IbmWwgcfeFJSuCpB2kbNu60AFTbFhC7dxwje8YF4w2ILMJ6o2InB9ENczpd4dCSa00e09XoDbw"
                token={handleToken}
                amount={2 * 100}
                name="All Products"
              />
            </Grid>
           
          </Grid>
        </React.Fragment>
      );
    };

export default PaymentForm;

import React, { Suspense,useEffect } from 'react';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


import Layout from './hoc/Layout/Layout'
import MainPage from './components/MainPage/MainPage'


const Cart = React.lazy(() => {
  return import('./components/Cart/Cart');
});
const Details = React.lazy(() => {
  return import('./components/Details/Details');
});
const AddProduct = React.lazy(() => {
  return import('./containers/DisplayProducts/AddProduct/AddProduct');
});
const Checkout = React.lazy(() => {
  return import('./components/Checkout/Checkout');
});
const OrderComplete = React.lazy(() => {
  return import('./components/Checkout/OrderComplete/OrderComplete');
});


const UserAuth = React.lazy(() => {
  return import('./containers/Authentication/UserSignupAndLogin');
});
const UserLogout = React.lazy(() => {
  return import('./containers/Authentication/UserLogout/UserLogout');
});






const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/userauth" render={(props) => <UserAuth {...props} />} />
      <Route path="/" exact component={MainPage} />
      <Redirect to="/" />
    </Switch>
  );


  if (localStorage.getItem('email')) {
    routes = (
      <Switch>
        <Route path="/addproduct" render={(props) => <AddProduct {...props} />} />
        <Route path="/cart" render={(props) => <Cart {...props} />} />
        <Route path="/details/:id" render={(props) => <Details {...props} />} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/order-complete" render={(props) => <OrderComplete {...props} />} />
        <Route path="/userlogout" render={(props) => <UserLogout {...props} />} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/" />

      </Switch>
    )
  }


  return (
    <div>
      <Layout>
        <Suspense fallback>
          {routes}
        </Suspense>
      </Layout>



    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect('', mapDispatchToProps)(App));



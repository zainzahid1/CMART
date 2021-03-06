import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const Logout = props => {
    const {onLogout} = props;
    useEffect(()=>{
        onLogout();
    },[onLogout]);
   
        localStorage.removeItem('email');
        localStorage.removeItem('Id');
        return <Redirect to="/"/>;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutInitiate())
    };
};

export default connect(null, mapDispatchToProps)(Logout);
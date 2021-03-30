import React, { useState } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [showSideDrawer, setshowSideDrawer] = useState(false);

    const showSideDrawerClosedHandler = () => {
        setshowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setshowSideDrawer(!showSideDrawer);
    }

    return (

        <Aux>
            <Toolbar

                showDrawerToggle={sideDrawerToggleHandler} 
             
                />
              
            <SideDrawer

                closed={showSideDrawerClosedHandler}
                open={showSideDrawer}
            />
            

            <main className={classes.Layout}>

                {props.children}

            </main>

        </Aux>
    );
}



export default Layout;
import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        {!localStorage.getItem('email')
            ? <NavigationItem link="/" exact>Home</NavigationItem>            
            : <NavigationItem link="/" exact>Home</NavigationItem>} 
        {!localStorage.getItem('email')
            ? null
            : <NavigationItem link="/addproduct">Add Product</NavigationItem>}
    </ul>
);


export default navigationItems;
import React,{useEffect} from 'react';
import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { BsBagFill } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import axios from '../../../axios-orders';


const Toolbar = (props) => {

    const { totalQuantities } = useSelector(state => state.CartReducer)

    useEffect(()=>{
        if(totalQuantities === 0){
            const timer = setTimeout(() => {
                axios.post('/UserPortal/CartItems/auto_delete.php', {
                    customer_id: localStorage.getItem('Id')
                })          
            }, 600);
              return () => clearTimeout(timer);
          
        }
    },[totalQuantities])
   

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.showDrawerToggle} />
            <div className={classes.Logo}>
                <Link to="/" style={{ textDecoration: 'none' }} >
                    <Logo />
                </Link>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>

        {localStorage.getItem('email')
            ? totalQuantities === 0 ? 
               <div className={classes.basket} >
                   
                    <NavLink to="/cart" style={{ textDecoration: 'none', outline: 'none', }}><BsBagFill className={classes.carticon} />
                        <span>{totalQuantities}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </NavLink>
                    

                    <NavLink to="/userlogout" style={{ outline: 'none', textDecoration: 'none' }}>
                        <button type="button" style={{ outline: 'none', textDecoration: 'none' }} class="btn btn-outline-danger btn-lg" >Logout</button>
                    </NavLink>
                </div> : 
          
            <div className={classes.baskett} >
                   
            <NavLink to="/cart" style={{ textDecoration: 'none', outline: 'none', }}><BsBagFill className={classes.carticon} />
                <span>{totalQuantities}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </NavLink>
            

            <NavLink to="/userlogout" style={{ outline: 'none', textDecoration: 'none' }}>
                <button type="button" style={{ outline: 'none', textDecoration: 'none' }} class="btn btn-outline-danger btn-lg" >Logout</button>
            </NavLink>
        </div> 
            

            :   <NavLink to="/userauth" style={{ outline: 'none', textDecoration: 'none' }}>
                    <button type="button" style={{ outline: 'none', textDecoration: 'none' }} class="btn btn-outline-danger btn-lg">Login</button>
                </NavLink>
            }
        </header>

    );
};

export default Toolbar;
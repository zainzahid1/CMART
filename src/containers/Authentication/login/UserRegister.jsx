import React from "react";
import loginImg from "./login.svg";
import axios from '../../../axios-orders'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/)

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  })
  Object.values(rest).forEach(val => {
    val === "" && (valid = false)
  })

  return valid;
}


export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      usernameReg: "",
      emailReg: "",
      passwordReg: "",

      formErrors: {
        usernameReg: "",
        emailReg: "",
        passwordReg: "",
      },
      registerError: false,
      alert: false,
      alreadyRegister: false,
      userEmail: "",
      userId: [],
      redirect: false
    }
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "username":
        formErrors.usernameReg =
          value.length < 3
            ? "Minimum 3 characters required"
            : "";
        this.setState({ usernameReg: e.target.value })
        break;
      case "email":
        formErrors.emailReg =
          emailRegex.test(value)
            ? ""
            : "Invalid email address";
        this.setState({ emailReg: e.target.value })
        break;
      case "password":
        formErrors.passwordReg =
          value.length < 6
            ? "Minimum 6 characters required"
            : "";
        this.setState({ passwordReg: e.target.value })
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }


  register = (e) => {
   
    e.preventDefault();
   
    axios.post('/UserPortal/user_signup_fetch.php', {
      email: this.state.emailReg,
    })
      .then((response) => {
        this.setState({ userEmail: response.data });

        if (formValid(this.state)) {
        if (this.state.userEmail === null) {
          axios.post('/UserPortal/user_register.php', {
            username: this.state.usernameReg,
            email: this.state.emailReg,
            password: this.state.passwordReg,
          })
        
          localStorage.setItem('email', this.state.emailReg)
          this.setState({
            registerError: false, alert: true, alreadyRegister: false, redirect: true
          })
        }

        else {
          this.setState({ alreadyRegister: true, redirect: false, registerError: false, alert: false });
        }
      }
      else {
        this.setState({ alreadyRegister: false, redirect: false, registerError: true, alert: false });
      }
      })

    
    

  }



  render() {
    const { formErrors, registerError, alert, alreadyRegister, redirect } = this.state;
    let registerErrorMessage = null;
    if (registerError) {
      registerErrorMessage = <p style={{ color: "red", fontSize: "14px" }}>Please Fill out the above fields</p>
    }
    if(alert){
      toast.success("Signup successfull, Welcome to CMART! ");
      axios.post('/UserPortal/user_login.php', {
        email: this.state.emailReg,
        password: this.state.passwordReg
      }).then((response) => {
       let backdata = response.data;
       localStorage.setItem('Id', backdata.customer_id)
      })
    }
    if (redirect || localStorage.getItem('email')) { 
    return (<Redirect to={'/'} />)
    }

    

    let alreadyRegisterMessage = null;
    if (alreadyRegister) {
      /* toast.error("User Already Registered! "); */
      alreadyRegisterMessage = <p style={{marginBottom: "40px", padding: "6px", color: "red", fontSize: "16px", border: "2px solid red" }}>User already registered</p>
    }
   

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="register Imagee" />
          </div>
          <div className="form">
            <div className="form-group">
              <label for="exampleInputname">Username</label>
              <input
                name="username"
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.handleChange} />
              {formErrors.usernameReg.length > 0 && (
                <span className="errorMessage">{formErrors.usernameReg}</span>
              )}
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email"
                className="input"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                onChange={this.handleChange} />
              {formErrors.emailReg.length > 0 && (
                <span className="errorMessage">{formErrors.emailReg}</span>
              )}
              <small id="emailHelp"
                className="form-text text-muted">
                We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label for="exampleInputText2">Password</label>
              <input type="password"
                name="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.handleChange} />
              {formErrors.passwordReg.length > 0 && (
                <span className="errorMessage">{formErrors.passwordReg}</span>
              )}
            </div>
            {alreadyRegisterMessage}
          </div>
        </div><br /><br /><br />
        {registerErrorMessage}
       
         <button type="button" className="btnFromAppCss" onClick={this.register}>
          Register
       </button><br /><br />
       
      </div>
    );
  }
}







/* register = (e) => {
  e.preventDefault();

  axios.post('/UserPortal/user_login.php', {
    email: this.state.emailReg,
  })
    .then((response) => {
      this.setState({ userEmail: response.data });
      console.log(this.state.userEmail)
      if (formValid(this.state)) {
        if (this.state.userEmail === null) {
          axios.post('/UserPortal/user_register.php', {
            username: this.state.usernameReg,
            email: this.state.emailReg,
            password: this.state.passwordReg,
          }).then(response => console.log(response.data))

          this.setState({
            registerError: false, alert: true, alreadyRegister: false,
          })
        }

        else {
          this.setState({ alreadyRegister: true, registerError: false, alert: false });
        }
      }
      else {
        this.setState({ alreadyRegister: false, registerError: true, alert: false });
      }
    })
}


render() {
  const { formErrors, registerError, alert, alreadyRegister } = this.state;
  let registerErrorMessage = null;
  if (registerError) {
    registerErrorMessage = <p style={{ color: "red", fontSize: "14px" }}>Please Fill out the above fields</p>
  }
  if (alert) {
    toast.success("Signup successfull, Welcome to CMART! ")
    return <Redirect to="/" />
  }
  let alreadyRegisterMessage = null;
  if (alreadyRegister) {
     toast.error("User Already Registered! ");
    alreadyRegisterMessage = <p style={{ marginTop: "13px", padding: "6px", color: "red", fontSize: "16px", border: "2px solid red" }}>User already registered!</p>
  }
 */

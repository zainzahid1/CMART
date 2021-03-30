import React from "react";
import loginImg from "./login.svg";
import axios from '../../../axios-orders'
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { AiFillFacebook } from "react-icons/ai";
import { ImGoogle } from "react-icons/im";


const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/)

/* const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  })
  Object.values(rest).forEach(val => {
    val === "" && (valid = false)
  })

  return valid;
} */

export class Login extends React.Component {


  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
      emailLogin: "",
      passwordLogin: "",
      formErrors: {
        emailLogin: "",
        passwordLogin: "",
      },
      registerError: false,
      notMatch: false,
      redirect: false,
      userEmail: "",
    }
  }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        formErrors.emailLogin =
          emailRegex.test(value)
            ? ""
            : "Invalid email address";
        this.setState({ emailLogin: e.target.value })
        break;
      case "password":
        formErrors.passwordLogin =
          value.length < 6
            ? "Minimum 6 characters required"
            : "";
        this.setState({ passwordLogin: e.target.value })
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }
  login = (e) => {
    e.preventDefault();
      axios.post('/UserPortal/user_login.php', {
        email: this.state.emailLogin,
        password: this.state.passwordLogin,
      })
        .then((response) => {
          let backdata = response.data;
          console.log(backdata)
          if (backdata === null) {
            this.setState({ notMatch: true, redirect: false, registerError: false })
          }
          else {
            localStorage.setItem('Id', backdata.customer_id)
            localStorage.setItem('email', backdata.email)
            this.setState({ notMatch: false, redirect: true, registerError: false })

          }
        })
  }


  signup(res, type) {
    console.log('entered')
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        email: res.email,
      };
      axios.post('/UserPortal/user_signup_fetch.php', {
        email: res.email,
      })
        .then((response) => {
          this.setState({ userEmail: response.data })
          if (this.state.userEmail === null) {
            axios.post('/UserPortal/user_register_google.php', postData)
            localStorage.setItem("email", res.email);
            this.setState({ redirect: true })
          }

          else {
            localStorage.setItem("email", res.email);
            this.setState({ redirect: true })
          }
        })
    }

    if (type === 'google' && res.profileObj.email) {
      postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
      };
      axios.post('/UserPortal/user_signup_fetch.php', {
        email: res.profileObj.email,
      })
        .then((response) => {
          this.setState({ userEmail: response.data })
          if (this.state.userEmail === null) {
            axios.post('/UserPortal/user_register_google.php', postData)
            localStorage.setItem("email", res.profileObj.email);
            this.setState({ redirect: true })
          }

          else {
            localStorage.setItem("email", res.profileObj.email);
            this.setState({ redirect: true })
          }
        })
    }

  }
  /* signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        email: res.email,
      };
    }

    if (type === 'google' && res.profileObj.email) {
      postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
      };
    }

    if (postData) {
      console.log('entered')

      axios.post('/UserPortal/user_signup_fetch.php', {
        email: res.profileObj.email,
      })
        .then((response) => {
          this.setState({ userEmail: response.data })
          if (this.state.userEmail === null) {
            axios.post('/UserPortal/user_register_google.php', postData)
            localStorage.setItem("email", res.profileObj.email);
            this.setState({ redirect: true })
          }

          else {
            localStorage.setItem("email", res.profileObj.email);
            this.setState({ redirect: true })
          }
        })
    } else { }
  } */



  render() {
    const { formErrors, /* registerError, */ notMatch } = this.state;
    /* let registerErrorMessage = null;
    if (registerError) {
      registerErrorMessage = <p style={{ color: "red" }}>Please Fill out the above fields</p>
    } */

    if (this.state.redirect || localStorage.getItem('email')) {
      return (<Redirect to={'/'} />)
    }
    let notMatchMessage = null;
    if (notMatch) {
      notMatchMessage = <p style={{padding: "6px", color: "red", fontSize: "22px", border: "2px solid red" }}>Wrong username/password</p>
    }

    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.signup(response, 'facebook');
    }

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
    }

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="headerlogin">Login</div>
        <div className="contentlogin">
          <div className="image">
            <img src={loginImg} alt="login Imagee" />
          </div>
          <div className="form">
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email"
                className="input"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                onChange={this.handleChange} />
              {formErrors.emailLogin.length > 0 && (
                <span className="errorMessage">{formErrors.emailLogin}</span>
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
              {formErrors.passwordLogin.length > 0 && (
                <span className="errorMessage">{formErrors.passwordLogin}</span>
              )}
            </div>
            {notMatchMessage}
          </div>
        </div><br /><br />
        <button type="button" className="btnFromAppCss2" onClick={this.login}>
          Login
       </button><br /><br />
       <h2><span>OR</span></h2>
        <GoogleLogin
          clientId="793575617743-g4qicekv677kima5kjhqt059n7tpg8fh.apps.googleusercontent.com"
          render={renderProps => (
            <div class="btn-group" role="group" aria-label="Basic example">
              <button onClick={renderProps.onClick} type="button" className="googleLogin">
                <ImGoogle/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with google&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
            </div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        /><br/>

        <FacebookLogin
          appId="123873966253116"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="fbLogin"
          icon={<AiFillFacebook style={{fontSize:"21px"}}/>}   
          textButton = "&nbsp;&nbsp;&nbsp;Continue with facebook"                                                    
          />

       

      </div>
    );
  }
}


import React from "react";
import loginImg from "./login.svg";
import axios from '../../../axios-orders'

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

export class AdminLogin extends React.Component {


  constructor(props) {
    super(props);

    this.login = this.login.bind(this);

    this.state = {
      emailLogin: "",
      passwordLogin: "",
      formErrors: {
        emailLogin: "",
        passwordLogin: "",
      },
      registerError: false,
      notMatch: false,
      redirect: false
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
            this.setState({emailLogin: e.target.value })
        break;
      case "password":
        formErrors.passwordLogin =
          value.length < 6 
            ? "Minimum 6 characters required"
            : "";
            this.setState({passwordLogin: e.target.value })
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }
  login = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
    axios.post('/AdminPortal/admin_login.php', {
      email: this.state.emailLogin,
      password: this.state.passwordLogin,
    })
      .then((response) => {
        let backdata = response.data;
        console.log(backdata)
        if (backdata === null) {
         this.setState({notMatch: true,redirect:false,registerError: false})
        }
        else {
          localStorage.setItem('AdminData',backdata.username)
          console.log('backdata2',backdata)
          this.setState({notMatch: false,redirect:true,registerError: false})
          
        }
      })
  }
  else {
    this.setState({ registerError: true,notMatch:false,redirect:false })
  }
}

  render() {
    const { formErrors,registerError,notMatch } = this.state;
    let registerErrorMessage = null;
    if (registerError) {
      registerErrorMessage = <p style={{ color: "red" }}>Please Fill out the above fields</p>
    }
   
   /*  if (this.state.redirect || localStorage.getItem('AdminData')) {
      return (<Redirect to={'/view/'} />)
    } */
    let notMatchMessage = null;
    if (notMatch) {
      notMatchMessage = <p style={{padding:"6px" ,color: "red", fontSize: "22px", border:"2px solid red" }}>Wrong username/password</p>
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
          </div>
        </div><br /><br /><br /><br />
        {registerErrorMessage}
        {notMatchMessage}
        <button type="button" className="btnFromAppCss2" onClick={this.login}>
          Login
       </button><br /><br />

      </div>
    );
  }
}

